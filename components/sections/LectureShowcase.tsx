"use client"

import Reveal from "@/components/Reveal"

const beats = [
    { n: 1, src: "/charmster-lecture-previews/beat-1-hook.png",             label: "Hook" },
    { n: 2, src: "/charmster-lecture-previews/beat-2-core-insight.png",     label: "Core insight" },
    { n: 3, src: "/charmster-lecture-previews/beat-3-good-vs-bad.png",      label: "Good vs. bad" },
    { n: 4, src: "/charmster-lecture-previews/beat-4-recall-tap.png",       label: "Quick recall" },
    { n: 5, src: "/charmster-lecture-previews/beat-5-takeaway-handoff.png", label: "Practice handoff" },
]

export default function LectureShowcase() {
    return (
        <section id="lectures" className="px-5 py-24 md:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="grid items-start gap-14 lg:grid-cols-2">
                    {/* Left column — copy (unchanged) */}
                    <Reveal>
                        <div>
                            <span className="text-xs font-bold uppercase tracking-[0.18em] text-pink">Bite-size lessons</span>
                            <h2 className="mt-3 font-display text-4xl font-extrabold leading-tight md:text-5xl">
                                Learn it, then <span className="text-aura">live it</span>
                            </h2>
                            <p className="mt-5 text-lg text-text-secondary">
                                Before you practice, your coach walks you through a short, cinematic lesson in their own voice
                                — then hands you straight into a live rep so it actually sticks. Dark, focused, and beautiful
                                — not a wall of text.
                            </p>
                            <ul className="mt-7 space-y-3">
                                <li className="flex gap-3">
                                    <span className="material-symbols-outlined text-violet">school</span>
                                    <span>
                                        <strong className="text-text">Coach-narrated, not text-heavy.</strong>{" "}
                                        <span className="text-text-secondary">Each lesson is under 2 minutes and told in your mentor&apos;s voice.</span>
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="material-symbols-outlined text-pink">play_circle</span>
                                    <span>
                                        <strong className="text-text">Straight into practice.</strong>{" "}
                                        <span className="text-text-secondary">No friction — the rep starts the moment the lesson ends.</span>
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="material-symbols-outlined text-gold">auto_awesome</span>
                                    <span>
                                        <strong className="text-text">Built to stick.</strong>{" "}
                                        <span className="text-text-secondary">Spaced recall and live reps beat passive reading every time.</span>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </Reveal>

                    {/* Right column — image carousel */}
                    <Reveal delay={0.1}>
                        <div>
                            {/* 5-segment progress track */}
                            <div className="mb-4 flex items-center" aria-hidden="true">
                                {beats.map((b, i) => (
                                    <div key={b.n} className="flex flex-1 items-center">
                                        <div className="flex flex-1 flex-col items-center gap-1.5">
                                            <div className="h-1 w-full rounded-full bg-aura opacity-50" />
                                            <span className="text-[10px] font-bold text-text-muted">{b.n}</span>
                                        </div>
                                        {i < beats.length - 1 && (
                                            <span className="mx-0.5 shrink-0 text-[10px] text-text-muted">›</span>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Scroll rail */}
                            <div
                                className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                                role="region"
                                aria-label="Lesson beats — swipe to browse"
                            >
                                <div className="flex snap-x snap-mandatory gap-3 scroll-smooth pb-3">
                                    {beats.map((b) => (
                                        <figure
                                            key={b.n}
                                            className="snap-start shrink-0 w-[52%] sm:w-[38%] lg:w-[44%]"
                                        >
                                            <div className="relative aspect-[9/16] overflow-hidden rounded-3xl glass">
                                                <span
                                                    className="absolute left-3 top-3 z-10 grid h-7 w-7 place-items-center rounded-full bg-aura text-sm font-bold text-white shadow-glow"
                                                    aria-hidden="true"
                                                >
                                                    {b.n}
                                                </span>
                                                <img
                                                    src={b.src}
                                                    alt={`Lesson beat ${b.n}: ${b.label}`}
                                                    loading="lazy"
                                                    className="h-full w-full object-cover"
                                                    onError={(e) => { e.currentTarget.style.display = "none" }}
                                                />
                                            </div>
                                            <figcaption className="mt-2 text-center text-xs font-semibold text-text-secondary">
                                                {b.label}
                                            </figcaption>
                                        </figure>
                                    ))}
                                </div>
                            </div>
                            <p className="mt-1 text-center text-xs text-text-muted">← swipe through the lesson →</p>

                            <a
                                href="#waitlist"
                                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-aura py-3.5 text-sm font-bold text-white shadow-glow transition-opacity hover:opacity-90"
                            >
                                <span className="material-symbols-outlined text-base">play_arrow</span>
                                Try it live
                            </a>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    )
}
