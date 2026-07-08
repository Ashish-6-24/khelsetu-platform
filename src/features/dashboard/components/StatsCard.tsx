import { useReducedMotion } from '@features/accessibility';
import { Card, CardBody } from '@shared/ui/Card';
import { clsx } from 'clsx';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

import { memo, useEffect, useRef, useState } from 'react';

interface StatsCardProps {
  readonly title: string;
  readonly value: string | number;
  readonly change?: { value: number; isPositive: boolean };
  readonly icon?: React.ReactNode;
  readonly iconBg?: string;
  readonly iconColor?: string;
  readonly accent?: 'blue' | 'green' | 'amber' | 'red' | 'violet' | 'rose';
  readonly delay?: number;
}

const accentMap: Record<NonNullable<StatsCardProps['accent']>, string> = {
  blue: 'from-[#7f1d1d] to-[#991b1b] dark:from-[#6b1515] dark:to-[#8b1c1c] shadow-[var(--brand-primary)]/25',
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
  const isNumeric = typeof value === 'number' || !Number.isNaN(Number(value));
  const n = typeof value === 'number' ? value : Number.parseFloat(value) || 0;
  const [display, setDisplay] = useState(reducedMotion ? n : 0);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    if (!isNumeric || reducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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

export const StatsCard = memo(
  ({
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
          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-[var(--brand-primary)]/0 to-[var(--brand-accent)]/0 transition-all duration-500 group-hover:from-[var(--brand-primary)]/5 group-hover:to-[var(--brand-accent)]/10" />
          <CardBody>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-[var(--text-tertiary)]">
                  {title}
                </p>
                <p className="mt-2 text-3xl font-bold tabular-nums tracking-tight text-[var(--text-primary)]">
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
                    <span className="font-normal text-[var(--text-tertiary)]">
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
  },
);
