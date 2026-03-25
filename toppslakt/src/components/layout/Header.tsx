import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';

interface HeaderProps {
  dark: boolean;
  onToggleTheme: () => void;
}

const navItems = [
  { label: 'Products', path: '/products' },
  { label: 'Markets', path: '/markets' },
  { label: 'Case', path: '/case' },
  { label: 'Vurdering', path: '/tools' },
  { label: 'Contact', path: '/contact' },
];

export default function Header({ dark, onToggleTheme }: HeaderProps) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

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
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
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
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
