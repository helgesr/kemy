import { AnimatePresence, motion } from 'framer-motion';
import { ShieldCheck, AlertTriangle, AlertOctagon } from 'lucide-react';
import type { Recommendation, RecommendationType } from '../../types/assessment';

interface RecommendationBannerProps {
  recommendation: Recommendation;
}

const iconMap: Record<RecommendationType, React.ElementType> = {
  low: ShieldCheck,
  medium: AlertTriangle,
  high: AlertOctagon,
};

const bgClasses: Record<RecommendationType, string> = {
  low: 'bg-risk-low-bg dark:bg-risk-low/15',
  medium: 'bg-risk-medium-bg dark:bg-risk-medium/15',
  high: 'bg-risk-high-bg dark:bg-risk-high/15',
};

const textClasses: Record<RecommendationType, string> = {
  low: 'text-risk-low',
  medium: 'text-risk-medium',
  high: 'text-risk-high',
};

export default function RecommendationBanner({ recommendation }: RecommendationBannerProps) {
  const Icon = iconMap[recommendation.type];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={recommendation.type}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25 }}
        className={`w-full rounded-xl px-5 py-4 ${bgClasses[recommendation.type]}`}
      >
        <div className="flex items-start gap-3">
          <Icon
            size={22}
            className={`mt-0.5 flex-shrink-0 ${textClasses[recommendation.type]}`}
          />
          <div className="min-w-0">
            <p
              className={`text-sm font-semibold leading-snug ${textClasses[recommendation.type]}`}
            >
              {recommendation.text}
            </p>
            <p className="mt-1 text-sm text-kemy-gray dark:text-kemy-dark-text leading-relaxed">
              {recommendation.description}
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
