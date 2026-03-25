import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Info } from 'lucide-react';
import { useT } from '../../i18n/LanguageContext';

interface TooltipPopoverProps {
  text: string;
}

export default function TooltipPopover({ text }: TooltipPopoverProps) {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  const updatePosition = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const popoverWidth = 260;
    let left = rect.left + rect.width / 2 - popoverWidth / 2;
    // Keep within viewport horizontally
    if (left < 8) left = 8;
    if (left + popoverWidth > window.innerWidth - 8) left = window.innerWidth - 8 - popoverWidth;
    setPos({
      top: rect.bottom + 8 + window.scrollY,
      left: left + window.scrollX,
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    updatePosition();
    function handleClickOutside(e: MouseEvent) {
      if (
        popoverRef.current && !popoverRef.current.contains(e.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [open, updatePosition]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="p-0.5 rounded-full text-kemy-light dark:text-kemy-gray hover:text-kemy-plum dark:hover:text-kemy-dark-text transition-colors cursor-pointer"
        aria-label={t('score.tooltip')}
      >
        <Info size={14} />
      </button>
      {open && createPortal(
        <div
          ref={popoverRef}
          className="fixed z-[9999]"
          style={{ top: pos.top, left: pos.left, position: 'absolute' }}
        >
          <div className="bg-kemy-dark dark:bg-kemy-dark-surface text-white rounded-xl shadow-xl p-3 text-[13px] max-w-[260px] leading-relaxed border border-kemy-dark-border">
            {text}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
