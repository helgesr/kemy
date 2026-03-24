import { useState, useRef, useEffect } from 'react';
import { Info } from 'lucide-react';

interface TooltipPopoverProps {
  text: string;
}

export default function TooltipPopover({ text }: TooltipPopoverProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="relative inline-flex" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="p-0.5 rounded-full text-kemy-light dark:text-kemy-gray hover:text-kemy-plum dark:hover:text-kemy-dark-text transition-colors cursor-pointer"
        aria-label="Vis hjelpetekst"
      >
        <Info size={14} />
      </button>
      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50">
          <div className="bg-kemy-dark dark:bg-kemy-dark-surface text-white rounded-xl shadow-xl p-3 text-[13px] max-w-[260px] leading-relaxed border border-kemy-dark-border">
            {text}
          </div>
        </div>
      )}
    </div>
  );
}
