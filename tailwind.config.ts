import type { Config } from "tailwindcss"

const config: Config = {
    content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                bg: "#0B0910",
                surface: "#14111C",
                elevated: "#1D1928",
                stroke: "#2C2740",
                text: { DEFAULT: "#F6F4FA", secondary: "#ABA4BD", muted: "#6C6580" },
                purple: "#A24BFF",
                pink: "#FF4D94",
                red: "#FF3B5E",
                orange: "#FF7A45",
                gold: "#FFC23D",
                blue: "#4C8DFF",
                teal: "#35D6C5",
                violet: "#8A5CFF",
            },
            backgroundImage: {
                aura: "linear-gradient(135deg,#A24BFF 0%,#FF4D94 30%,#FF3B5E 55%,#FF7A45 80%,#FFC23D 100%)",
                score: "linear-gradient(90deg,#4C8DFF 0%,#8A5CFF 40%,#FF4D94 70%,#FFC23D 100%)",
            },
            fontFamily: {
                display: ["var(--font-display)", "system-ui", "sans-serif"],
                sans: ["var(--font-body)", "system-ui", "sans-serif"],
            },
            boxShadow: {
                glow: "0 0 24px rgba(255,77,148,0.35)",
                "glow-gold": "0 0 32px rgba(255,194,61,0.45)",
            },
        },
    },
    plugins: [],
}

export default config