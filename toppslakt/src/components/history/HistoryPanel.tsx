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

const badgeColor: Record<string, string> = {
  low: 'bg-risk-low',
  medium: 'bg-risk-medium',
  high: 'bg-risk-high',
};

export default function HistoryPanel({ assessments, onLoad, onDelete, onCompare }: HistoryPanelProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  function toggleSelect(id: string) {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((s) => s !== id);
      if (prev.length >= 2) return [prev[1], id];
      return [...prev, id];
    });
  }

  function handleCompare() {
    const a = assessments.find((x) => x.id === selected[0]);
    const b = assessments.find((x) => x.id === selected[1]);
    if (a && b) onCompare(a, b);
  }

  if (assessments.length === 0) return null;

  return (
    <div className="mt-6">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-full text-left py-3.5 px-4 bg-kemy-white dark:bg-kemy-dark-surface rounded-2xl border border-kemy-border dark:border-kemy-dark-border shadow-sm hover:shadow transition-shadow"
      >
        <span className="text-[15px] font-semibold text-kemy-dark dark:text-kemy-dark-text">
          Historikk
        </span>
        <span className="text-[13px] text-kemy-light dark:text-kemy-gray">
          ({assessments.length})
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="ml-auto text-kemy-light">
          <ChevronDown size={18} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-2 bg-kemy-white dark:bg-kemy-dark-surface rounded-2xl border border-kemy-border dark:border-kemy-dark-border overflow-hidden">
              {selected.length === 2 && (
                <button onClick={handleCompare} className="w-full text-sm font-medium text-kemy-plum py-2.5 border-b border-kemy-border dark:border-kemy-dark-border hover:bg-kemy-surface dark:hover:bg-kemy-dark-bg transition-colors">
                  Sammenlign valgte
                </button>
              )}
              {assessments.map((a, i) => (
                <div
                  key={a.id}
                  className={`flex items-center gap-3 px-4 py-3 ${i < assessments.length - 1 ? 'border-b border-kemy-border dark:border-kemy-dark-border' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(a.id)}
                    onChange={() => toggleSelect(a.id)}
                    className="w-[18px] h-[18px] rounded accent-kemy-plum shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-kemy-dark dark:text-kemy-dark-text truncate">{a.locationName}</p>
                    <p className="text-xs text-kemy-light dark:text-kemy-gray">{new Date(a.date).toLocaleDateString('nb-NO')}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold text-white tabular-nums shrink-0 ${badgeColor[a.recommendation.type]}`}>
                    {a.totalScore}
                  </span>
                  <button onClick={() => onLoad(a)} className="p-1.5 text-kemy-light hover:text-kemy-plum rounded-lg transition-colors" title="Last inn">
                    <RotateCw size={14} />
                  </button>
                  <button onClick={() => onDelete(a.id)} className="p-1.5 text-kemy-light hover:text-risk-high rounded-lg transition-colors" title="Slett">
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
