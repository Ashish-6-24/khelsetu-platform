import { clsx } from 'clsx';
import { type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

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
  renderItem?: (item: TickerItem) => ReactNode;
}

const statusDot = {
  live: 'bg-red-500',
  upcoming: 'bg-blue-500',
  completed: 'bg-green-500',
} as const;

const DefaultItem = ({ item }: { item: TickerItem }) => (
  <div
    className={clsx(
      'flex items-center gap-3 whitespace-nowrap px-5 rounded-sm',
      item.status === 'live' && 'bg-red-500/5 border-l-2 border-red-500',
    )}
  >
    <span
      className={clsx(
        'h-1.5 w-1.5 rounded-full shrink-0',
        statusDot[item.status],
        item.status === 'live' && 'animate-pulse',
      )}
    />
    <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
      {item.teamA}
    </span>
    <span className="text-sm font-semibold text-[var(--text-primary)] tabular-nums">
      {item.scoreA}
    </span>
    <span className="text-[10px] text-[var(--text-muted)]">vs</span>
    <span className="text-sm font-semibold text-[var(--text-primary)] tabular-nums">
      {item.scoreB}
    </span>
    <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
      {item.teamB}
    </span>
  </div>
);

export const ScoreTicker = ({
  items,
  className,
  speed = 40,
  renderItem,
}: ScoreTickerProps) => {
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
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--bg-surface)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--bg-surface)] to-transparent" />

      <div
        className="marquee-track"
        style={{ animationDuration: duration }}
      >
        {/* Duplicate items for seamless loop */}
        {items.map((item) =>
          renderItem ? (
            <div key={item.id} className="shrink-0">
              {renderItem(item)}
            </div>
          ) : (
            <div key={item.id} className="shrink-0">
              <DefaultItem item={item} />
            </div>
          ),
        )}
        {items.map((item) =>
          renderItem ? (
            <div key={`dup-${item.id}`} className="shrink-0">
              {renderItem(item)}
            </div>
          ) : (
            <div key={`dup-${item.id}`} className="shrink-0">
              <DefaultItem item={item} />
            </div>
          ),
        )}
      </div>
    </div>
  );
};
