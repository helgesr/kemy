import {
  RadarChart as ReRadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import { categories } from '../../data/factors';

interface RadarChartProps {
  categoryScores: Record<string, number>;
  maxCategoryScore?: number;
}

const shortNames: Record<string, string> = {
  biological: 'Biologisk',
  'lice-operations': 'Luse/drift',
  economic: 'Økonomisk',
};

export default function RadarChart({ categoryScores, maxCategoryScore = 8 }: RadarChartProps) {
  const data = categories.map((cat) => ({
    category: shortNames[cat.id] ?? cat.name,
    value: ((categoryScores[cat.id] ?? 0) / maxCategoryScore) * 100,
    fullMark: 100,
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <ReRadarChart data={data} cx="50%" cy="50%" outerRadius="65%">
        <PolarGrid stroke="#E8E8ED" />
        <PolarAngleAxis dataKey="category" tick={{ fontSize: 12, fill: '#86868B', fontFamily: 'Instrument Sans' }} />
        <Radar name="Score" dataKey="value" stroke="#555566" fill="#555566" fillOpacity={0.15} />
      </ReRadarChart>
    </ResponsiveContainer>
  );
}
