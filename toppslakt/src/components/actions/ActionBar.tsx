import { useState } from 'react';
import { Save, RotateCcw, FileDown } from 'lucide-react';
import { useT } from '../../i18n/LanguageContext';

interface ActionBarProps {
  onSave: () => void;
  onReset: () => void;
  onExportPdf: () => void;
  canSave: boolean;
}

export default function ActionBar({ onSave, onReset, onExportPdf, canSave }: ActionBarProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { t } = useT();

  return (
    <div className="flex flex-wrap gap-2.5">
      <button
        onClick={onSave}
        disabled={!canSave}
        className="flex items-center gap-2 px-4 py-2.5 bg-kemy-dark dark:bg-kemy-dark-text text-white dark:text-kemy-dark rounded-xl text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <Save size={15} />
        {t('action.save')}
      </button>

      <button
        onClick={onExportPdf}
        className="flex items-center gap-2 px-4 py-2.5 bg-kemy-white dark:bg-kemy-dark-surface text-kemy-dark dark:text-kemy-dark-text border border-kemy-border dark:border-kemy-dark-border rounded-xl text-sm font-medium hover:bg-kemy-surface dark:hover:bg-kemy-dark-bg transition-colors"
      >
        <FileDown size={15} />
        {t('action.pdf')}
      </button>

      {!showConfirm ? (
        <button
          onClick={() => setShowConfirm(true)}
          className="flex items-center gap-2 px-4 py-2.5 text-kemy-gray dark:text-kemy-light rounded-xl text-sm hover:bg-kemy-surface dark:hover:bg-kemy-dark-surface transition-colors"
        >
          <RotateCcw size={15} />
          {t('action.reset')}
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <span className="text-sm text-risk-high font-medium">{t('action.resetConfirm')}</span>
          <button
            onClick={() => { onReset(); setShowConfirm(false); }}
            className="px-3 py-1.5 bg-risk-high text-white rounded-lg text-sm font-medium"
          >
            {t('action.yes')}
          </button>
          <button
            onClick={() => setShowConfirm(false)}
            className="px-3 py-1.5 bg-kemy-surface dark:bg-kemy-dark-surface text-kemy-gray rounded-lg text-sm"
          >
            {t('action.no')}
          </button>
        </div>
      )}
    </div>
  );
}
