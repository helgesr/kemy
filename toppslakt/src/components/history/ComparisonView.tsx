import { motion } from 'framer-motion';
import { X, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import type { Assessment } from '../../types/assessment';
import { categories } from '../../data/factors';
import { useT } from '../../i18n/LanguageContext';
import type { TranslationKey } from '../../i18n/no';

interface ComparisonViewProps {
  a: Assessment;
  b: Assessment;
  onClose: () => void;
}

function DeltaIcon({ delta }: { delta: number }) {
  if (delta > 0) return <ArrowUp size={14} className="text-risk-high" />;
  if (delta < 0) return <ArrowDown size={14} className="text-risk-low" />;
  return <Minus size={14} className="text-kemy-gray" />;
}

const typeColors: Record<string, string> = {
  low: 'text-risk-low',
  medium: 'text-risk-medium',
  high: 'text-risk-high',
};

const catNameKeys: Record<string, TranslationKey> = {
  biological: 'cat.biological',
  'lice-operations': 'cat.lice',
  economic: 'cat.economic',
};

export default function ComparisonView({ a, b, onClose }: ComparisonViewProps) {
  const { t } = useT();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-kemy-white dark:bg-kemy-dark-surface rounded-2xl shadow-2xl border border-kemy-border dark:border-kemy-dark-border w-full max-w-lg max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-kemy-border dark:border-kemy-dark-border">
          <h3 className="font-heading text-lg font-semibold text-kemy-dark dark:text-kemy-dark-text">
            {t('comparison.title')}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-kemy-surface dark:hover:bg-kemy-dark-bg rounded-lg transition-colors"
          >
            <X size={18} className="text-kemy-gray" />
          </button>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-[1fr_80px_80px_40px] gap-2 mb-3 text-xs font-semibold text-kemy-gray dark:text-kemy-light uppercase tracking-wider">
            <span>{t('comparison.factor')}</span>
            <span className="text-center truncate">{a.locationName}</span>
            <span className="text-center truncate">{b.locationName}</span>
            <span className="text-center">&Delta;</span>
          </div>

          {categories.map((cat) => (
            <div key={cat.id} className="mb-4">
              <p className="text-xs font-semibold text-kemy-plum mb-1.5">
                {t(catNameKeys[cat.id] ?? ('cat.biological' as TranslationKey))}
              </p>
              {cat.factors.map((factor) => {
                const scoreA = a.scores[factor.id] ?? 0;
                const scoreB = b.scores[factor.id] ?? 0;
                const delta = scoreB - scoreA;
                const nameKey = `factor.${factor.id}` as TranslationKey;
                return (
                  <div
                    key={factor.id}
                    className="grid grid-cols-[1fr_80px_80px_40px] gap-2 py-1.5 border-b border-kemy-border/50 dark:border-kemy-dark-border/50 last:border-0 text-sm"
                  >
                    <span className="text-kemy-dark dark:text-kemy-dark-text truncate">
                      {t(nameKey)}
                    </span>
                    <span className="text-center font-medium">{scoreA}</span>
                    <span className="text-center font-medium">{scoreB}</span>
                    <span className="flex items-center justify-center">
                      <DeltaIcon delta={delta} />
                    </span>
                  </div>
                );
              })}
            </div>
          ))}

          <div className="grid grid-cols-[1fr_80px_80px_40px] gap-2 pt-3 border-t-2 border-kemy-border dark:border-kemy-dark-border font-semibold text-sm">
            <span className="text-kemy-dark dark:text-kemy-dark-text">{t('comparison.total')}</span>
            <span className={`text-center ${typeColors[a.recommendation.type]}`}>
              {a.totalScore}
            </span>
            <span className={`text-center ${typeColors[b.recommendation.type]}`}>
              {b.totalScore}
            </span>
            <span className="flex items-center justify-center">
              <DeltaIcon delta={b.totalScore - a.totalScore} />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
