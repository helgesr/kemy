import { motion } from 'framer-motion';

interface ScoreSelectorProps {
  value: number;
  onChange: (value: number) => void;
  layoutId: string;
}

const options = [
  { score: 0, label: 'Lav', color: 'bg-risk-low', textActive: 'text-white', textInactive: 'text-risk-low' },
  { score: 1, label: 'Moderat', color: 'bg-risk-medium', textActive: 'text-white', textInactive: 'text-risk-medium' },
  { score: 2, label: 'Høy', color: 'bg-risk-high', textActive: 'text-white', textInactive: 'text-risk-high' },
] as const;

export default function ScoreSelector({ value, onChange, layoutId }: ScoreSelectorProps) {
  return (
    <div className="relative flex rounded-full bg-kemy-surface dark:bg-kemy-dark-surface border border-kemy-border dark:border-kemy-dark-border p-0.5">
      {options.map((option) => (
        <button
          key={option.score}
          type="button"
          onClick={() => onChange(option.score)}
          className={`
            relative z-10 flex-1 min-h-[44px] min-w-[72px] px-4 py-2
            rounded-full text-sm font-medium transition-colors duration-150
            cursor-pointer select-none
            ${value === option.score ? option.textActive : `${option.textInactive} dark:opacity-70 hover:opacity-100`}
          `}
        >
          {value === option.score && (
            <motion.div
              layoutId={layoutId}
              className={`absolute inset-0 rounded-full ${option.color} shadow-sm`}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{option.label}</span>
        </button>
      ))}
    </div>
  );
}
