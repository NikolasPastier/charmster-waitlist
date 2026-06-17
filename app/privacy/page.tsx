import type { Metadata } from "next"
import Link from "next/link"
import Nav from "@/components/sections/Nav"
import Footer from "@/components/sections/Footer"
import GradientOrbs from "@/components/GradientOrbs"
import Reveal from "@/components/Reveal"

export const metadata: Metadata = {
    title: "Privacy Policy · Charmster",
    description: "How Charmster handles the information collected through our pre-launch waitlist site.",
}

const sections = [
    {
        title: "1. What we collect",
        content: null,
        list: [
            "Email address — when you join the waitlist.",
            "Signup source — a UTM/referrer tag (e.g. which social link sent you), so we know which channels work.",
            "Basic usage analytics — aggregate, privacy-friendly stats about visits (pages viewed, device/browser type, country) via Vercel Analytics. This does not identify you personally.",
            "Advertising pixels (only if enabled) — if we run the Meta and/or TikTok pixel, those services may set cookies to measure ad performance and let us reach similar audiences. If the pixels are not enabled, this does not apply.",
        ],
    },
    {
        title: "2. What we do NOT collect here",
        content: "This is a simple waitlist site. We don't create accounts, we don't collect passwords, and we don't use any camera or microphone here. The app's live-practice features (and the consent flow around them) are covered by the separate app privacy policy at launch.",
        list: null,
    },
    {
        title: "3. How we use your information",
        content: null,
        list: [
            "To send you a confirmation email and, later, launch updates and news about Charmster.",
            "To measure and improve our marketing and the site.",
            "To keep the site secure and prevent abuse.",
        ],
    },
    {
        title: "4. Legal bases (GDPR / EEA + UK)",
        content: null,
        list: [
            "Consent — for sending you waitlist/marketing emails and for any advertising pixels. You can withdraw consent anytime (unsubscribe link in every email).",
            "Legitimate interests — for basic analytics, security, and understanding which channels drive signups.",
        ],
    },
    {
        title: "5. Email & double opt-in",
        content: "When you join, we send a confirmation email; your spot is confirmed when you click the link. Every email includes an unsubscribe option — unsubscribing stops future emails and you can ask us to delete your address.",
        list: null,
    },
    {
        title: "6. Who we share data with (service providers)",
        content: "We don't sell your personal information. We share it only with providers that operate the site on our behalf, under contract:",
        list: [
            "Supabase — stores the waitlist (email + source).",
            "Resend — sends the confirmation and update emails.",
            "Vercel — hosting and privacy-friendly analytics.",
            "Meta / TikTok — only if advertising pixels are enabled, for ad measurement and retargeting.",
        ],
    },
    {
        title: "7. Cookies & tracking",
        content: "The core site works without marketing cookies. Analytics is cookieless/aggregate. If advertising pixels are enabled, they use cookies — in the EEA/UK we show a consent banner and only load them after you accept.",
        list: null,
    },
    {
        title: "8. Data retention",
        content: "We keep your email until launch and for a reasonable period afterward to tell you about Charmster, or until you unsubscribe or ask us to delete it — whichever comes first.",
        list: null,
    },
    {
        title: "9. Your rights",
        content: "Depending on where you live, you can request access to, correction of, or deletion of your data, object to or restrict processing, withdraw consent, and (GDPR) lodge a complaint with your local data protection authority. Under CCPA/CPRA you can know, delete, and opt out of \"sale/sharing\" — we don't sell data. To exercise any of these, email privacy@charmster.app or use the unsubscribe link.",
        list: null,
    },
    {
        title: "10. International transfers",
        content: "Your data may be processed outside your country (for example, in the US by our providers) under appropriate safeguards such as Standard Contractual Clauses.",
        list: null,
    },
    {
        title: "11. Children",
        content: "This site and Charmster are intended for adults (17+). We don't knowingly collect data from anyone under the age required in their region.",
        list: null,
    },
    {
        title: "12. Changes",
        content: "We may update this policy; we'll change the \"Last updated\" date above and, for material changes, note it on the site.",
        list: null,
    },
]

export default function PrivacyPage() {
    return (
        <>
            <Nav />
            <main className="relative min-h-screen overflow-hidden">
                <GradientOrbs />
                <div className="relative z-10 mx-auto max-w-3xl px-5 py-32 md:px-8">
                    {/* Header */}
                    <Reveal>
                        <div className="mb-10">
                            <Link
                                href="/"
                                className="mb-8 inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-pink"
                            >
                                <span className="material-symbols-outlined text-base">arrow_back</span>
                                Back home
                            </Link>
                            <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-pink">Legal</p>
                            <h1 className="mt-2 font-display text-4xl font-extrabold leading-tight md:text-5xl">
                                <span className="text-aura">Privacy</span> Policy
                            </h1>
                            <p className="mt-3 text-sm text-text-muted">Last updated: June 17, 2026</p>
                        </div>
                    </Reveal>

                    {/* Policy card */}
                    <Reveal delay={0.05}>
                        <div className="glass rounded-2xl p-6 md:p-10">
                            {/* Intro */}
                            <p className="leading-relaxed text-text-secondary">
                                This Privacy Policy explains how Charmster (&ldquo;Charmster&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) handles
                                information collected through this website — our pre-launch waitlist site at{" "}
                                <span className="text-text">charmster.app</span>. Charmster is a dating-confidence coaching app
                                launching soon; this site exists to explain it and let you join the waitlist. A separate, fuller
                                privacy policy will cover the app itself when it launches. Questions or requests:{" "}
                                <a href="mailto:privacy@charmster.app" className="text-pink hover:underline">
                                    privacy@charmster.app
                                </a>
                                .
                            </p>

                            {/* Sections */}
                            {sections.map((s, i) => (
                                <Reveal key={s.title} delay={0.04 * (i + 1)}>
                                    <div>
                                        <hr className="my-8 border-stroke/60" />
                                        <h2 className="mb-3 font-display text-xl font-bold text-text md:text-2xl">{s.title}</h2>
                                        {s.content && (
                                            <p className="leading-relaxed text-text-secondary">{s.content}</p>
                                        )}
                                        {s.list && (
                                            <ul className="mt-3 space-y-2">
                                                {s.list.map((item) => (
                                                    <li key={item} className="flex gap-2 leading-relaxed text-text-secondary">
                                                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pink" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </Reveal>
                            ))}

                            <hr className="my-8 border-stroke/60" />

                            <Reveal delay={0.5}>
                                <p className="text-sm leading-relaxed text-text-muted">
                                    Contact: Charmster —{" "}
                                    <a href="mailto:privacy@charmster.app" className="text-pink hover:underline">
                                        privacy@charmster.app
                                    </a>
                                </p>
                            </Reveal>
                        </div>
                    </Reveal>
                </div>
            </main>
            <Footer />
        </>
    )
}
