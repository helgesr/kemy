import type { Category } from '../../types/assessment';
import FactorRow from './FactorRow';

interface CategorySectionProps {
  category: Category;
  scores: Record<string, number>;
  onScoreChange: (factorId: string, value: number) => void;
}

function scoreBadgeColor(score: number, max: number): string {
  const r = max > 0 ? score / max : 0;
  if (r <= 0.33) return 'text-risk-low';
  if (r <= 0.66) return 'text-risk-medium';
  return 'text-risk-high';
}

export default function CategorySection({ category, scores, onScoreChange }: CategorySectionProps) {
  const max = category.factors.length * 2;
  const score = category.factors.reduce((s, f) => s + (scores[f.id] ?? 0), 0);

  return (
    <section className="bg-kemy-white dark:bg-kemy-dark-surface rounded-2xl shadow-sm border border-kemy-border dark:border-kemy-dark-border overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-kemy-border dark:border-kemy-dark-border">
        <h3 className="text-[15px] font-semibold text-kemy-dark dark:text-kemy-dark-text">
          {category.name}
        </h3>
        <span className={`text-sm font-bold tabular-nums ${scoreBadgeColor(score, max)}`}>
          {score}/{max}
        </span>
      </div>
      <div>
        {category.factors.map((factor) => (
          <FactorRow
            key={factor.id}
            factor={factor}
            value={scores[factor.id] ?? 0}
            onChange={(v) => onScoreChange(factor.id, v)}
          />
        ))}
      </div>
    </section>
  );
}
