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
        onClick={() => setOpen((prev) => !prev)}
        className="p-1 rounded-full text-kemy-gray dark:text-kemy-light hover:text-kemy-plum dark:hover:text-kemy-white transition-colors cursor-pointer"
        aria-label="Vis hjelpetekst"
      >
        <Info size={16} />
      </button>

      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50">
          {/* Arrow */}
          <div className="flex justify-center -mb-1">
            <div className="w-2.5 h-2.5 bg-kemy-dark rotate-45 rounded-sm" />
          </div>

          {/* Popover body */}
          <div className="bg-kemy-dark text-white rounded-lg shadow-lg p-3 text-sm max-w-xs leading-relaxed">
            {text}
          </div>
        </div>
      )}
    </div>
  );
}
