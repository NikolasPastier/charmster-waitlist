import { createClient } from "@supabase/supabase-js"

// Public read of the launch flag (anon key + the RLS read policy from the migration).
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
)

export async function isLaunched(): Promise<boolean> {
    // Env override wins (handy for preview deploys): NEXT_PUBLIC_LAUNCHED=true
    if (process.env.NEXT_PUBLIC_LAUNCHED === "true") return true

    const { data } = await supabase
        .from("site_config")
        .select("is_launched")
        .eq("id", 1)
        .single()

    return data?.is_launched ?? false
}