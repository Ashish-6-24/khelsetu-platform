import type { FootballEvent, FootballScore } from '@shared/types/scoring';
import { Button } from '@shared/ui/Button';
import { Card, CardBody } from '@shared/ui/Card';
import { Tabs } from '@shared/ui/Tabs';

import { useState } from 'react';

import { CardButtons } from './CardButtons';
import { EventTimeline } from './EventTimeline';
import { GoalButton } from './GoalButton';
import { MatchTimer } from './MatchTimer';
import { StatsTracker } from './StatsTracker';

interface FootballScoringPanelProps {
  score: FootballScore;
  onAddEvent: (event: Omit<FootballEvent, 'id' | 'timestamp'>) => void;
  onMinuteUpdate: (minute: number) => void;
  onToggleTimer: () => void;
  onUndo: () => void;
  teamAPlayers?: { id: string; name: string }[];
  teamBPlayers?: { id: string; name: string }[];
}

const TABS = [
  { id: 'events', label: 'Events' },
  { id: 'stats', label: 'Stats' },
];

export const FootballScoringPanel = ({
  score,
  onAddEvent,
  onMinuteUpdate,
  onToggleTimer,
  onUndo,
  teamAPlayers = [],
  teamBPlayers = [],
}: FootballScoringPanelProps) => {
  const [activeTab, setActiveTab] = useState('events');

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-[var(--brand-primary)]/5 to-[var(--brand-accent)]/5 dark:from-[var(--brand-primary)]/10 dark:to-[var(--brand-accent)]/10 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <p className="text-lg font-bold text-[var(--text-primary)] dark:text-white">
              {score.teamA.teamName}
            </p>
            <p className="text-4xl font-bold text-[var(--text-primary)] dark:text-white mt-1">
              {score.teamA.goals}
            </p>
          </div>
          <div className="text-center px-4">
            <p className="text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
              VS
            </p>
          </div>
          <div className="text-center flex-1">
            <p className="text-lg font-bold text-[var(--text-primary)] dark:text-white">
              {score.teamB.teamName}
            </p>
            <p className="text-4xl font-bold text-[var(--text-primary)] dark:text-white mt-1">
              {score.teamB.goals}
            </p>
          </div>
        </div>
      </div>

      <MatchTimer
        minute={score.currentMinute}
        isRunning={score.isRunning}
        onToggle={onToggleTimer}
        onMinuteUpdate={onMinuteUpdate}
      />

      <Card>
        <CardBody>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Quick Actions
            </h3>
            <GoalButton
              teamAPlayers={teamAPlayers}
              teamBPlayers={teamBPlayers}
              onGoal={onAddEvent}
              teamAId={score.teamA.teamId}
              teamBId={score.teamB.teamId}
            />
            <CardButtons
              teamAPlayers={teamAPlayers}
              teamBPlayers={teamBPlayers}
              onCard={onAddEvent}
              teamAId={score.teamA.teamId}
              teamBId={score.teamB.teamId}
            />
          </div>
        </CardBody>
      </Card>

      <Tabs
        tabs={TABS}
        activeTab={activeTab}
        onChange={setActiveTab}
        variant="pills"
      />

      {activeTab === 'events' && (
        <Card>
          <CardBody>
            <EventTimeline events={score.events} />
          </CardBody>
        </Card>
      )}

      {activeTab === 'stats' && (
        <Card>
          <CardBody>
            <StatsTracker teamA={score.teamA} teamB={score.teamB} />
          </CardBody>
        </Card>
      )}

      <div className="flex gap-2">
        <Button variant="outline" onClick={onUndo} className="flex-1">
          Undo
        </Button>
      </div>
    </div>
  );
};
