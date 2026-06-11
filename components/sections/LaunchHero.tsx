import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { detectPlatform } from "@/lib/device"
import GradientOrbs from "@/components/GradientOrbs"

export default async function LaunchHero() {
    const h = await headers()
    const platform = detectPlatform(h.get("user-agent") ?? "")
    const appStore = process.env.NEXT_PUBLIC_APP_STORE_URL
    const play = process.env.NEXT_PUBLIC_PLAY_STORE_URL

    // Auto-redirect mobile visitors straight to the right store.
    if (platform === "ios" && appStore) redirect(appStore)
    if (platform === "android" && play) redirect(play)

    // Desktop: show a download CTA.
    return (
        <main className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
            <GradientOrbs />
            <h1 className="font-display text-4xl font-bold sm:text-6xl">
                Charmster is <span className="text-aura">live.</span>
            </h1>
            <p className="mt-4 max-w-md text-lg text-text-secondary">
                Download the app and start building real confidence today.
            </p>
            {appStore && (
                <a href={appStore} className="mt-8 rounded-full bg-aura px-8 py-4 font-display font-bold text-bg shadow-glow">
                    Download on the App Store
                </a>
            )}
        </main>
    )
}