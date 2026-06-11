const items = [
    { icon: "lock", color: "text-teal", label: "100% private & judgment-free" },
    { icon: "neurology", color: "text-gold", label: "Backed by behavioral science" },
    { icon: "bolt", color: "text-pink", label: "Real-time voice feedback" },
]

export default function TrustBar() {
    return (
        <section className="border-y border-stroke/60 bg-elevated/30">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 py-6 text-sm text-text-secondary md:px-8">
                {items.map((i) => (
                    <span key={i.label} className="flex items-center gap-2">
                        <span className={`material-symbols-outlined text-lg ${i.color}`}>{i.icon}</span>
                        {i.label}
                    </span>
                ))}
            </div>
        </section>
    )
}