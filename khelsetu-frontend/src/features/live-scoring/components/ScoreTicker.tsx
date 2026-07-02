import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { useEffect, useRef, useState } from 'react';

export interface TickerItem {
  id: string;
  label: string;
  scoreA: string;
  scoreB: string;
  teamA: string;
  teamB: string;
  status: 'live' | 'upcoming' | 'completed';
}

interface ScoreTickerProps {
  items: TickerItem[];
  className?: string;
  speed?: number;
  renderItem?: (item: TickerItem) => React.ReactNode;
}

/** Parse "142/3" → { runs: 142, wickets: 3 } */
const parseScore = (s: string) => {
  const match = s.match(/(\d+)\/(\d+)/);
  if (!match || !match[1] || !match[2]) return null;
  return { runs: parseInt(match[1]), wickets: parseInt(match[2]) };
};

/** Increment a cricket score realistically */
const incrementScore = (s: string): string => {
  const parsed = parseScore(s);
  if (!parsed) return s;
  const { runs, wickets } = parsed;
  const rand = Math.random();
  if (rand < 0.5) return `${runs + 1}/${wickets}`;
  if (rand < 0.7) return `${runs + 2}/${wickets}`;
  if (rand < 0.85) return `${runs + 4}/${wickets}`;
  if (rand < 0.95) return `${runs + 6}/${wickets}`;
  if (wickets < 9) return `${runs}/${wickets + 1}`;
  return s;
};

const LiveDot = () => (
  <span className="relative flex h-2 w-2 shrink-0">
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
    <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
  </span>
);

const TickerItemCard = ({
  item,
  justUpdated,
}: {
  item: TickerItem;
  justUpdated: 'A' | 'B' | null;
}) => (
  <div
    className={clsx(
      'flex items-center gap-3 whitespace-nowrap px-4 py-2 rounded-lg transition-all duration-300',
      item.status === 'live' &&
        'bg-red-500/5 border border-red-500/20 shadow-[0_0_12px_-4px_rgba(239,68,68,0.2)]',
      item.status === 'completed' && 'opacity-70',
      item.status === 'upcoming' && 'opacity-60',
    )}
  >
    {item.status === 'live' && <LiveDot />}

    {item.status === 'completed' && (
      <span className="flex h-2 w-2 shrink-0 items-center justify-center">
        <span className="inline-flex h-2 w-2 rounded-full bg-green-500" />
      </span>
    )}

    {item.status === 'upcoming' && (
      <span className="flex h-2 w-2 shrink-0 items-center justify-center">
        <span className="inline-flex h-2 w-2 rounded-full bg-blue-400" />
      </span>
    )}

    <span className="rounded bg-[var(--text-muted)]/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
      {item.label}
    </span>

    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
      {item.teamA}
    </span>

    <span
      className={clsx(
        'font-mono text-sm font-bold tabular-nums text-[var(--text-primary)] dark:text-white transition-all duration-300',
        justUpdated === 'A' && 'scale-110 text-green-600 dark:text-green-400',
      )}
    >
      {item.scoreA}
    </span>

    <span className="text-[10px] font-medium text-[var(--text-muted)]">vs</span>

    <span
      className={clsx(
        'font-mono text-sm font-bold tabular-nums text-[var(--text-primary)] dark:text-white transition-all duration-300',
        justUpdated === 'B' && 'scale-110 text-green-600 dark:text-green-400',
      )}
    >
      {item.scoreB}
    </span>

    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
      {item.teamB}
    </span>
  </div>
);

export const ScoreTicker = ({
  items: initialItems,
  className,
  speed = 40,
  renderItem,
}: ScoreTickerProps) => {
  const [items, setItems] = useState(initialItems);
  const [flash, setFlash] = useState<{ id: string; side: 'A' | 'B' } | null>(
    null,
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Simulate live score updates every 4-8 seconds
  useEffect(() => {
    const tick = () => {
      setItems((prev) => {
        const liveIndices = prev
          .map((item, i) => (item.status === 'live' ? i : -1))
          .filter((i) => i !== -1);
        if (liveIndices.length === 0) return prev;

        const idx =
          liveIndices[Math.floor(Math.random() * liveIndices.length)]!;
        const item = prev[idx]!;
        const side: 'A' | 'B' = Math.random() < 0.5 ? 'A' : 'B';
        const oldScore = side === 'A' ? item.scoreA : item.scoreB;
        const newScore = incrementScore(oldScore);

        if (newScore === oldScore) return prev;

        setFlash({ id: item.id, side });
        setTimeout(() => setFlash(null), 600);

        return prev.map((it, i) =>
          i === idx
            ? {
                ...it,
                scoreA: side === 'A' ? newScore : it.scoreA,
                scoreB: side === 'B' ? newScore : it.scoreB,
              }
            : it,
        );
      });
    };

    const scheduleNext = () => {
      const delay = 4000 + Math.random() * 4000;
      intervalRef.current = setTimeout(() => {
        tick();
        scheduleNext();
      }, delay) as unknown as ReturnType<typeof setTimeout>;
    };

    scheduleNext();
    return () => {
      if (intervalRef.current)
        clearTimeout(intervalRef.current as unknown as number);
    };
  }, []);

  const duration = `${speed}s`;

  return (
    <div
      className={twMerge(
        clsx(
          'marquee relative w-full overflow-hidden',
          'border-y border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 backdrop-blur-sm',
          className,
        ),
      )}
      role="marquee"
      aria-live="off"
      aria-label="Live scores"
    >
      {/* Screen reader announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {items
          .filter((i) => i.status === 'live')
          .map((i) => `${i.teamA} ${i.scoreA} vs ${i.teamB} ${i.scoreB}`)
          .join('. ')}
      </div>

      {/* Edge fade gradients */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[var(--bg-surface)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[var(--bg-surface)] to-transparent" />

      <div className="marquee-track" style={{ animationDuration: duration }}>
        {/* Duplicate items for seamless loop */}
        {[...items, ...items].map((item, i) => (
          <div key={`${item.id}-${i}`} className="shrink-0">
            {renderItem ? (
              renderItem(item)
            ) : (
              <TickerItemCard
                item={item}
                justUpdated={flash?.id === item.id ? flash.side : null}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
