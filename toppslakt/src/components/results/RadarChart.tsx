import {
  RadarChart as ReRadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import { categories } from '../../data/factors';
import { useT } from '../../i18n/LanguageContext';
import type { TranslationKey } from '../../i18n/no';

interface RadarChartProps {
  categoryScores: Record<string, number>;
  maxCategoryScore?: number;
}

const shortNameKeys: Record<string, TranslationKey> = {
  biological: 'cat.biological.short',
  'lice-operations': 'cat.lice.short',
  economic: 'cat.economic.short',
};

export default function RadarChart({ categoryScores, maxCategoryScore = 8 }: RadarChartProps) {
  const { t } = useT();

  const data = categories.map((cat) => ({
    category: t(shortNameKeys[cat.id] ?? ('cat.biological.short' as TranslationKey)),
    value: ((categoryScores[cat.id] ?? 0) / maxCategoryScore) * 100,
    fullMark: 100,
  }));

  const isDark = document.documentElement.classList.contains('dark');
  const gridColor = isDark ? '#3A3A3C' : '#E8E8ED';
  const labelColor = isDark ? '#AEAEB2' : '#86868B';

  return (
    <ResponsiveContainer width="100%" height={200}>
      <ReRadarChart data={data} cx="50%" cy="50%" outerRadius="65%">
        <PolarGrid stroke={gridColor} />
        <PolarAngleAxis dataKey="category" tick={{ fontSize: 12, fill: labelColor, fontFamily: 'Instrument Sans' }} />
        <Radar name="Score" dataKey="value" stroke="#0A84FF" fill="#0A84FF" fillOpacity={0.25} strokeWidth={2} />
      </ReRadarChart>
    </ResponsiveContainer>
  );
}
