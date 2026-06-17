const links = [
    { href: "#how", label: "How it works" },
    { href: "#voice", label: "Voice" },
    { href: "#coaches", label: "Coaches" },
    { href: "#avatars", label: "Avatars" },
    { href: "#features", label: "Features" },
    { href: "#vision", label: "Vision" },
]

export default function Nav() {
    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-stroke/60 bg-bg/70 backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
                <a href="#" className="flex items-center gap-2.5">
                    <img src="/logo-mark.png" alt="Charmster" className="h-8 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,77,148,0.45)]" />
                    <img src="/logo-wordmark.png" alt="Charmster" className="h-5 w-auto object-contain" />
                </a>
                <nav className="hidden items-center gap-9 text-sm font-semibold text-text-secondary md:flex">
                    {links.map((l) => (
                        <a key={l.href} href={l.href} className="transition-colors hover:text-text">
                            {l.label}
                        </a>
                    ))}
                </nav>
                <a href="#waitlist" className="rounded-full bg-aura px-5 py-2.5 text-sm font-bold text-white shadow-glow">
                    Join waitlist
                </a>
            </div>
        </header>
    )
}