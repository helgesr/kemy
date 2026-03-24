import { useEffect, useState } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

interface GaugeChartProps {
  score: number;
  maxScore?: number;
}

export default function GaugeChart({ score, maxScore = 24 }: GaugeChartProps) {
  const cx = 120;
  const cy = 110;
  const r = 90;
  const stroke = 14;

  // Animated score
  const [display, setDisplay] = useState(0);
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 50, damping: 18 });

  useEffect(() => { mv.set(score); }, [score, mv]);
  useEffect(() => {
    const unsub = spring.on('change', (v) => setDisplay(Math.round(v)));
    return unsub;
  }, [spring]);

  // Arc math
  const ratio = Math.min(score / maxScore, 1);
  const startAngle = 150;   // 7 o'clock
  const sweep = 240;        // 240° arc (from 7 o'clock to 5 o'clock)
  const endAngle = startAngle + sweep;

  const toRad = (d: number) => (d * Math.PI) / 180;
  const px = (a: number) => cx + r * Math.cos(toRad(a));
  const py = (a: number) => cy + r * Math.sin(toRad(a));

  const arc = (from: number, to: number) => {
    const large = to - from > 180 ? 1 : 0;
    return `M ${px(from)} ${py(from)} A ${r} ${r} 0 ${large} 1 ${px(to)} ${py(to)}`;
  };

  const bgPath = arc(startAngle, endAngle);
  const fillAngle = startAngle + ratio * sweep;
  const fillPath = ratio > 0.01 ? arc(startAngle, fillAngle) : '';

  // Color based on score
  const color = score <= 8 ? '#30D158' : score <= 16 ? '#FF9F0A' : '#FF453A';
  const label = score <= 8 ? 'Lav' : score <= 16 ? 'Moderat' : 'Høy';

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 240 170" className="w-full max-w-[280px]">
        {/* Background arc */}
        <path
          d={bgPath}
          fill="none"
          stroke="#E8E8ED"
          strokeWidth={stroke}
          strokeLinecap="round"
          className="dark:stroke-[#2C2C2E]"
        />

        {/* Filled arc */}
        {fillPath && (
          <path
            d={fillPath}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            style={{
              filter: `drop-shadow(0 0 6px ${color}40)`,
              transition: 'stroke 0.4s, filter 0.4s',
            }}
          />
        )}

        {/* Score text in center */}
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          className="fill-kemy-dark dark:fill-kemy-dark-text"
          style={{ fontSize: '44px', fontWeight: 700, fontFamily: 'Instrument Sans, system-ui' }}
        >
          {display}
        </text>
        <text
          x={cx}
          y={cy + 16}
          textAnchor="middle"
          className="fill-kemy-gray dark:fill-kemy-light"
          style={{ fontSize: '13px', fontWeight: 500 }}
        >
          av {maxScore}
        </text>
      </svg>

      {/* Risk label pill */}
      <div
        className="mt-1 px-3 py-1 rounded-full text-[12px] font-semibold text-white"
        style={{
          background: color,
          transition: 'background 0.4s',
        }}
      >
        {label} risiko
      </div>
    </div>
  );
}
