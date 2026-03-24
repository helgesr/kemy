import { motion } from 'framer-motion';
import { categories } from '../../data/factors';

interface CategoryBreakdownProps {
  categoryScores: Record<string, number>;
  maxScore?: number;
}

function barColor(score: number): string {
  if (score <= 2) return 'bg-risk-low';
  if (score <= 5) return 'bg-risk-medium';
  return 'bg-risk-high';
}

export default function CategoryBreakdown({ categoryScores, maxScore = 8 }: CategoryBreakdownProps) {
  return (
    <div className="flex flex-col gap-2.5">
      {categories.map((cat) => {
        const score = categoryScores[cat.id] ?? 0;
        const pct = Math.min((score / maxScore) * 100, 100);
        return (
          <div key={cat.id} className="flex items-center gap-3">
            <span className="w-[110px] shrink-0 truncate text-[13px] text-kemy-gray dark:text-kemy-light">
              {cat.name}
            </span>
            <div className="flex-1 h-[6px] rounded-full bg-kemy-surface dark:bg-kemy-dark-border overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${barColor(score)}`}
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
            <span className="w-[32px] shrink-0 text-right text-[13px] font-semibold tabular-nums text-kemy-dark dark:text-kemy-dark-text">
              {score}/{maxScore}
            </span>
          </div>
        );
      })}
    </div>
  );
}
