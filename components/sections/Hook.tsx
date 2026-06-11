import Reveal from "@/components/Reveal"

export default function Hook() {
    return (
        <section id="hook" className="px-5 py-24 text-center md:px-8">
            <div className="mx-auto max-w-3xl">
                <Reveal>
                    <h2 className="font-display text-4xl font-extrabold leading-tight md:text-5xl">
                        Freeze up on dates?
                        <br />
                        Run out of things to say?
                    </h2>
                </Reveal>
                <Reveal delay={0.1}>
                    <p className="mt-6 text-lg text-text-secondary">
                        It's not you — it's just a lack of reps. You'd never expect to nail a language or an instrument
                        without practice, yet we're all told to just "be confident" on the spot. Charmster gives you a safe
                        space to practice the conversation <em className="text-text">before</em> it matters, until confidence
                        becomes your default.
                    </p>
                </Reveal>
            </div>
        </section>
    )
}