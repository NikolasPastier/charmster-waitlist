"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const dims = [
    { label: "Warmth", value: 92, icon: "favorite" },
    { label: "Confidence", value: 88, icon: "bolt" },
    { label: "Humor", value: 79, icon: "mood" },
    { label: "Curiosity", value: 85, icon: "psychology_alt" },
    { label: "Authenticity", value: 90, icon: "verified_user" },
    { label: "Flirtation", value: 76, icon: "local_fire_department" },
]

const start = { width: 0 }
const viewport: any = { once: true, margin: "-80px" }

export default function DimensionMeters() {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, viewport)
    return (
        <div ref={ref} className="glass space-y-5 rounded-3xl p-7">
            {dims.map((d, i) => {
                const fill = inView ? { width: `${d.value}%` } : start
                const meterTransition = { duration: 1.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }
                return (
                    <div key={d.label}>
                        <div className="mb-1.5 flex justify-between text-sm">
                            <span className="flex items-center gap-2 font-semibold">
                                <span className="material-symbols-outlined text-lg">{d.icon}</span>
                                {d.label}
                            </span>
                            <span className="text-text-secondary">{d.value}</span>
                        </div>
                        <div className="h-2.5 rounded-full bg-surface">
                            <motion.div className="h-full rounded-full bg-aura" initial={start} animate={fill} transition={meterTransition} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}