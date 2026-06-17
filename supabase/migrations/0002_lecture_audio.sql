create table if not exists public.lecture_audio (
    lecture_id  text        not null,
    coach_id    text        not null,
    beat_id     text        not null,
    storage_path text       not null,
    voice_id    text        not null,
    model       text        not null,
    char_count  int,
    text_hash   text        not null,  -- sha1(model+voiceId+text); skip unchanged beats
    generated_at timestamptz default now(),
    primary key (lecture_id, coach_id, beat_id)
);

alter table public.lecture_audio enable row level security;

-- Service role bypasses RLS; app reads via signed URLs, not this table directly
create policy "service role only" on public.lecture_audio
    using (auth.role() = 'service_role');
