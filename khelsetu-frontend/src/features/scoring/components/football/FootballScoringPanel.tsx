import { Button } from '@shared/components/ui/Button';
import { Card, CardBody } from '@shared/components/ui/Card';
import { Tabs } from '@shared/components/ui/Tabs';
import type { FootballEvent, FootballScore } from '@shared/types/scoring';

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
}: FootballScoringPanelProps) => {
  const [activeTab, setActiveTab] = useState('events');

  const teamAPlayers = [
    { id: 'p1', name: 'Player 1' },
    { id: 'p2', name: 'Player 2' },
    { id: 'p3', name: 'Player 3' },
  ];
  const teamBPlayers = [
    { id: 'p4', name: 'Player 4' },
    { id: 'p5', name: 'Player 5' },
    { id: 'p6', name: 'Player 6' },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {score.teamA.teamName}
            </p>
            <p className="text-4xl font-bold text-green-600 dark:text-green-400 mt-1">
              {score.teamA.goals}
            </p>
          </div>
          <div className="text-center px-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">VS</p>
          </div>
          <div className="text-center flex-1">
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {score.teamB.teamName}
            </p>
            <p className="text-4xl font-bold text-green-600 dark:text-green-400 mt-1">
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
