import { createClient } from "@supabase/supabase-js"

export async function isLaunched(): Promise<boolean> {
    // Env override wins (handy for preview deploys): NEXT_PUBLIC_LAUNCHED=true
    if (process.env.NEXT_PUBLIC_LAUNCHED === "true") return true

    // Guard: if env vars are absent (e.g. during CI build) treat as not launched.
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) return false

    const supabase = createClient(url, key, { auth: { persistSession: false } })

    const { data } = await supabase
        .from("site_config")
        .select("is_launched")
        .eq("id", 1)
        .single()

    return data?.is_launched ?? false
}