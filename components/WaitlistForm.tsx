"use client"

import { useState } from "react"
import { motion } from "framer-motion"

type Status = "idle" | "loading" | "success" | "error"

const popIn = {
    hidden: { opacity: 0, scale: 0.96 },
    show: { opacity: 1, scale: 1 },
}

export default function WaitlistForm({ source }: { source?: string }) {
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState<Status>("idle")
    const [message, setMessage] = useState("")

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        setStatus("loading")
        try {
            const res = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, source }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error ?? "Something went wrong.")
            ;(window as any).fbq?.("track", "Lead")
            ;(window as any).ttq?.track?.("CompleteRegistration")
            setStatus("success")
            setMessage("You're on the list 🔥 Check your inbox to confirm.")
        } catch (err) {
            setStatus("error")
            setMessage(err instanceof Error ? err.message : "Something went wrong.")
        }
    }

    if (status === "success") {
        return (
            <motion.div
                variants={popIn}
                initial="hidden"
                animate="show"
                className="rounded-2xl border border-stroke bg-surface px-6 py-5 text-center shadow-glow-gold"
            >
                <p className="text-aura font-display text-lg font-bold">{message}</p>
            </motion.div>
        )
    }

    return (
        <form onSubmit={onSubmit} className="w-full max-w-md">
            <div className="flex flex-col gap-3 sm:flex-row">
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="flex-1 rounded-full border border-stroke bg-surface px-5 py-3 text-text placeholder:text-text-muted focus:border-pink focus:outline-none focus:ring-2 focus:ring-pink/40"
                />
                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="rounded-full bg-aura px-6 py-3 font-display font-bold text-bg shadow-glow transition active:scale-[0.98] disabled:opacity-60"
                >
                    {status === "loading" ? "Joining…" : "Join the waitlist"}
                </button>
            </div>
            {status === "error" && <p className="mt-2 text-sm text-[#FF6B6B]">{message}</p>}
            <p className="mt-2 text-xs text-text-muted">
                By joining you agree to receive launch updates. No spam.
            </p>
        </form>
    )
}