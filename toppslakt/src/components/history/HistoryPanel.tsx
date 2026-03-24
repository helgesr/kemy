import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Trash2, RotateCw } from 'lucide-react';
import type { Assessment } from '../../types/assessment';

interface HistoryPanelProps {
  assessments: Assessment[];
  onLoad: (assessment: Assessment) => void;
  onDelete: (id: string) => void;
  onCompare: (a: Assessment, b: Assessment) => void;
}

const typeColors: Record<string, string> = {
  low: 'bg-risk-low text-white',
  medium: 'bg-risk-medium text-white',
  high: 'bg-risk-high text-white',
};

export default function HistoryPanel({
  assessments,
  onLoad,
  onDelete,
  onCompare,
}: HistoryPanelProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  function toggleSelect(id: string) {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((s) => s !== id);
      if (prev.length >= 2) return [prev[1], id];
      return [...prev, id];
    });
  }

  const canCompare = selected.length === 2;

  function handleCompare() {
    if (!canCompare) return;
    const a = assessments.find((x) => x.id === selected[0]);
    const b = assessments.find((x) => x.id === selected[1]);
    if (a && b) onCompare(a, b);
  }

  if (assessments.length === 0) return null;

  return (
    <div className="mt-8">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-full text-left py-3 px-4 bg-kemy-white dark:bg-kemy-dark-surface rounded-xl border border-kemy-border dark:border-kemy-dark-border hover:bg-kemy-surface dark:hover:bg-kemy-dark-bg transition-colors"
      >
        <span className="font-heading text-lg font-semibold text-kemy-dark dark:text-kemy-dark-text">
          Historikk
        </span>
        <span className="text-sm text-kemy-gray dark:text-kemy-light ml-1">
          ({assessments.length} lagrede vurderinger)
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-auto text-kemy-gray"
        >
          <ChevronDown size={20} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-2 space-y-2">
              {canCompare && (
                <button
                  onClick={handleCompare}
                  className="text-sm font-medium text-kemy-plum hover:text-kemy-dark dark:hover:text-kemy-dark-text transition-colors mb-2"
                >
                  Sammenlign valgte ({selected.length}/2)
                </button>
              )}

              {assessments.map((assessment) => (
                <div
                  key={assessment.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                    selected.includes(assessment.id)
                      ? 'border-kemy-plum bg-kemy-plum/5 dark:bg-kemy-plum/10'
                      : 'border-kemy-border dark:border-kemy-dark-border bg-kemy-white dark:bg-kemy-dark-surface'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(assessment.id)}
                    onChange={() => toggleSelect(assessment.id)}
                    className="w-4 h-4 rounded accent-kemy-plum shrink-0"
                    aria-label={`Velg ${assessment.locationName}`}
                  />

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-kemy-dark dark:text-kemy-dark-text truncate">
                      {assessment.locationName}
                    </p>
                    <p className="text-xs text-kemy-gray dark:text-kemy-light">
                      {new Date(assessment.date).toLocaleDateString('nb-NO')}
                    </p>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold shrink-0 ${
                      typeColors[assessment.recommendation.type]
                    }`}
                  >
                    {assessment.totalScore}/24
                  </span>

                  <button
                    onClick={() => onLoad(assessment)}
                    className="p-1.5 text-kemy-plum hover:bg-kemy-surface dark:hover:bg-kemy-dark-bg rounded-lg transition-colors shrink-0"
                    title="Last inn"
                  >
                    <RotateCw size={14} />
                  </button>

                  <button
                    onClick={() => onDelete(assessment.id)}
                    className="p-1.5 text-kemy-gray hover:text-risk-high hover:bg-risk-high-bg rounded-lg transition-colors shrink-0"
                    title="Slett"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
