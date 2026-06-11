import Reveal from "@/components/Reveal"
import ScoreGauge from "@/components/ScoreGauge"

const stats = [
    { icon: "trending_up", color: "text-violet", title: "Weekly Surge", body: "+12% confidence" },
    { icon: "local_fire_department", color: "text-orange", title: "Charm Streak", body: "14 days radiant" },
    { icon: "insights", color: "text-pink", title: "Peak Aura", body: "Friday 9:00 PM" },
]

export default function Vision() {
    return (
        <section id="vision" className="relative overflow-hidden border-y border-stroke/60 bg-elevated/30 px-5 py-28 md:px-8">
            <div className="relative z-10 mx-auto max-w-3xl text-center">
                <Reveal>
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-pink">The vision</span>
                    <h2 className="mt-3 font-display text-4xl font-extrabold leading-tight md:text-5xl">
                        Watch your confidence <span className="text-aura">heat up</span>
                    </h2>
                    <p className="mx-auto mt-5 max-w-2xl text-lg text-text-secondary">
                        Your <strong className="text-text">Charm Score</strong> turns invisible progress into something you can
                        feel — rising from a flicker to a full blaze as the real-world version of you catches up to your practice.
                    </p>
                </Reveal>
                <Reveal delay={0.1}>
                    <div className="mt-10">
                        <ScoreGauge target={91} />
                    </div>
                    <div className="mx-auto mt-3 flex max-w-md justify-between px-8 text-[10px] font-semibold tracking-widest text-text-muted">
                        <span>CALM</span>
                        <span>RADIANT</span>
                        <span>BLAZE</span>
                    </div>
                </Reveal>
                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                    {stats.map((s, i) => (
                        <Reveal key={s.title} delay={i * 0.08}>
                            <div className="glass flex flex-col items-center rounded-2xl p-5">
                                <span className={`material-symbols-outlined mb-2 ${s.color}`}>{s.icon}</span>
                                <span className="text-sm font-semibold">{s.title}</span>
                                <span className="text-xs text-text-secondary">{s.body}</span>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}