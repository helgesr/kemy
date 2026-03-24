import { useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
} from 'framer-motion';

interface GaugeChartProps {
  score: number;
  maxScore?: number;
}

/**
 * Half-circle SVG gauge that visualises total risk score.
 *
 * Arc spans 180 ° (left to right).  A gradient runs from green through amber
 * to red and a needle animates to the current position.
 */
export default function GaugeChart({ score, maxScore = 24 }: GaugeChartProps) {
  const cx = 100;
  const cy = 100;
  const r = 80;
  const strokeWidth = 12;

  // --- Animated score counter ---------------------------------------------------
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

  // --- Needle angle (180° = left→right, 0 = far-left = low score) -------------
  const ratio = Math.min(score / maxScore, 1);
  const needleAngle = -90 + ratio * 180; // -90 = 9 o'clock, +90 = 3 o'clock

  const springAngle = useSpring(useMotionValue(needleAngle), {
    stiffness: 50,
    damping: 14,
  });

  useEffect(() => {
    springAngle.set(needleAngle);
  }, [needleAngle, springAngle]);

  // --- SVG arc path helper ----------------------------------------------------
  const describeArc = (startAngle: number, endAngle: number): string => {
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const x1 = cx + r * Math.cos(toRad(startAngle));
    const y1 = cy + r * Math.sin(toRad(startAngle));
    const x2 = cx + r * Math.cos(toRad(endAngle));
    const y2 = cy + r * Math.sin(toRad(endAngle));
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  const arcPath = describeArc(180, 360); // full 180° half-circle

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 120" className="w-full max-w-[260px]">
        <defs>
          {/* Left-to-right gradient: green → amber → red */}
          <linearGradient id="gaugeGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2D8B4E" />
            <stop offset="50%" stopColor="#D4890A" />
            <stop offset="100%" stopColor="#C03030" />
          </linearGradient>
        </defs>

        {/* Background arc (light gray) */}
        <path
          d={arcPath}
          fill="none"
          stroke="#E5E5EA"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="dark:stroke-kemy-dark-border"
        />

        {/* Colored arc (gradient) */}
        <path
          d={arcPath}
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Animated needle */}
        <motion.g
          style={{ rotate: springAngle, transformOrigin: `${cx}px ${cy}px` }}
        >
          <line
            x1={cx}
            y1={cy}
            x2={cx}
            y2={cy - r + strokeWidth + 4}
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            className="text-kemy-dark dark:text-kemy-dark-text"
          />
        </motion.g>

        {/* Pivot circle */}
        <circle
          cx={cx}
          cy={cy}
          r={5}
          className="fill-kemy-dark dark:fill-kemy-dark-text"
        />
      </svg>

      {/* Score readout – sits just below the arc */}
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
