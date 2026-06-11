import Reveal from "@/components/Reveal"
import DimensionMeters from "@/components/DimensionMeters"

export default function HowShedFeel() {
    return (
        <section className="px-5 py-24 md:px-8">
            <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
                <Reveal>
                    <div>
                        <span className="text-xs font-bold uppercase tracking-[0.18em] text-pink">"How She'd Feel" feedback</span>
                        <h2 className="mt-3 font-display text-4xl font-extrabold leading-tight md:text-5xl">
                            See your impact across <span className="text-aura">6 dimensions</span>
                        </h2>
                        <p className="mt-5 text-lg text-text-secondary">
                            After every conversation, Charmster breaks down how you actually landed — not vague advice, but a
                            clear read on the things that create real attraction and connection. Watch each dimension grow,
                            session after session.
                        </p>
                    </div>
                </Reveal>
                <Reveal delay={0.1}>
                    <DimensionMeters />
                </Reveal>
            </div>
        </section>
    )
}