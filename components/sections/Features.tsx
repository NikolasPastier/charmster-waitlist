import Reveal from "@/components/Reveal"

const features = [
    { icon: "mic", iconColor: "text-pink", iconBg: "bg-pink/10", title: "Live AI voice practice", body: "Real-time, natural conversations with Mia that feel like an actual call — your main training ground." },
    { icon: "monitoring", iconColor: "text-purple", iconBg: "bg-purple/10", title: "\u201CHow She'd Feel\u201D report", body: "Honest, psychology-backed feedback across 6 attraction dimensions after every session." },
    { icon: "route", iconColor: "text-blue", iconBg: "bg-blue/10", title: "A skill path, not a feed", body: "A structured 16-track curriculum that takes you from first hello to deep connection." },
    { icon: "local_fire_department", iconColor: "text-gold", iconBg: "bg-gold/10", title: "Streaks & mastery", body: "Daily streaks, XP and mastery levels keep momentum high and make practice a habit." },
    { icon: "forum", iconColor: "text-teal", iconBg: "bg-teal/10", title: "Real-world scenarios", body: "Coffee shops, first dates, texting, tricky moments — rehearse the situations that actually trip you up." },
    { icon: "shield_lock", iconColor: "text-orange", iconBg: "bg-orange/10", title: "Totally private", body: "No audience, no judgment. Just you, getting better in a space that's completely your own." },
    { icon: "groups", iconColor: "text-purple", iconBg: "bg-purple/10", title: "5 coaches, your pick", body: "Choose a mentor whose style fits you — from calm therapist to hype wingman — and switch anytime." },
    { icon: "tune", iconColor: "text-teal", iconBg: "bg-teal/10", title: "Make your partner yours", body: "5 realistic looks, 5 voices, any combo, your chosen name — practice with someone who feels real." },
]

export default function Features() {
    return (
        <section id="features" className="border-y border-stroke/60 bg-elevated/30 px-5 py-24 md:px-8">
            <div className="mx-auto max-w-6xl">
                <Reveal>
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="text-xs font-bold uppercase tracking-[0.18em] text-pink">Everything inside</span>
                        <h2 className="mt-3 font-display text-4xl font-extrabold md:text-5xl">Built to make you better, fast</h2>
                    </div>
                </Reveal>
                <div className="mt-14 flex flex-wrap justify-center gap-6">
                    {features.map((f, i) => (
                        <Reveal key={f.title} delay={(i % 3) * 0.05}
                                className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
                            <article className="glass h-full rounded-3xl p-7">
                                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${f.iconBg} ${f.iconColor}`}>
                                    <span className="material-symbols-outlined">{f.icon}</span>
                                </div>
                                <h3 className="mb-2 font-display text-xl font-bold">{f.title}</h3>
                                <p className="text-sm text-text-secondary">{f.body}</p>
                            </article>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}