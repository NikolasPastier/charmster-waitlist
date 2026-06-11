import Reveal from "@/components/Reveal"

const tracks = [
    { label: "First impressions", sub: "Mastered", subColor: "text-teal", mark: "✓", state: "done" as const },
    { label: "Keeping it flowing", sub: "In progress", subColor: "text-gold", mark: "2", state: "active" as const },
    { label: "Playful flirting", sub: "Locked", subColor: "text-text-muted", mark: "", state: "locked" as const },
    { label: "Deeper connection", sub: "+12 more tracks", subColor: "text-text-muted", mark: "", state: "locked" as const },
]

export default function SkillPath() {
    return (
        <section className="px-5 py-24 md:px-8">
            <div className="mx-auto max-w-6xl text-center">
                <Reveal>
                    <div className="mx-auto max-w-2xl">
                        <span className="text-xs font-bold uppercase tracking-[0.18em] text-pink">Your journey</span>
                        <h2 className="mt-3 font-display text-4xl font-extrabold md:text-5xl">Level up, one skill at a time</h2>
                        <p className="mt-5 text-lg text-text-secondary">
                            Like a confidence curriculum. Each track unlocks the next, so you're always practicing the right
                            thing at the right time.
                        </p>
                    </div>
                </Reveal>
                <Reveal delay={0.1}>
                    <div className="mt-14 flex flex-wrap items-center justify-center gap-3 md:gap-4">
                        {tracks.map((t, i) => (
                            <div key={t.label} className="flex items-center gap-3 md:gap-4">
                                <div
                                    className={`glass flex items-center gap-3 rounded-2xl px-5 py-4 ${t.state === "locked" ? "opacity-60" : ""
                                        } ${t.state === "active" ? "border-pink/60" : ""}`}
                                >
                                    <span
                                        className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${t.state === "locked" ? "bg-surface text-text-muted" : "bg-aura text-white"
                                            }`}
                                    >
                                        {t.state === "locked" ? <span className="material-symbols-outlined text-base">lock</span> : t.mark}
                                    </span>
                                    <div className="text-left">
                                        <p className="text-sm font-semibold">{t.label}</p>
                                        <p className={`text-xs ${t.subColor}`}>{t.sub}</p>
                                    </div>
                                </div>
                                {i < tracks.length - 1 && (
                                    <span className="material-symbols-outlined text-text-muted">arrow_forward</span>
                                )}
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    )
}