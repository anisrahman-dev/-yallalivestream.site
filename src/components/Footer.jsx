import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--header-border)] bg-[var(--header-bg)] transition-colors duration-300">
      <div className="px-6 md:px-16 py-10 w-full max-w-[1200px] mx-auto flex flex-col md:flex-row md:justify-between items-center md:items-start gap-8">
        <div className="flex flex-col items-center md:items-start gap-4 max-w-sm">
          <img
            src="/logos/logo-unified.png"
            alt="Yalla Live Stream Logo"
            className="h-14 md:h-16 w-auto object-contain select-none pointer-events-none"
          />
          <p className="text-[11px] text-gray-500 dark:text-slate-400 text-center md:text-left leading-relaxed">
            <strong>Yalla Live Stream</strong> — free live football streaming for every match.
            Today’s <strong>Yalla Shoot</strong> &amp; <strong>Koora</strong> live
            streams, fixtures and real-time scores, all in one place.
          </p>
        </div>
        <div className="flex flex-col items-center md:items-end gap-6 md:gap-8">
          <nav className="flex flex-wrap justify-center md:justify-end gap-6 md:gap-8">
            <Link to="/terms.html" className="text-gray-500 dark:text-slate-400 hover:text-primary transition-colors text-xs font-bold uppercase tracking-wider">Terms</Link>
            <Link to="/privacy.html" className="text-gray-500 dark:text-slate-400 hover:text-primary transition-colors text-xs font-bold uppercase tracking-wider">Privacy Policy</Link>
            <Link to="/contact.html" className="text-gray-500 dark:text-slate-400 hover:text-primary transition-colors text-xs font-bold uppercase tracking-wider">Contact</Link>
          </nav>
          <div className="text-gray-400 dark:text-slate-500 text-[10px] font-bold tracking-widest text-center md:text-right">
            © 2026 YALLA LIVE STREAM. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  )
}
