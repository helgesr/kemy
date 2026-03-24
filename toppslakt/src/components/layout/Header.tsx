import { Sun, Moon } from 'lucide-react';

interface HeaderProps {
  dark: boolean;
  onToggleTheme: () => void;
}

export default function Header({ dark, onToggleTheme }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-kemy-white/80 dark:bg-kemy-dark-bg/80 border-b border-kemy-border dark:border-kemy-dark-border">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 h-14">
        <div className="flex items-center gap-4">
          {/* Logo: sharp, heavy sans-serif, tight tracking */}
          <span className="text-[22px] font-bold tracking-tight text-kemy-dark dark:text-kemy-dark-text select-none">
            KEMY
          </span>
          <div className="hidden sm:block h-4 w-px bg-kemy-border dark:bg-kemy-dark-border" />
          <span className="hidden sm:block text-[13px] text-kemy-gray dark:text-kemy-light">
            Toppslakt
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
