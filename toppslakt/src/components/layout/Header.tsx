import { Sun, Moon } from 'lucide-react';

interface HeaderProps {
  dark: boolean;
  onToggleTheme: () => void;
}

export default function Header({ dark, onToggleTheme }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-kemy-white/80 dark:bg-kemy-dark-bg/80 border-b border-kemy-border dark:border-kemy-dark-border">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 h-14">
        <div className="flex items-center gap-3">
          <span className="font-heading text-xl tracking-[0.18em] text-kemy-dark dark:text-kemy-dark-text select-none">
            KEMY
          </span>
          <span className="hidden sm:inline text-[11px] text-kemy-light dark:text-kemy-gray tracking-wide">
            Beslutningsstøtte for toppslakt
          </span>
        </div>

        <button
          onClick={onToggleTheme}
          aria-label={dark ? 'Bytt til lyst tema' : 'Bytt til mørkt tema'}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-kemy-surface dark:bg-kemy-dark-surface text-kemy-gray dark:text-kemy-dark-text hover:bg-kemy-border dark:hover:bg-kemy-dark-border transition-colors"
        >
          {dark ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>
    </header>
  );
}
