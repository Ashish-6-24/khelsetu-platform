import { Badge } from '@components/ui/Badge';
import { clsx } from 'clsx';

import { useMatchTimer } from '../hooks/useMatchTimer';
import type { LiveMatchEvent, LiveEventType, SportType, TeamInfo } from '../types';
import { createLiveMatchEvent } from '../utils/eventCreators';
import { EventInputPanel } from './EventInputPanel';
import { LiveTimeline } from './LiveTimeline';
import { MatchControls } from './MatchControls';

import { useCallback, useState } from 'react';

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
    [matchId, sport, timer.currentMinute, timer.phase, selectedTeam],
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
                ? 'bg-gradient-to-r from-[#7f1d1d] to-[#991b1b] text-white shadow-md'
                : 'bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700',
            )}
          >
            {teamA.name}
          </button>

          <span className="text-xs font-bold text-gray-400 dark:text-gray-500">
            VS
          </span>

          <button
            onClick={() => setActiveTeam('teamB')}
            aria-pressed={activeTeam === 'teamB'}
            className={clsx(
              'px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200',
              activeTeam === 'teamB'
                ? 'bg-gradient-to-r from-[#7f1d1d] to-[#991b1b] text-white shadow-md'
                : 'bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700',
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
