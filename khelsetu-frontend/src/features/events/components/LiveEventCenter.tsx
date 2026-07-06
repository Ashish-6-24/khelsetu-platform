import { Badge } from '@shared/ui/Badge';
import { clsx } from 'clsx';

import { useCallback, useState } from 'react';

import { useMatchTimer } from '../hooks/useMatchTimer';
import type {
  LiveEventType,
  LiveMatchEvent,
  SportType,
  TeamInfo,
} from '../types';
import { createLiveMatchEvent } from '../utils/eventCreators';
import { EventInputPanel } from './EventInputPanel';
import { LiveTimeline } from './LiveTimeline';
import { MatchControls } from './MatchControls';

interface LiveEventCenterProps {
  matchId: string;
  sport: SportType;
  teamA: TeamInfo;
  teamB: TeamInfo;
}

export const LiveEventCenter = ({
  matchId,
  sport,
  teamA,
  teamB,
}: LiveEventCenterProps) => {
  const timer = useMatchTimer();
  const [events, setEvents] = useState<LiveMatchEvent[]>([]);
  const [activeTeam, setActiveTeam] = useState<'teamA' | 'teamB'>('teamA');

  const selectedTeam = activeTeam === 'teamA' ? teamA : teamB;

  const handleEventSelect = useCallback(
    (type: LiveEventType) => {
      const newEvent = createLiveMatchEvent(
        matchId,
        sport,
        timer.currentMinute,
        type,
        selectedTeam.id,
        selectedTeam.name,
        {
          extraMinute: timer.currentSecond > 0 ? undefined : undefined,
          period: timer.phase,
        },
      );
      setEvents((prev) => [...prev, newEvent]);
    },
    [
      matchId,
      sport,
      timer.currentMinute,
      timer.currentSecond,
      timer.phase,
      selectedTeam,
    ],
  );

  const isMatchActive =
    timer.phase !== 'not_started' && timer.phase !== 'completed';

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-3 flex-1">
          <button
            onClick={() => setActiveTeam('teamA')}
            aria-pressed={activeTeam === 'teamA'}
            className={clsx(
              'px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200',
              activeTeam === 'teamA'
                ? 'bg-gradient-to-r from-[var(--brand-primary-bg)] to-[var(--brand-primary-bg-hover)] text-white shadow-md'
                : 'bg-[var(--bg-surface)]/60 dark:bg-[var(--bg-surface)]/60 text-[var(--text-primary)] dark:text-[var(--text-secondary)] border border-[var(--border-subtle)] dark:border-[var(--border-subtle)] hover:bg-[var(--bg-surface)] dark:hover:bg-[var(--bg-surface-raised)]',
            )}
          >
            {teamA.name}
          </button>

          <span className="text-xs font-bold text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
            VS
          </span>

          <button
            onClick={() => setActiveTeam('teamB')}
            aria-pressed={activeTeam === 'teamB'}
            className={clsx(
              'px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200',
              activeTeam === 'teamB'
                ? 'bg-gradient-to-r from-[var(--brand-primary-bg)] to-[var(--brand-primary-bg-hover)] text-white shadow-md'
                : 'bg-[var(--bg-surface)]/60 dark:bg-[var(--bg-surface)]/60 text-[var(--text-primary)] dark:text-[var(--text-secondary)] border border-[var(--border-subtle)] dark:border-[var(--border-subtle)] hover:bg-[var(--bg-surface)] dark:hover:bg-[var(--bg-surface-raised)]',
            )}
          >
            {teamB.name}
          </button>
        </div>

        {timer.isRunning && (
          <Badge variant="live" size="md">
            LIVE
          </Badge>
        )}
      </div>

      <MatchControls timer={timer} />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2">
          <EventInputPanel
            sport={sport}
            onEventSelect={handleEventSelect}
            disabled={!isMatchActive}
          />
        </div>
        <div className="lg:col-span-3">
          <LiveTimeline events={events} sport={sport} />
        </div>
      </div>
    </div>
  );
};
