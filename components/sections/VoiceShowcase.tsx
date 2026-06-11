import Reveal from "@/components/Reveal"

const points = [
    { icon: "graphic_eq", color: "text-pink", title: "Natural, low-latency voice.", body: "It feels like a real phone call, not a chatbot." },
    { icon: "theater_comedy", color: "text-violet", title: "Reads your vibe.", body: "Mia adapts to your energy, humor, and pacing in the moment." },
    { icon: "replay", color: "text-gold", title: "Redo it freely.", body: "Fumble a line? Try it ten different ways. Nobody's watching." },
]

export default function VoiceShowcase() {
    return (
        <section id="voice" className="relative overflow-hidden px-5 py-24 md:px-8">
            <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
                <Reveal className="order-2 lg:order-1">
                    <div className="glass space-y-4 rounded-3xl p-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-aura font-bold text-white">M</div>
                            <div>
                                <p className="font-semibold">Mia · First-date practice</p>
                                <p className="text-xs text-teal">Listening…</p>
                            </div>
                        </div>
                        <div className="glass rounded-2xl rounded-tl-sm px-4 py-3 text-sm">
                            "I love that you're into climbing — what's the scariest route you've done?"
                        </div>
                        <div className="ml-auto max-w-[90%] rounded-2xl rounded-tr-sm bg-aura px-4 py-3 text-sm text-white">
                            "There was this overhang in Spain that nearly ended me — want the embarrassing version or the heroic one?"
                        </div>
                        <div className="flex items-center gap-2 text-xs font-semibold text-gold">
                            <span className="material-symbols-outlined text-base">auto_awesome</span>
                            Great use of playful tension — invites her to choose & keeps it light.
                        </div>
                    </div>
                </Reveal>
                <Reveal delay={0.1} className="order-1 lg:order-2">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-[0.18em] text-pink">The core experience</span>
                        <h2 className="mt-3 font-display text-4xl font-extrabold leading-tight md:text-5xl">
                            Have the conversation <span className="text-aura">out loud</span>
                        </h2>
                        <p className="mt-5 text-lg text-text-secondary">
                            Charmster isn't another swiping app or a wall of text tips. You actually{" "}
                            <strong className="text-text">talk</strong> — in real time, with your voice — to an AI partner who
                            responds naturally, reacts to your tone, and keeps the conversation flowing like a real human would.
                        </p>
                        <ul className="mt-7 space-y-4">
                            {points.map((p) => (
                                <li key={p.title} className="flex gap-3">
                                    <span className={`material-symbols-outlined ${p.color}`}>{p.icon}</span>
                                    <span>
                                        <strong className="text-text">{p.title}</strong>{" "}
                                        <span className="text-text-secondary">{p.body}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}