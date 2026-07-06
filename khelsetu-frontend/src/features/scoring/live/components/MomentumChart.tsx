import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { useMemo } from 'react';

interface MomentumPoint {
  over: number;
  winProbability: number; // 0-100
}

interface MomentumChartProps {
  data: MomentumPoint[];
  className?: string;
  height?: number;
  teamAColor?: string;
  teamBColor?: string;
}

export const MomentumChart = ({
  data,
  className,
  height = 80,
  teamAColor = 'var(--brand-primary)',
  teamBColor: _teamBColor = 'var(--brand-accent)',
}: MomentumChartProps) => {
  const svgPath = useMemo(() => {
    if (data.length === 0) return '';

    const maxOver = data.reduce((max, d) => Math.max(max, d.over), 1);
    const width = 400;
    const padding = 2;

    const points = data.map((d) => ({
      x: padding + (d.over / maxOver) * (width - padding * 2),
      y: height - (d.winProbability / 100) * height,
    }));

    if (points.length === 0) return '';

    const first = points[0];
    if (!first) return '';

    let path = `M ${first.x} ${first.y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      if (!prev || !curr) continue;
      const cp1x = (prev.x + curr.x) / 2;
      const cp1y = prev.y;
      const cp2x = (prev.x + curr.x) / 2;
      const cp2y = curr.y;
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
    }

    return path;
  }, [data, height]);

  const fillPath = useMemo(() => {
    if (!svgPath) return '';
    const lastPoint = data[data.length - 1];
    if (!lastPoint) return svgPath;
    const maxOver = data.reduce((max, d) => Math.max(max, d.over), 1);
    const width = 400;
    const padding = 2;
    const endX = padding + (lastPoint.over / maxOver) * (width - padding * 2);
    return `${svgPath} L ${endX} ${height} L ${padding} ${height} Z`;
  }, [svgPath, data, height]);

  if (data.length === 0) {
    return (
      <div
        className={twMerge(
          clsx(
            'flex items-center justify-center text-xs text-[var(--text-muted)] italic',
            className,
          ),
        )}
        style={{ height }}
      >
        No momentum data
      </div>
    );
  }

  const lastProb = data[data.length - 1]?.winProbability ?? 50;

  return (
    <div className={twMerge(clsx('relative', className))}>
      <svg
        viewBox={`0 0 400 ${height}`}
        className="w-full"
        style={{ height }}
        preserveAspectRatio="none"
        aria-label="Win probability momentum chart"
        role="img"
      >
        <defs>
          <linearGradient id="momentum-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={teamAColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={teamAColor} stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="momentum-glow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={teamAColor} stopOpacity="0" />
            <stop offset="50%" stopColor={teamAColor} stopOpacity="0.6" />
            <stop offset="100%" stopColor={teamAColor} stopOpacity="0" />
          </linearGradient>
          <filter id="momentum-blur">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* Fill area */}
        <path d={fillPath} fill="url(#momentum-fill)" />

        {/* Blurred glow line behind the main line */}
        <path
          d={svgPath}
          fill="none"
          stroke={teamAColor}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.25"
          filter="url(#momentum-blur)"
        />

        {/* Main line */}
        <path
          d={svgPath}
          fill="none"
          stroke={teamAColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Center line (50%) */}
        <line
          x1="0"
          y1={height / 2}
          x2="400"
          y2={height / 2}
          stroke="var(--border-subtle)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* Current position dot — pulsing glow */}
        {data.length > 0 &&
          (() => {
            const maxOver = data.reduce((max, d) => Math.max(max, d.over), 1);
            const padding = 2;
            const lastPt = data[data.length - 1];
            if (!lastPt) return null;
            const cx = padding + (lastPt.over / maxOver) * (400 - padding * 2);
            const cy = height - (lastPt.winProbability / 100) * height;
            return (
              <g>
                {/* Outer glow — pulses */}
                <circle
                  cx={cx}
                  cy={cy}
                  r="10"
                  fill={teamAColor}
                  opacity="0.2"
                  className="animate-pulse"
                />
                {/* Inner glow ring */}
                <circle
                  cx={cx}
                  cy={cy}
                  r="6"
                  fill="none"
                  stroke={teamAColor}
                  strokeWidth="1.5"
                  opacity="0.4"
                  className="animate-pulse"
                  style={{ animationDelay: '0.3s' }}
                />
                {/* Solid dot */}
                <circle
                  cx={cx}
                  cy={cy}
                  r="4"
                  fill={teamAColor}
                  stroke="white"
                  strokeWidth="2"
                />
              </g>
            );
          })()}
      </svg>

      {/* Labels */}
      <div className="flex justify-between text-[10px] text-[var(--text-muted)] mt-1">
        <span>{Math.round(100 - lastProb)}%</span>
        <span className="text-[var(--text-tertiary)]">Win probability</span>
        <span>{Math.round(lastProb)}%</span>
      </div>
    </div>
  );
};
