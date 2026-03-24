import type { Category } from '../../types/assessment';
import FactorRow from './FactorRow';

interface CategorySectionProps {
  category: Category;
  scores: Record<string, number>;
  onScoreChange: (factorId: string, value: number) => void;
}

function getScoreBadgeClasses(score: number, maxScore: number): string {
  const ratio = maxScore > 0 ? score / maxScore : 0;

  if (ratio <= 0.33) {
    return 'bg-risk-low-bg text-risk-low dark:bg-risk-low/20 dark:text-risk-low';
  }
  if (ratio <= 0.66) {
    return 'bg-risk-medium-bg text-risk-medium dark:bg-risk-medium/20 dark:text-risk-medium';
  }
  return 'bg-risk-high-bg text-risk-high dark:bg-risk-high/20 dark:text-risk-high';
}

export default function CategorySection({ category, scores, onScoreChange }: CategorySectionProps) {
  const maxScore = category.factors.length * 2;
  const categoryScore = category.factors.reduce(
    (sum, factor) => sum + (scores[factor.id] ?? 0),
    0,
  );

  const badgeClasses = getScoreBadgeClasses(categoryScore, maxScore);

  return (
    <section className="bg-kemy-white dark:bg-kemy-dark-surface rounded-xl shadow-sm border border-kemy-border dark:border-kemy-dark-border">
      {/* Category header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-kemy-border dark:border-kemy-dark-border">
        <h3 className="font-heading text-lg font-semibold text-kemy-dark dark:text-kemy-white">
          {category.name}
        </h3>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tabular-nums ${badgeClasses}`}
        >
          {categoryScore}/{maxScore}
        </span>
      </div>

      {/* Factor rows */}
      <div className="px-5">
        {category.factors.map((factor) => (
          <FactorRow
            key={factor.id}
            factor={factor}
            value={scores[factor.id] ?? 0}
            onChange={(value) => onScoreChange(factor.id, value)}
          />
        ))}
      </div>
    </section>
  );
}
