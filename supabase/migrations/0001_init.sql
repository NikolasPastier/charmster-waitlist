create extension if not exists "pgcrypto";

-- Email-only waitlist
create table public.waitlist (
    id uuid primary key default gen_random_uuid (),
    created_at timestamptz not null default now(),
    email text not null unique,
    source text,
    referral_code text,
    confirmed boolean not null default false,
    confirm_token uuid not null default gen_random_uuid ()
);

alter table public.waitlist enable row level security;
-- No policies: clients can't read or write. The server uses the service role key.

-- Single-row launch flag
create table public.site_config (
    id int primary key default 1,
    is_launched boolean not null default false,
    constraint single_row check (id = 1)
);

insert into
    public.site_config (id, is_launched)
values (1, false) on conflict (id) do nothing;

alter table public.site_config enable row level security;

-- Anyone may READ the launch flag (it's not sensitive).
create policy "read launch flag" on public.site_config for
select using (true);