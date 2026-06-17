import { createClient } from "@supabase/supabase-js"

// Factory — called inside request handlers so env vars are never read at
// build time (which would throw on Cloudflare where they aren't present).
// Server-side ONLY. Never import into a client component.
export function getSupabaseAdmin() {
    return createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { persistSession: false } }
    )
}