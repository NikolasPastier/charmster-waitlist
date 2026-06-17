"use client"

import { useRef, useState } from "react"
import Reveal from "@/components/Reveal"

const coaches = [
    { id: "theo", name: "Theo",    role: "The Big Brother",  accent: "text-orange", blurb: "Warm, easygoing, been-there. Real talk that actually works — zero cheesy lines." },
    { id: "ray",  name: "Dr. Ray", role: "The Scientist",    accent: "text-blue",   blurb: "Evidence over guesswork. He shows you the patterns behind every great conversation." },
    { id: "cole", name: "Cole",    role: "The Alpha Mentor", accent: "text-violet", blurb: "Calm, grounded, high standards. He holds you to the best version of you." },
    { id: "noah", name: "Noah",    role: "The Therapist",    accent: "text-teal",   blurb: "Steady and reassuring. Quiet the anxiety and show up calm, present, and genuine." },
    { id: "leo",  name: "Leo",     role: "The Wingman",      accent: "text-pink",   blurb: "Bright, playful hype. He keeps it fun, builds the spark, and gets you out there." },
]

const voiceLines: Record<string, string[]> = {
    cole: [1, 2, 3].map(n => `/coach voices/cole preview line ${n}.mp3`),
    leo:  [1, 2, 3].map(n => `/coach voices/leo preview line ${n}.mp3`),
    noah: [1, 2, 3].map(n => `/coach voices/noah preview line ${n}.mp3`),
    ray:  [1, 2, 3].map(n => `/coach voices/ray preview line ${n}.mp3`),
    theo: [1, 2, 3].map(n => `/coach voices/theo preview line ${n}.mp3`),
}

export default function CoachRoster() {
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [playingId, setPlayingId] = useState<string | null>(null)
    const lineIdx = useRef<Record<string, number>>(
        Object.fromEntries(coaches.map(c => [c.id, 0]))
    )
    const [disabledIds, setDisabledIds] = useState<Set<string>>(new Set())

    function getAudio(): HTMLAudioElement {
        if (!audioRef.current) audioRef.current = new Audio()
        return audioRef.current
    }

    function handleVoice(id: string) {
        const audio = getAudio()

        if (playingId === id) {
            audio.pause()
            audio.currentTime = 0
            setPlayingId(null)
            return
        }

        if (!audio.paused) {
            audio.pause()
            audio.currentTime = 0
        }

        const lines = voiceLines[id] ?? []
        if (lines.length === 0) return
        const idx = lineIdx.current[id] ?? 0
        const path = lines[idx]
        lineIdx.current[id] = (idx + 1) % lines.length

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
        <section id="coaches" className="px-5 py-24 md:px-8">
            <div className="mx-auto max-w-6xl">
                <Reveal>
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="text-xs font-bold uppercase tracking-[0.18em] text-pink">Your corner</span>
                        <h2 className="mt-3 font-display text-4xl font-extrabold md:text-5xl">
                            Meet your <span className="text-aura">coaches</span>
                        </h2>
                        <p className="mt-5 text-lg text-text-secondary">
                            Five distinct mentors guide your lectures in their own voice. Pick the one who gets the best out
                            of you — switch anytime.
                        </p>
                    </div>
                </Reveal>

                <div className="mt-14 -mx-5 px-5 md:-mx-8 md:px-8">
                    <div
                        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4
                                   [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                        role="region"
                        aria-label="Coaches — swipe to browse"
                    >
                        {coaches.map((c, i) => (
                            <Reveal
                                key={c.id}
                                delay={(i % 5) * 0.05}
                                className="snap-start shrink-0 w-[78%] sm:w-[46%] md:w-[31%] lg:w-[19%]"
                            >
                                <article className="glass h-full overflow-hidden rounded-3xl">
                                    <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-elevated to-surface">
                                        <span className="absolute inset-0 grid place-items-center font-display text-7xl text-text-muted/30">
                                            {c.name[0]}
                                        </span>
                                        <img
                                            className="relative h-full w-full object-cover"
                                            loading="lazy"
                                            alt={`${c.name} — ${c.role}`}
                                            src={`/avatars/coaches/${c.id}%20neutral%20scene.jpeg`}
                                            onError={(e) => { e.currentTarget.style.display = "none" }}
                                        />
                                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg to-transparent" />
                                    </div>
                                    <div className="p-5">
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="min-w-0">
                                                <h3 className="font-display text-xl font-bold">{c.name}</h3>
                                                <p className={`text-xs font-semibold ${c.accent}`}>{c.role}</p>
                                            </div>
                                            {!disabledIds.has(c.id) && (
                                                <button
                                                    aria-label={`Hear ${c.name}'s voice`}
                                                    onClick={() => handleVoice(c.id)}
                                                    className="flex shrink-0 items-center gap-1 rounded-full border border-stroke/60 px-2.5 py-1.5 text-xs font-semibold text-text-secondary transition-colors hover:border-pink/40 hover:text-text"
                                                >
                                                    <span className="material-symbols-outlined text-sm">
                                                        {playingId === c.id ? "pause" : "volume_up"}
                                                    </span>
                                                    {playingId === c.id ? "Playing" : "Hear him"}
                                                </button>
                                            )}
                                        </div>
                                        <p className="mt-2.5 text-xs text-text-secondary leading-relaxed">{c.blurb}</p>
                                    </div>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                </div>
                <p className="mt-2 text-center text-xs text-text-muted">← swipe to see all 5 →</p>

                <Reveal delay={0.15}>
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
