"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

const variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
}

const viewport: any = { once: true, margin: "-80px" }

export default function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
    const transition = { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }
    return (
        <motion.div
            className={className}
            variants={variants}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            transition={transition}
        >
            {children}
        </motion.div>
    )
}