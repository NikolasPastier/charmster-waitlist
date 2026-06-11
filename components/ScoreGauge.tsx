"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const viewport: any = { once: true, margin: "-80px" }

// Semicircular gauge that fills from a calm-blue low score to a warm-gold high score.
export default function ScoreGauge({ target = 91 }: { target?: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, viewport)

    const radius = 120
    const arc = Math.PI * radius // length of the half-circle
    const pct = Math.min(Math.max(target, 0), 100) / 100

    const pathInitial = { strokeDashoffset: arc }
    const pathAnimate = inView ? { strokeDashoffset: arc * (1 - pct) } : {}
    const pathTransition = { duration: 1.6, ease: [0.22, 1, 0.36, 1] }

    const numberInitial = { opacity: 0 }
    const numberAnimate = inView ? { opacity: 1 } : {}
    const numberTransition = { delay: 0.7 }

    return (
        <div ref={ref} className="mx-auto w-[280px]">
            <svg viewBox="0 0 280 160" className="w-full">
                <defs>
                    <linearGradient id="score" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#4C8DFF" />
                        <stop offset="40%" stopColor="#8A5CFF" />
                        <stop offset="70%" stopColor="#FF4D94" />
                        <stop offset="100%" stopColor="#FFC23D" />
                    </linearGradient>
                </defs>
                <path d="M 20 150 A 120 120 0 0 1 260 150" fill="none" stroke="#2C2740" strokeWidth="16" strokeLinecap="round" />
                <motion.path
                    d="M 20 150 A 120 120 0 0 1 260 150"
                    fill="none"
                    stroke="url(#score)"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeDasharray={arc}
                    initial={pathInitial}
                    animate={pathAnimate}
                    transition={pathTransition}
                />
            </svg>
            <div className="-mt-10 text-center">
                <motion.span
                    className="text-aura font-display text-5xl font-bold"
                    initial={numberInitial}
                    animate={numberAnimate}
                    transition={numberTransition}
                >
                    {target}
                </motion.span>
                <p className="mt-1 text-sm text-text-secondary">Sparks flying 🔥</p>
            </div>
        </div>
    )
}