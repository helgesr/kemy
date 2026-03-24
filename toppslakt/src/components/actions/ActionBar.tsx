import { useState } from 'react';
import { Save, RotateCcw, FileDown } from 'lucide-react';

interface ActionBarProps {
  onSave: () => void;
  onReset: () => void;
  onExportPdf: () => void;
  canSave: boolean;
}

export default function ActionBar({ onSave, onReset, onExportPdf, canSave }: ActionBarProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={onSave}
        disabled={!canSave}
        className="flex items-center gap-2 px-5 py-2.5 bg-kemy-dark text-kemy-white rounded-lg font-medium text-sm hover:bg-kemy-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed dark:bg-kemy-plum dark:hover:bg-kemy-gray"
      >
        <Save size={16} />
        Lagre vurdering
      </button>

      <button
        onClick={onExportPdf}
        className="flex items-center gap-2 px-5 py-2.5 bg-kemy-white text-kemy-dark border border-kemy-border rounded-lg font-medium text-sm hover:bg-kemy-surface transition-colors dark:bg-kemy-dark-surface dark:text-kemy-dark-text dark:border-kemy-dark-border dark:hover:bg-kemy-dark-bg"
      >
        <FileDown size={16} />
        Eksporter PDF
      </button>

      {!showConfirm ? (
        <button
          onClick={() => setShowConfirm(true)}
          className="flex items-center gap-2 px-5 py-2.5 text-kemy-gray rounded-lg font-medium text-sm hover:bg-risk-high-bg hover:text-risk-high transition-colors dark:text-kemy-light dark:hover:bg-risk-high/10"
        >
          <RotateCcw size={16} />
          Nullstill
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <span className="text-sm text-risk-high font-medium">Nullstille alle scores?</span>
          <button
            onClick={() => {
              onReset();
              setShowConfirm(false);
            }}
            className="px-3 py-1.5 bg-risk-high text-white rounded-lg text-sm font-medium hover:bg-risk-high/90 transition-colors"
          >
            Ja
          </button>
          <button
            onClick={() => setShowConfirm(false)}
            className="px-3 py-1.5 bg-kemy-surface text-kemy-gray rounded-lg text-sm font-medium hover:bg-kemy-border transition-colors dark:bg-kemy-dark-surface dark:text-kemy-dark-text"
          >
            Avbryt
          </button>
        </div>
      )}
    </div>
  );
}
