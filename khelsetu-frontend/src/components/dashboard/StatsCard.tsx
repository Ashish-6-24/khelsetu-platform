import { Card, CardBody } from '@components/ui/Card';
import { useReducedMotion } from '@features/accessibility';
import { clsx } from 'clsx';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

import { useEffect, useRef, useState } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: { value: number; isPositive: boolean };
  icon?: React.ReactNode;
  iconBg?: string;
  iconColor?: string;
  accent?: 'blue' | 'green' | 'amber' | 'red' | 'violet' | 'rose';
  delay?: number;
}

const accentMap: Record<NonNullable<StatsCardProps['accent']>, string> = {
  blue: 'from-[#7F1D1D] to-[#991B1B] shadow-[#7F1D1D]/25',
  green: 'from-emerald-500 to-teal-600 shadow-emerald-500/25',
  amber: 'from-amber-500 to-orange-600 shadow-amber-500/25',
  red: 'from-red-500 to-rose-600 shadow-red-500/25',
  violet: 'from-violet-500 to-purple-600 shadow-violet-500/25',
  rose: 'from-rose-500 to-pink-600 shadow-rose-500/25',
};

/**
 * AnimatedNumber — pure CSS/requestAnimationFrame count-up.
 * No framer-motion dependency.
 */
function AnimatedNumber({
  value,
  reducedMotion,
}: {
  value: number | string;
  reducedMotion: boolean;
}) {
  const isNumeric = typeof value === 'number' || !isNaN(Number(value));
  const n = typeof value === 'number' ? value : parseFloat(value) || 0;
  const [display, setDisplay] = useState(reducedMotion ? n : 0);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    if (!isNumeric || reducedMotion) {
      setDisplay(n);
      return;
    }

    const start = display;
    const end = n;
    const duration = 600;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + (end - start) * eased));
      if (progress < 1) {
        ref.current = requestAnimationFrame(animate);
      }
    };

    ref.current = requestAnimationFrame(animate);
    return () => {
      if (ref.current) cancelAnimationFrame(ref.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n, reducedMotion, isNumeric]);

  if (!isNumeric) {
    return <span>{value}</span>;
  }

  return <span>{display.toLocaleString()}</span>;
}

export const StatsCard = ({
  title,
  value,
  change,
  icon,
  iconBg,
  iconColor,
  accent = 'blue',
  delay = 0,
}: StatsCardProps) => {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="animate-fade-in-up"
      style={{ animationDelay: `${delay}s`, animationFillMode: 'both' }}
    >
      <Card hover elevated className="group relative overflow-hidden">
        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-[#7F1D1D]/0 to-[#B8860B]/0 transition-all duration-500 group-hover:from-[#7F1D1D]/5 group-hover:to-[#B8860B]/10" />
        <CardBody>
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {title}
              </p>
              <p className="mt-2 text-3xl font-bold tabular-nums tracking-tight text-slate-900 dark:text-white">
                <AnimatedNumber value={value} reducedMotion={reducedMotion} />
              </p>
              {change && (
                <div
                  className={clsx(
                    'mt-2.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold',
                    change.isPositive
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                      : 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400',
                  )}
                >
                  {change.isPositive ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {change.value}%
                  <span className="font-normal text-slate-500 dark:text-slate-400">
                    vs last week
                  </span>
                </div>
              )}
            </div>
            {icon && (
              <div
                className={clsx(
                  'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3',
                  iconBg ?? `bg-gradient-to-br ${accentMap[accent]}`,
                  iconColor,
                )}
              >
                {icon}
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
