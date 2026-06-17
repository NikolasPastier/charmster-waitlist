export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"
import { z } from "zod"
import { getSupabaseAdmin } from "@/lib/supabase/server"
import { sendConfirmationEmail } from "@/lib/email"

const Body = z.object({
    email: z.string().email(),
    source: z.string().max(120).optional(),
})

export async function POST(req: Request) {
    const parsed = Body.safeParse(await req.json().catch(() => null))
    if (!parsed.success) {
        return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 })
    }

    const email = parsed.data.email.toLowerCase().trim()
    const source = parsed.data.source ?? null

    const { data, error } = await getSupabaseAdmin()
        .from("waitlist")
        .insert({ email, source })
        .select("confirm_token")
        .single()

    if (error) {
        // 23505 = unique violation: already signed up. Treat as success.
        if (error.code === "23505") {
            return NextResponse.json({ ok: true, already: true })
        }
        console.error("waitlist insert failed", error)
        return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 500 })
    }

    try {
        await sendConfirmationEmail(email, data.confirm_token)
    } catch (e) {
        console.error("confirmation email failed", e)
        // Signup still succeeded; don't fail the request.
    }

    return NextResponse.json({ ok: true })
}