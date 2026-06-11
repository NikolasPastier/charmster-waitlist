import type { Metadata } from "next"
import { Schibsted_Grotesk, Plus_Jakarta_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"
import SmoothScroll from "@/components/SmoothScroll"
import Pixels from "@/components/Pixels"

const display = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-display" })
const body = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-body" })

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://charmster.app"

export const metadata: Metadata = {
    metadataBase: new URL(SITE),
    title: "Charmster — Practice love. Build real confidence.",
    description:
        "Talk out loud with Mia, your AI dating coach. Practice real voice conversations and get instant feedback. Join the waitlist.",
    icons: { icon: "/favicon.png", apple: "/logo-mark.png" },
    openGraph: {
        title: "Charmster — Practice love. Build real confidence.",
        description: "Live AI voice practice with Mia. Join the waitlist.",
        url: SITE,
        images: ["/og.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Charmster — Practice love. Build real confidence.",
        description: "Join the waitlist for the AI dating-confidence coach.",
        images: ["/og.png"],
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${display.variable} ${body.variable}`}>
            <body className="bg-bg font-sans text-text antialiased">
                <SmoothScroll>{children}</SmoothScroll>
                <Pixels />
                <Analytics />
            </body>
        </html>
    )
}