import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useT } from '../../i18n/LanguageContext';
import type { TranslationKey } from '../../i18n/no';

interface HeaderProps {
  dark: boolean;
  onToggleTheme: () => void;
}

const navItems: { labelKey: TranslationKey; path: string }[] = [
  { labelKey: 'nav.products', path: '/products' },
  { labelKey: 'nav.markets', path: '/markets' },
  { labelKey: 'nav.case', path: '/case' },
  { labelKey: 'nav.tools', path: '/tools' },
  { labelKey: 'nav.contact', path: '/contact' },
];

export default function Header({ dark, onToggleTheme }: HeaderProps) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, toggle: toggleLang, t } = useT();

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-kemy-white/80 dark:bg-kemy-dark-bg/80 border-b border-kemy-border dark:border-kemy-dark-border">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 h-14">
        {/* Logo */}
        <Link to="/" className="text-[22px] font-bold tracking-tight text-kemy-dark dark:text-kemy-dark-text select-none">
          KEMY
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
                  active
                    ? 'bg-kemy-surface dark:bg-kemy-dark-surface text-kemy-dark dark:text-kemy-dark-text'
                    : 'text-kemy-gray dark:text-kemy-light hover:text-kemy-dark dark:hover:text-kemy-dark-text'
                }`}
              >
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            aria-label={t('lang.toggle')}
            className="h-8 px-2.5 flex items-center gap-1.5 rounded-full bg-kemy-surface dark:bg-kemy-dark-surface text-kemy-gray dark:text-kemy-dark-text hover:bg-kemy-border dark:hover:bg-kemy-dark-border transition-colors text-[12px] font-semibold tracking-wide uppercase select-none"
          >
            <span className="relative w-[18px] h-[13px] rounded-[2px] overflow-hidden shrink-0 shadow-sm">
              {lang === 'no' ? (
                /* Norwegian flag */
                <svg viewBox="0 0 22 16" className="w-full h-full">
                  <rect width="22" height="16" fill="#BA0C2F"/>
                  <rect y="6" width="22" height="4" fill="#fff"/>
                  <rect x="6" width="4" height="16" fill="#fff"/>
                  <rect y="7" width="22" height="2" fill="#00205B"/>
                  <rect x="7" width="2" height="16" fill="#00205B"/>
                </svg>
              ) : (
                /* UK flag */
                <svg viewBox="0 0 60 30" className="w-full h-full">
                  <clipPath id="t"><rect width="30" height="15"/></clipPath>
                  <rect width="60" height="30" fill="#00247d"/>
                  <path d="M0,0 60,30 M60,0 0,30" stroke="#fff" strokeWidth="6"/>
                  <path d="M0,0 60,30 M60,0 0,30" clipPath="url(#t)" stroke="#cf142b" strokeWidth="4"/>
                  <path d="M30,0v30M0,15h60" stroke="#fff" strokeWidth="10"/>
                  <path d="M30,0v30M0,15h60" stroke="#cf142b" strokeWidth="6"/>
                </svg>
              )}
            </span>
            {t('lang.toggle')}
          </button>

          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            aria-label={dark ? 'Light mode' : 'Dark mode'}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-kemy-surface dark:bg-kemy-dark-surface text-kemy-gray dark:text-kemy-dark-text hover:bg-kemy-border dark:hover:bg-kemy-dark-border transition-colors"
          >
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-full bg-kemy-surface dark:bg-kemy-dark-surface text-kemy-gray"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="md:hidden border-t border-kemy-border dark:border-kemy-dark-border bg-kemy-white dark:bg-kemy-dark-bg px-4 py-2">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-kemy-surface dark:bg-kemy-dark-surface text-kemy-dark dark:text-kemy-dark-text'
                    : 'text-kemy-gray dark:text-kemy-light'
                }`}
              >
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
