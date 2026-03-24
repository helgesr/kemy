import { Sun, Moon } from 'lucide-react';

interface HeaderProps {
  dark: boolean;
  onToggleTheme: () => void;
}

export default function Header({ dark, onToggleTheme }: HeaderProps) {
  return (
    <header className="bg-kemy-dark dark:bg-kemy-accent">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
        <div className="flex flex-col">
          <span className="font-heading font-[800] text-2xl tracking-[0.25em] text-kemy-white select-none">
            KEMY
          </span>
          <span className="text-xs text-kemy-light/70 tracking-wide mt-0.5">
            Beslutningsstøtte for toppslakt
          </span>
        </div>

        <button
          onClick={onToggleTheme}
          aria-label={dark ? 'Bytt til lyst tema' : 'Bytt til mørkt tema'}
          className="p-2 rounded-lg text-kemy-light hover:text-kemy-white hover:bg-white/10 transition-colors"
        >
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
}
