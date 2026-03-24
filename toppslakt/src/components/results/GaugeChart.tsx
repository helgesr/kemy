import { useEffect, useState } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

interface GaugeChartProps {
  score: number;
  maxScore?: number;
}

export default function GaugeChart({ score, maxScore = 24 }: GaugeChartProps) {
  const cx = 100;
  const cy = 100;
  const r = 80;
  const strokeWidth = 12;
  const needleLen = r - strokeWidth - 2;

  // Animated score counter
  const [displayScore, setDisplayScore] = useState(0);
  const motionScore = useMotionValue(0);
  const springScore = useSpring(motionScore, { stiffness: 60, damping: 20 });

  useEffect(() => {
    motionScore.set(score);
  }, [score, motionScore]);

  useEffect(() => {
    const unsubscribe = springScore.on('change', (v) => {
      setDisplayScore(Math.round(v));
    });
    return unsubscribe;
  }, [springScore]);

  // Animated needle angle (radians)
  const ratio = Math.min(score / maxScore, 1);
  const targetAngleRad = Math.PI + ratio * Math.PI; // π (left) → 2π (right)

  const motionAngle = useMotionValue(Math.PI);
  const springAngle = useSpring(motionAngle, { stiffness: 50, damping: 14 });
  const [needleEnd, setNeedleEnd] = useState({ x: cx - needleLen, y: cy });

  useEffect(() => {
    motionAngle.set(targetAngleRad);
  }, [targetAngleRad, motionAngle]);

  useEffect(() => {
    const unsubscribe = springAngle.on('change', (angle) => {
      setNeedleEnd({
        x: cx + needleLen * Math.cos(angle),
        y: cy + needleLen * Math.sin(angle),
      });
    });
    return unsubscribe;
  }, [springAngle, cx, cy, needleLen]);

  // SVG arc path
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const describeArc = (startDeg: number, endDeg: number): string => {
    const x1 = cx + r * Math.cos(toRad(startDeg));
    const y1 = cy + r * Math.sin(toRad(startDeg));
    const x2 = cx + r * Math.cos(toRad(endDeg));
    const y2 = cy + r * Math.sin(toRad(endDeg));
    const largeArc = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  const arcPath = describeArc(180, 360);

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 120" className="w-full max-w-[260px]">
        <defs>
          <linearGradient id="gaugeGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2D8B4E" />
            <stop offset="50%" stopColor="#D4890A" />
            <stop offset="100%" stopColor="#C03030" />
          </linearGradient>
        </defs>

        {/* Background arc */}
        <path
          d={arcPath}
          fill="none"
          stroke="#E5E5EA"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="dark:stroke-[#2E303A]"
        />

        {/* Colored arc */}
        <path
          d={arcPath}
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Needle - calculated position, no CSS transforms */}
        <line
          x1={cx}
          y1={cy}
          x2={needleEnd.x}
          y2={needleEnd.y}
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          className="text-kemy-dark dark:text-kemy-light"
        />

        {/* Pivot dot */}
        <circle cx={cx} cy={cy} r={5} className="fill-kemy-dark dark:fill-kemy-light" />
      </svg>

      {/* Score readout */}
      <div className="-mt-4 flex items-baseline gap-0.5 select-none">
        <span className="font-heading text-4xl font-bold tabular-nums text-kemy-dark dark:text-kemy-white">
          {displayScore}
        </span>
        <span className="text-lg text-kemy-gray dark:text-kemy-dark-text">
          / {maxScore}
        </span>
      </div>
    </div>
  );
}
