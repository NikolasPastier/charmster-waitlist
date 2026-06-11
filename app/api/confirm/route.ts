import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase/server"

export async function GET(req: Request) {
    const site = process.env.NEXT_PUBLIC_SITE_URL ?? ""
    const token = new URL(req.url).searchParams.get("token")
    if (!token) return NextResponse.redirect(`${site}/?confirmed=0`)

    await supabaseAdmin
        .from("waitlist")
        .update({ confirmed: true })
        .eq("confirm_token", token)

    return NextResponse.redirect(`${site}/?confirmed=1`)
}