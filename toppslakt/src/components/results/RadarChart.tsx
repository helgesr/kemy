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

export default function RadarChart({
  categoryScores,
  maxCategoryScore = 8,
}: RadarChartProps) {
  const data = categories.map((cat) => ({
    category: cat.name,
    value: ((categoryScores[cat.id] ?? 0) / maxCategoryScore) * 100,
    fullMark: 100,
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <ReRadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
        <PolarGrid stroke="#E5E5EA" />
        <PolarAngleAxis
          dataKey="category"
          tick={{
            fontSize: 11,
            fill: '#56585C',
          }}
          className="dark:fill-kemy-dark-text"
        />
        <Radar
          name="Score"
          dataKey="value"
          stroke="#605C75"
          fill="#605C75"
          fillOpacity={0.3}
        />
      </ReRadarChart>
    </ResponsiveContainer>
  );
}
