import WaitlistForm from "@/components/WaitlistForm"
import GradientOrbs from "@/components/GradientOrbs"
import Reveal from "@/components/Reveal"

export default function FinalCTA({ source }: { source?: string }) {
    return (
        <section id="waitlist" className="relative overflow-hidden px-5 py-28 md:px-8">
            <GradientOrbs />
            <Reveal className="relative z-10 mx-auto max-w-2xl text-center">
                <h2 className="font-display text-4xl font-extrabold leading-tight md:text-5xl">Be first in line when we launch</h2>
                <p className="mx-auto mt-5 max-w-lg text-lg text-text-secondary">
                    Join the waitlist and lock in <strong className="text-text">founding-member perks</strong> — early access,
                    lifetime-discounted premium, and a say in what we build next.
                </p>
                <div className="mt-8 flex justify-center">
                    <WaitlistForm source={source} />
                </div>
                <p className="mt-4 text-xs text-text-muted">No spam, ever. Just one email when it's your turn.</p>
            </Reveal>
        </section>
    )
}