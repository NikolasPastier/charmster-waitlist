import WaitlistForm from "@/components/WaitlistForm"
import GradientOrbs from "@/components/GradientOrbs"
import LivePracticePhone from "@/components/LivePracticePhone"
import Reveal from "@/components/Reveal"

const avatars = [
    { l: "J", g: "linear-gradient(135deg,#A24BFF,#FF4D94)" },
    { l: "M", g: "linear-gradient(135deg,#FF4D94,#FF7A45)" },
    { l: "D", g: "linear-gradient(135deg,#4C8DFF,#8A5CFF)" },
    { l: "+", g: "linear-gradient(135deg,#FF7A45,#FFC23D)" },
]

export default function Hero({ source }: { source?: string }) {
    return (
        <section className="relative flex min-h-screen items-center overflow-hidden px-5 pb-20 pt-28 md:px-8">
            <GradientOrbs />
            <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-2">
                <div className="text-center lg:text-left">
                    <Reveal>
                        <span className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#DBB8FF]">
                            <span className="material-symbols-outlined text-base">graphic_eq</span> Live AI voice practice
                        </span>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <h1 className="font-display text-5xl font-extrabold leading-[1.05] md:text-6xl">
                            Practice love.
                            <br />
                            <span className="text-aura">Build real confidence.</span>
                        </h1>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="mx-auto mt-6 max-w-xl text-lg text-text-secondary lg:mx-0">
                            Talk out loud with a practice partner who feels real — coached by a mentor you choose. Have real,
                            low-pressure voice conversations and get instant feedback on exactly how you came across — so the
                            real thing finally feels easy.
                        </p>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <div className="mt-8 flex justify-center lg:justify-start">
                            <WaitlistForm source={source} />
                        </div>
                    </Reveal>
                    <Reveal delay={0.4}>
                        <div className="mt-6 flex items-center justify-center gap-3 lg:justify-start">
                            <div className="flex -space-x-2.5">
                                {avatars.map((a) => {
                                    const avatarStyle = { background: a.g }
                                    return (
                                        <span
                                            key={a.l}
                                            className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-bg text-xs font-bold text-white"
                                            style={avatarStyle}
                                        >
                                            {a.l}
                                        </span>
                                    )
                                })}
                            </div>
                            <p className="text-sm text-text-secondary">
                                <strong className="text-text">2,000+</strong> people leveling up their confidence
                            </p>
                        </div>
                    </Reveal>
                </div>
                <Reveal delay={0.2}>
                    <LivePracticePhone />
                </Reveal>
            </div>
        </section>
    )
}