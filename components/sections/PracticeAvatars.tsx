"use client"

import { useRef, useState } from "react"
import Reveal from "@/components/Reveal"

const avatars = [
    { id: "mia",   name: "Mia",   voice: "Warm girl-next-door", accent: "text-pink",   blurb: "Warm and easy — the girl-next-door who makes practice feel natural." },
    { id: "ava",   name: "Ava",   voice: "Bright & bubbly",     accent: "text-gold",   blurb: "Upbeat and playful — perfect for light, fun openers." },
    { id: "sofia", name: "Sofia", voice: "Warm & charming",     accent: "text-orange", blurb: "Relaxed and charismatic — easy chemistry to practice with." },
    { id: "mei",   name: "Mei",   voice: "Soft & calm",         accent: "text-teal",   blurb: "Gentle and grounded — lowers the pressure while you find your flow." },
    { id: "nia",   name: "Nia",   voice: "Poised & confident",  accent: "text-violet", blurb: "Self-assured and warm — practice holding presence with poise." },
]

const avatarVoice: Record<string, string> = {
    mia:   "/avatars voices/Mia Warm girlnextdoor.mp3",
    ava:   "/avatars voices/Ava Bright & bubbly.mp3",
    sofia: "/avatars voices/Sofia Warmlow & charming.mp3",
    mei:   "/avatars voices/Mei Soft & calm.mp3",
    nia:   "/avatars voices/Nia Poised & confident.mp3",
}

const customizations = [
    { icon: "face",       label: "Pick her look",  detail: "5 distinct, realistic looks." },
    { icon: "graphic_eq", label: "Pick her voice", detail: "Any of 5 voices on any look — mix and match." },
    { icon: "edit",       label: "Name her",        detail: "Give your practice partner any name you like." },
]

export default function PracticeAvatars() {
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [playingId, setPlayingId] = useState<string | null>(null)
    const [disabledIds, setDisabledIds] = useState<Set<string>>(new Set())

    function getAudio(): HTMLAudioElement {
        if (!audioRef.current) audioRef.current = new Audio()
        return audioRef.current
    }

    function handleVoice(id: string) {
        const audio = getAudio()

        if (playingId === id) {
            audio.pause()
            setPlayingId(null)
            return
        }

        if (!audio.paused) {
            audio.pause()
            audio.currentTime = 0
        }

        const path = avatarVoice[id]
        if (!path) return

        audio.onended = () => setPlayingId(null)
        audio.onerror = () => {
            setDisabledIds(prev => new Set([...prev, id]))
            setPlayingId(null)
        }
        audio.src = encodeURI(path)
        audio.play().catch(() => {})
        setPlayingId(id)
    }

    return (
        <section id="avatars" className="border-y border-stroke/60 bg-elevated/30 px-5 py-24 md:px-8">
            <div className="mx-auto max-w-6xl">
                <Reveal>
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="text-xs font-bold uppercase tracking-[0.18em] text-pink">Choose your partner</span>
                        <h2 className="mt-3 font-display text-4xl font-extrabold md:text-5xl">
                            Practice with someone who feels <span className="text-aura">real</span>
                        </h2>
                        <p className="mt-5 text-lg text-text-secondary">
                            Five practice partners, each with their own look and voice.
                        </p>
                    </div>
                </Reveal>

                <div className="mt-14 -mx-5 px-5 md:-mx-8 md:px-8">
                    <div
                        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4
                                   [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                        role="region"
                        aria-label="Practice partners — swipe to browse"
                    >
                        {avatars.map((a, i) => (
                            <Reveal
                                key={a.id}
                                delay={(i % 5) * 0.05}
                                className="snap-start shrink-0 w-[78%] sm:w-[46%] md:w-[31%] lg:w-[19%]"
                            >
                                <article className="glass h-full overflow-hidden rounded-3xl">
                                    <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-elevated to-surface">
                                        <span className="absolute inset-0 grid place-items-center font-display text-7xl text-text-muted/30">
                                            {a.name[0]}
                                        </span>
                                        <img
                                            className="relative h-full w-full object-cover"
                                            loading="lazy"
                                            alt={`${a.name} — ${a.voice}`}
                                            src={`/avatars/${a.name}/${a.name}%20neutral%20scene.jpeg`}
                                            onError={(e) => { e.currentTarget.style.display = "none" }}
                                        />
                                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg to-transparent" />
                                    </div>
                                    <div className="p-5">
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="min-w-0">
                                                <h3 className="font-display text-xl font-bold">{a.name}</h3>
                                                <p className={`text-xs font-semibold ${a.accent}`}>{a.voice}</p>
                                            </div>
                                            {!disabledIds.has(a.id) && (
                                                <button
                                                    aria-label={`Hear ${a.name}'s voice`}
                                                    onClick={() => handleVoice(a.id)}
                                                    className="flex shrink-0 items-center gap-1 rounded-full border border-stroke/60 px-2.5 py-1.5 text-xs font-semibold text-text-secondary transition-colors hover:border-pink/40 hover:text-text"
                                                >
                                                    <span className="material-symbols-outlined text-sm">
                                                        {playingId === a.id ? "pause" : "volume_up"}
                                                    </span>
                                                    {playingId === a.id ? "Playing" : "Hear her"}
                                                </button>
                                            )}
                                        </div>
                                        <p className="mt-2.5 text-xs text-text-secondary leading-relaxed">{a.blurb}</p>
                                    </div>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                </div>
                <p className="mt-2 text-center text-xs text-text-muted">← swipe to see all 5 →</p>

                <Reveal delay={0.12}>
                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                        {customizations.map((c) => (
                            <div key={c.label} className="glass flex items-center gap-4 rounded-2xl px-5 py-4">
                                <span className="material-symbols-outlined text-2xl text-pink">{c.icon}</span>
                                <div>
                                    <p className="font-semibold text-text">{c.label}</p>
                                    <p className="text-xs text-text-secondary">{c.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Reveal>

                <Reveal delay={0.18}>
                    <div className="mt-10 text-center">
                        <a
                            href="#waitlist"
                            className="inline-flex items-center gap-2 rounded-full bg-aura px-7 py-3 text-sm font-bold text-white shadow-glow transition-opacity hover:opacity-90"
                        >
                            Join the waitlist
                            <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </a>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}
