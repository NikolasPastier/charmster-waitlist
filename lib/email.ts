import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.WAITLIST_FROM_EMAIL ?? "Charmster <hello@charmster.app>"
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://charmster.app"

export async function sendConfirmationEmail(email: string, token: string) {
    const confirmUrl = `${SITE}/api/confirm?token=${token}`
    await resend.emails.send({
        from: FROM,
        to: email,
        subject: "Confirm your spot on the Charmster waitlist 💘",
        html: `
      <div style="background:#0B0910;color:#F6F4FA;font-family:sans-serif;padding:40px;border-radius:16px">
        <h1 style="font-size:24px;margin:0 0 12px">You're almost in.</h1>
        <p style="color:#ABA4BD;margin:0 0 20px">
          Tap below to confirm your spot on the Charmster waitlist — we'll let you know
          the moment we launch.
        </p>
        <a href="${confirmUrl}"
           style="display:inline-block;padding:14px 28px;border-radius:999px;font-weight:700;text-decoration:none;color:#0B0910;background:linear-gradient(135deg,#A24BFF,#FF4D94,#FF7A45,#FFC23D)">
          Confirm my spot
        </a>
        <p style="color:#6C6580;font-size:12px;margin:24px 0 0">
          If you didn't sign up, just ignore this email.
        </p>
      </div>
    `,
    })
}