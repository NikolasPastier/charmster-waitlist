export default function Footer() {
    return (
        <footer className="border-t border-stroke/60 bg-bg">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 md:flex-row md:px-8">
                <div className="flex items-center gap-2">
                    <img src="/logo-mark.png" alt="Charmster" className="h-7 w-auto object-contain" />
                    <img src="/logo-wordmark.png" alt="Charmster" className="h-4 w-auto object-contain" />
                </div>
                <div className="flex gap-6 text-sm text-text-secondary">
                    <a href="https://www.tiktok.com/@charmster.app" className="transition-colors hover:text-text">TikTok</a>
                    <a href="https://www.instagram.com/charmster.app/" className="transition-colors hover:text-text">Instagram</a>
                    <a href="/privacy" className="transition-colors hover:text-text">Privacy</a>
                </div>
                <p className="text-xs text-text-muted">© {new Date().getFullYear()} Charmster. All rights reserved.</p>
            </div>
        </footer>
    )
}