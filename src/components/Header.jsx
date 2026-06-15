import { Link } from 'react-router-dom'
import useTheme from '../hooks/useTheme.js'

export default function Header({ withWcBar = false }) {
  const { theme, toggle } = useTheme()
  const topClass = withWcBar
    ? 'fixed top-[76px] md:top-[56px] w-full z-50'
    : 'fixed top-0 w-full z-50'
  return (
    <header className={`${topClass} border-b border-[#f97316]/20 bg-white/95 dark:bg-slate-900/95 backdrop-blur shadow-sm`}>
      <div className="flex justify-between items-center px-4 md:px-8 py-0 w-full max-w-[1200px] mx-auto h-[80px]">
        <Link to="/" className="h-full flex items-center select-none hover:opacity-90 transition-opacity">
          <img src="/logos/logo-unified.png" alt="Yalla Live" className="h-[70px] md:h-[72px] w-auto object-contain" />
        </Link>
        <div className="flex items-center gap-2">
          <button
            id="theme-toggle"
            className="header-icon-btn btn-theme"
            aria-label="Toggle Dark Mode"
            onClick={toggle}
          >
            <span className="material-symbols-outlined">{theme === 'dark' ? 'dark_mode' : 'light_mode'}</span>
          </button>
          <a
            href="https://t.me"
            target="_blank"
            rel="noreferrer"
            className="header-icon-btn hover:scale-105 transition-transform"
            aria-label="Telegram"
            style={{ background: 'transparent', padding: 0 }}
          >
            <img src="/logos/telegram.svg" alt="Telegram" className="w-8 h-8 rounded-full shadow-sm" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="header-icon-btn hover:scale-105 transition-transform"
            aria-label="Facebook"
            style={{ background: 'transparent', padding: 0 }}
          >
            <img src="/logos/facebook.svg" alt="Facebook" className="w-8 h-8 rounded-full shadow-sm" />
          </a>
        </div>
      </div>
    </header>
  )
}
