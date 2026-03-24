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

const styles: Record<RecommendationType, string> = {
  low: 'bg-risk-low/8 dark:bg-risk-low/15',
  medium: 'bg-risk-medium/8 dark:bg-risk-medium/15',
  high: 'bg-risk-high/8 dark:bg-risk-high/15',
};

const textStyles: Record<RecommendationType, string> = {
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
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.2 }}
        className={`rounded-xl px-4 py-3 ${styles[recommendation.type]}`}
      >
        <div className="flex items-start gap-2.5">
          <Icon size={18} className={`mt-0.5 shrink-0 ${textStyles[recommendation.type]}`} />
          <div>
            <p className={`text-sm font-semibold leading-snug ${textStyles[recommendation.type]}`}>
              {recommendation.text}
            </p>
            <p className="mt-0.5 text-[13px] text-kemy-gray dark:text-kemy-light leading-relaxed">
              {recommendation.description}
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
