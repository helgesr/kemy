import type { Factor } from '../../types/assessment';
import ScoreSelector from './ScoreSelector';
import TooltipPopover from './TooltipPopover';

interface FactorRowProps {
  factor: Factor;
  value: number;
  onChange: (value: number) => void;
}

export default function FactorRow({ factor, value, onChange }: FactorRowProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 px-4 py-3.5 border-b border-kemy-border dark:border-kemy-dark-border last:border-0">
      <div className="flex items-center gap-1">
        <span className="text-sm text-kemy-dark dark:text-kemy-dark-text">
          {factor.name}
        </span>
        {factor.tooltip && <TooltipPopover text={factor.tooltip} />}
      </div>
      <div className="shrink-0">
        <ScoreSelector value={value} onChange={onChange} layoutId={`score-${factor.id}`} />
      </div>
    </div>
  );
}
