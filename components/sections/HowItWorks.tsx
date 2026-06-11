import Reveal from "@/components/Reveal"

const steps = [
    { n: "1", title: "Pick a scenario", body: "First-date jitters, opening a conversation, handling a tricky question, or subtle flirting — choose where you want reps." },
    { n: "2", title: "Talk with Mia", body: "Have a natural, spoken conversation. Mia reacts to your tone and keeps it real — no scripts, no pressure." },
    { n: "3", title: "Get instant feedback", body: "See exactly how you came across with the How She'd Feel report — then run it back and watch your score climb." },
]

export default function HowItWorks() {
    return (
        <section id="how" className="border-y border-stroke/60 bg-elevated/30 px-5 py-24 md:px-8">
            <div className="mx-auto max-w-6xl">
                <Reveal>
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="text-xs font-bold uppercase tracking-[0.18em] text-pink">How it works</span>
                        <h2 className="mt-3 font-display text-4xl font-extrabold md:text-5xl">Three steps to smoother</h2>
                    </div>
                </Reveal>
                <div className="mt-14 grid gap-6 md:grid-cols-3">
                    {steps.map((s, i) => (
                        <Reveal key={s.n} delay={i * 0.08}>
                            <div className="glass h-full rounded-3xl p-8 transition-colors hover:border-pink/50">
                                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-aura font-display text-lg font-extrabold text-white">
                                    {s.n}
                                </div>
                                <h3 className="mb-2 font-display text-2xl font-bold">{s.title}</h3>
                                <p className="text-text-secondary">{s.body}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}