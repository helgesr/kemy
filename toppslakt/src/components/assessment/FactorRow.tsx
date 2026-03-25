import type { Factor } from '../../types/assessment';
import { useT } from '../../i18n/LanguageContext';
import type { TranslationKey } from '../../i18n/no';
import ScoreSelector from './ScoreSelector';
import TooltipPopover from './TooltipPopover';

interface FactorRowProps {
  factor: Factor;
  value: number;
  onChange: (value: number) => void;
}

export default function FactorRow({ factor, value, onChange }: FactorRowProps) {
  const { t } = useT();

  const nameKey = `factor.${factor.id}` as TranslationKey;
  const tipKey = `factor.${factor.id}.tip` as TranslationKey;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 px-4 py-3.5 border-b border-kemy-border dark:border-kemy-dark-border last:border-0">
      <div className="flex items-center gap-1">
        <span className="text-sm text-kemy-dark dark:text-kemy-dark-text">
          {t(nameKey)}
        </span>
        {factor.tooltip && <TooltipPopover text={t(tipKey)} />}
      </div>
      <div className="shrink-0">
        <ScoreSelector value={value} onChange={onChange} layoutId={`score-${factor.id}`} />
      </div>
    </div>
  );
}
