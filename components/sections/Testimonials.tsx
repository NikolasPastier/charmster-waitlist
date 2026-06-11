import Reveal from "@/components/Reveal"

const reviews = [
    { quote: "I went from rehearsing texts for an hour to actually enjoying the conversation. The voice practice is shockingly real.", name: "Jordan", role: "Beta tester", g: "linear-gradient(135deg,#A24BFF,#FF4D94)", l: "J" },
    { quote: "The 'How She'd Feel' breakdown was a wake-up call — and then a cheat code. My Curiosity score doubled in a week.", name: "Diego", role: "Beta tester", g: "linear-gradient(135deg,#4C8DFF,#8A5CFF)", l: "D" },
    { quote: "Chasing the streak got me practicing every day. First date in months last weekend — and I was calm.", name: "Marcus", role: "Beta tester", g: "linear-gradient(135deg,#FF7A45,#FFC23D)", l: "M" },
]

export default function Testimonials() {
    return (
        <section className="px-5 py-24 md:px-8">
            <div className="mx-auto max-w-6xl">
                <Reveal>
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="text-xs font-bold uppercase tracking-[0.18em] text-pink">Early testers</span>
                        <h2 className="mt-3 font-display text-4xl font-extrabold md:text-5xl">Confidence they can feel</h2>
                    </div>
                </Reveal>
                <div className="mt-14 grid gap-6 md:grid-cols-3">
                    {reviews.map((r, i) => {
                        const badgeStyle = { background: r.g }
                        return (
                            <Reveal key={r.name} delay={i * 0.07}>
                                <blockquote className="glass h-full rounded-3xl p-7">
                                    <div className="mb-3 flex gap-1 text-gold">
                                        {Array.from({ length: 5 }).map((_, s) => (
                                            <span key={s} className="material-symbols-outlined text-lg">star</span>
                                        ))}
                                    </div>
                                    <p className="text-text">{r.quote}</p>
                                    <footer className="mt-4 flex items-center gap-3">
                                        <span className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white" style={badgeStyle}>
                                            {r.l}
                                        </span>
                                        <span className="text-sm">
                                            <strong>{r.name}</strong>
                                            <span className="block text-xs text-text-muted">{r.role}</span>
                                        </span>
                                    </footer>
                                </blockquote>
                            </Reveal>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}