"use client"

import { motion } from "framer-motion"

const orbs = [
    { c: "#A24BFF55", className: "-top-32 -left-24", x: [0, 40, 0], y: [0, 30, 0], d: 18 },
    { c: "#FF4D9455", className: "top-1/3 -right-24", x: [0, -30, 0], y: [0, 40, 0], d: 22 },
    { c: "#FF7A4544", className: "bottom-0 left-1/3", x: [0, 30, 0], y: [0, -20, 0], d: 20 },
]

export default function GradientOrbs() {
    return (
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            {orbs.map((o, i) => {
                const style = { background: `radial-gradient(circle, ${o.c}, transparent 70%)` }
                const animate = { x: o.x, y: o.y }
                const transition = { duration: o.d, repeat: Infinity, ease: "easeInOut" }
                return (
                    <motion.div
                        key={i}
                        className={`absolute h-96 w-96 rounded-full blur-3xl ${o.className}`}
                        style={style}
                        animate={animate}
                        transition={transition}
                    />
                )
            })}
        </div>
    )
}