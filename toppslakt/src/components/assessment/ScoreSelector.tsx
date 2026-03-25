import { motion } from 'framer-motion';
import { useT } from '../../i18n/LanguageContext';
import type { TranslationKey } from '../../i18n/no';

interface ScoreSelectorProps {
  value: number;
  onChange: (value: number) => void;
  layoutId: string;
}

const options: { score: number; labelKey: TranslationKey; activeColor: string; activeText: string }[] = [
  { score: 0, labelKey: 'score.low', activeColor: 'bg-risk-low', activeText: 'text-white' },
  { score: 1, labelKey: 'score.moderate', activeColor: 'bg-risk-medium', activeText: 'text-white' },
  { score: 2, labelKey: 'score.high', activeColor: 'bg-risk-high', activeText: 'text-white' },
];

export default function ScoreSelector({ value, onChange, layoutId }: ScoreSelectorProps) {
  const { t } = useT();

  return (
    <div className="inline-flex rounded-xl bg-kemy-surface dark:bg-kemy-dark-bg p-[3px] gap-[2px]">
      {options.map((opt) => {
        const active = value === opt.score;
        return (
          <button
            key={opt.score}
            type="button"
            onClick={() => onChange(opt.score)}
            className={`
              relative min-w-[60px] h-[34px] px-3 rounded-[10px] text-[13px] font-medium
              transition-colors duration-150 cursor-pointer select-none
              ${active ? opt.activeText : 'text-kemy-gray dark:text-kemy-light'}
            `}
          >
            {active && (
              <motion.div
                layoutId={layoutId}
                className={`absolute inset-0 rounded-[10px] ${opt.activeColor} shadow-sm`}
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative z-10">{t(opt.labelKey)}</span>
          </button>
        );
      })}
    </div>
  );
}
