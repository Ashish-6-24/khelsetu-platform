import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { useMemo } from 'react';

interface BallEvent {
  runs?: number;
  wicket?: boolean;
  extra?: 'wide' | 'no-ball' | 'byes' | 'leg-byes';
  over: number;
  ball: number;
}

interface BallTimelineProps {
  events: BallEvent[];
  maxBalls?: number;
  className?: string;
}

const ballColor = (event: BallEvent): string => {
  if (event.wicket) return 'bg-red-500';
  if (event.extra === 'wide' || event.extra === 'no-ball')
    return 'bg-yellow-500';
  if (event.extra === 'byes' || event.extra === 'leg-byes')
    return 'bg-blue-400';
  if (event.runs === undefined) return 'bg-gray-400';
  if (event.runs === 0) return 'bg-gray-400';
  if (event.runs === 4) return 'bg-blue-600';
  if (event.runs === 6) return 'bg-purple-600';
  if (event.runs >= 1 && event.runs <= 3) return 'bg-green-500';
  return 'bg-gray-400';
};

const ballLabel = (event: BallEvent): string => {
  if (event.wicket) return 'W';
  if (event.extra === 'wide') return 'WD';
  if (event.extra === 'no-ball') return 'NB';
  if (event.extra === 'byes') return 'B';
  if (event.extra === 'leg-byes') return 'LB';
  if (event.runs === undefined) return '-';
  return String(event.runs);
};

export const BallTimeline = ({
  events,
  maxBalls = 30,
  className,
}: BallTimelineProps) => {
  const visibleEvents = useMemo(
    () => events.slice(-maxBalls),
    [events, maxBalls],
  );

  return (
    <div
      className={twMerge(clsx('flex items-center gap-1 flex-wrap', className))}
      role="list"
      aria-label="Ball-by-ball timeline"
    >
      {visibleEvents.length === 0 && (
        <span className="text-xs text-[var(--text-muted)] italic">
          No balls bowled yet
        </span>
      )}

      {visibleEvents.map((event, i) => {
        const color = ballColor(event);
        const label = ballLabel(event);

        return (
          <div
            key={`${event.over}-${event.ball}-${i}`}
            className={twMerge(
              clsx(
                'relative group flex items-center justify-center',
                'h-6 w-6 rounded-full text-[10px] font-bold text-white',
                'transition-transform duration-200 hover:scale-125',
                color,
                'ball-enter',
              ),
            )}
            style={{ animationDelay: `${i * 30}ms` }}
            role="listitem"
            title={`Over ${event.over + 1}, Ball ${event.ball + 1}: ${label}`}
          >
            {label}

            {/* Tooltip */}
            <div
              className={clsx(
                'absolute -top-8 left-1/2 -translate-x-1/2',
                'px-2 py-1 rounded text-[10px] font-medium whitespace-nowrap',
                'bg-gray-900 text-white',
                'opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none',
                'z-10',
              )}
            >
              {`Ov ${event.over + 1}.${event.ball + 1} — ${label}`}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const BallLegend = ({ className }: { className?: string }) => (
  <div
    className={twMerge(
      clsx(
        'flex items-center gap-3 text-[10px] text-[var(--text-muted)]',
        className,
      ),
    )}
  >
    <span className="inline-flex items-center gap-1">
      <span className="h-2.5 w-2.5 rounded-full bg-gray-400" /> dot
    </span>
    <span className="inline-flex items-center gap-1">
      <span className="h-2.5 w-2.5 rounded-full bg-green-500" /> 1-3
    </span>
    <span className="inline-flex items-center gap-1">
      <span className="h-2.5 w-2.5 rounded-full bg-blue-600" /> 4
    </span>
    <span className="inline-flex items-center gap-1">
      <span className="h-2.5 w-2.5 rounded-full bg-purple-600" /> 6
    </span>
    <span className="inline-flex items-center gap-1">
      <span className="h-2.5 w-2.5 rounded-full bg-red-500" /> W
    </span>
    <span className="inline-flex items-center gap-1">
      <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" /> WD/NB
    </span>
  </div>
);
