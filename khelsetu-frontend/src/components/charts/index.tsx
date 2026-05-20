import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface BarChartProps {
  data: { label: string; value: number; color?: string }[];
  height?: number;
  className?: string;
}

export const BarChart = ({ data, height = 200, className }: BarChartProps) => {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className={clsx('flex items-end gap-2', className)} style={{ height }}>
      {data.map((item, idx) => (
        <motion.div
          key={idx}
          className="flex-1 flex flex-col items-center gap-1"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: idx * 0.05, duration: 0.3 }}
        >
          <motion.div
            className={clsx('w-full rounded-t-lg', item.color || 'bg-blue-600')}
            style={{ height: `${(item.value / maxValue) * 100}%` }}
          />
          <span className="text-xs text-gray-500 dark:text-gray-400 truncate w-full text-center">
            {item.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

interface LineChartProps {
  data: { label: string; value: number }[];
  height?: number;
  className?: string;
}

export const LineChart = ({
  data,
  height = 200,
  className,
}: LineChartProps) => {
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const points = data.map((d, idx) => ({
    x: (idx / (data.length - 1)) * 100,
    y: 100 - (d.value / maxValue) * 100,
  }));

  const pathD = points
    .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');

  return (
    <div className={clsx('relative', className)} style={{ height }}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <path
          d={pathD}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        {points.map((p, idx) => (
          <circle key={idx} cx={p.x} cy={p.y} r="1.5" fill="#3b82f6" />
        ))}
      </svg>
      <div className="absolute bottom-0 left-0 right-0 flex justify-between">
        {data.map((d, idx) => (
          <span key={idx} className="text-xs text-gray-500 dark:text-gray-400">
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
};

interface DonutChartProps {
  data: { label: string; value: number; color: string }[];
  size?: number;
  className?: string;
}

export const DonutChart = ({
  data,
  size = 120,
  className,
}: DonutChartProps) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const segments = data.reduce<
    { percentage: number; offset: number; color: string }[]
  >((acc, d) => {
    const percentage = (d.value / total) * 100;
    const offset = 100 - acc.reduce((sum, s) => sum + s.percentage, 0);
    acc.push({ percentage, offset, color: d.color });
    return acc;
  }, []);

  return (
    <div
      className={clsx('relative', className)}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 36 36" className="w-full h-full">
        {segments.map((s, idx) => (
          <circle
            key={idx}
            cx="18"
            cy="18"
            r="15.915"
            fill="none"
            stroke={s.color}
            strokeWidth="3"
            strokeDasharray={`${s.percentage} ${100 - s.percentage}`}
            strokeDashoffset={s.offset}
            className="transition-all duration-500"
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold text-gray-900 dark:text-white">
          {total}
        </span>
      </div>
    </div>
  );
};

interface SparklineProps {
  data: number[];
  color?: string;
  className?: string;
}

export const Sparkline = ({
  data,
  color = '#3b82f6',
  className,
}: SparklineProps) => {
  const max = Math.max(...data, 1);
  const points = data
    .map(
      (d, idx) => `${(idx / (data.length - 1)) * 100},${100 - (d / max) * 100}`,
    )
    .join(' ');

  return (
    <svg
      viewBox="0 0 100 100"
      className={clsx('w-full h-8', className)}
      preserveAspectRatio="none"
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="3"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};
