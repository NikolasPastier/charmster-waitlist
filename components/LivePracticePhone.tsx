"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

// The hero phone mockup: the real Charmster live-practice screen — a full-bleed
// Mia video with a live timer, animated progress bar, a "speaking / listening"
// indicator, and a pointer parallax-tilt. Drop mia.mp4 + mia-poster.jpg in /public.
const floatAnimate = { y: [0, -14, 0] }
const floatTransition = { duration: 6, repeat: Infinity, ease: "easeInOut" }

export default function LivePracticePhone() {
    const tiltRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const [timer, setTimer] = useState("4:45")
    const [progress, setProgress] = useState(64)
    const [speaking, setSpeaking] = useState(true)

    // Force muted autoplay. React's `muted` JSX attribute is unreliable, so set it on the
    // element directly and kick off playback — otherwise Safari/Chrome block autoplay.
    useEffect(() => {
        const v = videoRef.current
        if (!v) return
        v.muted = true
        v.defaultMuted = true
        const tryPlay = () => { v.play().catch(() => {}) }
        tryPlay()
        v.addEventListener("loadeddata", tryPlay)
        const onVisible = () => {
            if (document.visibilityState === "visible") tryPlay()
        }
        document.addEventListener("visibilitychange", onVisible)
        return () => {
            v.removeEventListener("loadeddata", tryPlay)
            document.removeEventListener("visibilitychange", onVisible)
        }
    }, [])

    // Live timer
    useEffect(() => {
        let s = 285
        const id = setInterval(() => {
            s += 1
            const m = Math.floor(s / 60)
            const ss = String(s % 60).padStart(2, "0")
            setTimer(`${m}:${ss}`)
        }, 1000)
        return () => clearInterval(id)
    }, [])

    // Progress bar loop
    useEffect(() => {
        const id = setInterval(() => setProgress((p) => (p > 96 ? 8 : p + 1.4)), 1400)
        return () => clearInterval(id)
    }, [])

    // Speaking / listening indicator
    useEffect(() => {
        const id = setInterval(() => setSpeaking((v) => !v), 3600)
        return () => clearInterval(id)
    }, [])

    // Pointer parallax-tilt
    useEffect(() => {
        const el = tiltRef.current
        if (!el) return
        if (!window.matchMedia("(pointer:fine)").matches) return
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
        const onMove = (e: MouseEvent) => {
            const x = e.clientX / window.innerWidth - 0.5
            const y = e.clientY / window.innerHeight - 0.5
            el.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`
        }
        window.addEventListener("mousemove", onMove)
        return () => window.removeEventListener("mousemove", onMove)
    }, [])

    const progressStyle = { width: `${progress}%`, background: "linear-gradient(90deg,#FF4D94,#FF7A45)" }
    const thumbStyle = { left: `calc(${progress}% - 6px)` }
    const dotStyle = { background: speaking ? "#FF3B5E" : "#35D6C5" }
    const doneStyle = { background: "#FF4D94", boxShadow: "0 8px 24px -6px rgba(255,77,148,0.6)" }

    return (
        <div className="flex justify-center [perspective:1400px]">
            <div ref={tiltRef} className="transition-transform duration-200 [transform-style:preserve-3d]">
                <motion.div
                    animate={floatAnimate}
                    transition={floatTransition}
                    className="relative z-10 h-[620px] w-[300px] overflow-hidden rounded-[46px] border-[9px] border-[#15121F] bg-black shadow-[0_50px_130px_-30px_rgba(162,75,255,0.5)]"
                >
                    {/* full-bleed avatar video */}
                    <video
                        ref={videoRef}
                        className="absolute inset-0 h-full w-full object-cover [filter:saturate(1.05)_contrast(1.03)]"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        poster="/mia-poster.jpg"
                    >
                        <source src="/mia.mp4" type="video/mp4" />
                    </video>

                    {/* scrims for control legibility */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-black/80 via-black/25 to-transparent" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-64 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />

                    {/* dynamic island */}
                    <div className="absolute left-1/2 top-2.5 z-30 h-6 w-24 -translate-x-1/2 rounded-full bg-black/90" />

                    {/* status bar */}
                    <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 pt-3 text-[11px] text-white">
                        <span className="font-semibold">15:17</span>
                        <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">signal_cellular_alt</span>
                            <span className="material-symbols-outlined text-sm">wifi</span>
                            <span className="material-symbols-outlined text-sm">battery_full</span>
                        </span>
                    </div>

                    {/* top controls */}
                    <div className="absolute inset-x-0 top-9 z-20 flex items-center justify-between px-4">
                        <button aria-label="Close" className="glass-strong flex h-11 w-11 items-center justify-center rounded-full text-white">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                        <div className="glass-strong rounded-full px-4 py-1.5 text-sm font-semibold tabular-nums text-white">{timer}</div>
                        <button aria-label="Share screen" className="glass-strong flex h-11 w-11 items-center justify-center rounded-full text-white">
                            <span className="material-symbols-outlined">screen_share</span>
                        </button>
                    </div>

                    {/* bottom UI */}
                    <div className="absolute inset-x-0 bottom-0 z-20 p-4 pb-6">
                        <div className="mb-5 px-1">
                            <div className="relative h-1.5 rounded-full bg-white/10">
                                <div className="h-full rounded-full transition-[width] duration-1000 ease-linear" style={progressStyle} />
                                <span className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white shadow-md transition-[left] duration-1000 ease-linear" style={thumbStyle} />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm font-semibold text-white/90">
                                <span className="h-2 w-2 rounded-full" style={dotStyle} />
                                <span>{speaking ? "She's speaking" : "Listening…"}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <button aria-label="Chat" className="glass-strong flex h-11 w-11 items-center justify-center rounded-full text-white">
                                    <span className="material-symbols-outlined">chat_bubble</span>
                                </button>
                                <button aria-label="Done" className="rounded-full px-6 py-2.5 text-sm font-extrabold text-[#23101A]" style={doneStyle}>
                                    Done
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}