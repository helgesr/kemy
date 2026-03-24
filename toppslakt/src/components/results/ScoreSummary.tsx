import type { Recommendation } from '../../types/assessment';
import GaugeChart from './GaugeChart';
import RecommendationBanner from './RecommendationBanner';
import RadarChart from './RadarChart';
import CategoryBreakdown from './CategoryBreakdown';

interface ScoreSummaryProps {
  totalScore: number;
  recommendation: Recommendation;
  categoryScores: Record<string, number>;
}

export default function ScoreSummary({
  totalScore,
  recommendation,
  categoryScores,
}: ScoreSummaryProps) {
  return (
    <div className="lg:sticky lg:top-20 flex flex-col gap-5">
      <div className="bg-kemy-white dark:bg-kemy-dark-surface rounded-2xl shadow-sm border border-kemy-border dark:border-kemy-dark-border p-5">
        <GaugeChart score={totalScore} />
        <div className="mt-4">
          <RecommendationBanner recommendation={recommendation} />
        </div>
      </div>

      <div className="bg-kemy-white dark:bg-kemy-dark-surface rounded-2xl shadow-sm border border-kemy-border dark:border-kemy-dark-border p-5">
        <RadarChart categoryScores={categoryScores} />
        <div className="mt-4">
          <CategoryBreakdown categoryScores={categoryScores} />
        </div>
      </div>
    </div>
  );
}
