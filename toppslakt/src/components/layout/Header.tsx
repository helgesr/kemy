import { Sun, Moon } from 'lucide-react';

interface HeaderProps {
  dark: boolean;
  onToggleTheme: () => void;
}

export default function Header({ dark, onToggleTheme }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-kemy-border dark:border-kemy-dark-border bg-kemy-white dark:bg-kemy-dark-bg">
      <div className="flex flex-col">
        <span className="font-heading font-[800] text-2xl tracking-[0.2em] text-kemy-dark dark:text-kemy-white select-none">
          KEMY
        </span>
        <span className="text-xs text-kemy-plum tracking-wide">
          Beslutningsstøtte for toppslakt
        </span>
      </div>

      <button
        onClick={onToggleTheme}
        aria-label={dark ? 'Bytt til lyst tema' : 'Bytt til mørkt tema'}
        className="p-2 rounded-lg text-kemy-dark dark:text-kemy-dark-text hover:bg-kemy-surface dark:hover:bg-kemy-dark-surface transition-colors"
      >
        {dark ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </header>
  );
}
