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
    <div className="lg:sticky lg:top-6 flex flex-col gap-6 rounded-xl border border-kemy-border dark:border-kemy-dark-border bg-kemy-white dark:bg-kemy-dark-surface p-6 shadow-sm">
      {/* Gauge */}
      <GaugeChart score={totalScore} />

      {/* Recommendation */}
      <RecommendationBanner recommendation={recommendation} />

      {/* Radar */}
      <RadarChart categoryScores={categoryScores} />

      {/* Category breakdown bars */}
      <CategoryBreakdown categoryScores={categoryScores} />
    </div>
  );
}
