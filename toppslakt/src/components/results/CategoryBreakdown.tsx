import { motion } from 'framer-motion';
import { categories } from '../../data/factors';

interface CategoryBreakdownProps {
  categoryScores: Record<string, number>;
  maxScore?: number;
}

function getBarColor(score: number): string {
  if (score <= 2) return 'bg-risk-low';
  if (score <= 5) return 'bg-risk-medium';
  return 'bg-risk-high';
}

export default function CategoryBreakdown({
  categoryScores,
  maxScore = 8,
}: CategoryBreakdownProps) {
  return (
    <div className="flex flex-col gap-3">
      {categories.map((cat) => {
        const score = categoryScores[cat.id] ?? 0;
        const pct = Math.min((score / maxScore) * 100, 100);

        return (
          <div key={cat.id} className="flex items-center gap-3">
            {/* Category name */}
            <span className="w-[120px] flex-shrink-0 truncate text-sm text-kemy-dark dark:text-kemy-dark-text">
              {cat.name}
            </span>

            {/* Bar track */}
            <div className="flex-1 h-2 rounded-full bg-kemy-surface dark:bg-kemy-dark-border overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${getBarColor(score)}`}
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>

            {/* Numeric label */}
            <span className="w-[36px] flex-shrink-0 text-right text-sm font-medium tabular-nums text-kemy-dark dark:text-kemy-dark-text">
              {score}/{maxScore}
            </span>
          </div>
        );
      })}
    </div>
  );
}
