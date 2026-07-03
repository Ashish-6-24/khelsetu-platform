import {
  formatGameTime,
  getEventTypeLabel,
  getPointsForEventType,
} from '@features/scoring/utils/basketball';
import { Button } from '@shared/components/ui/Button';
import { Card, CardBody } from '@shared/components/ui/Card';
import type { BasketballEvent, BasketballScore } from '@shared/types/scoring';
import { motion } from 'framer-motion';

import { useState } from 'react';

interface BasketballScoringPanelProps {
  score: BasketballScore;
  onAddEvent: (event: Omit<BasketballEvent, 'id' | 'timestamp'>) => void;
  onNextQuarter: () => void;
  onToggleTimer: () => void;
  onUndo: () => void;
}

export const BasketballScoringPanel = ({
  score,
  onAddEvent,
  onNextQuarter,
  onToggleTimer,
  onUndo,
}: BasketballScoringPanelProps) => {
  const [selectedTeam, setSelectedTeam] = useState<'teamA' | 'teamB'>('teamA');

  const handleScore = (type: '2pt' | '3pt' | 'free_throw') => {
    const points = getPointsForEventType(type);
    onAddEvent({
      matchId: '',
      quarter: score.currentQuarter,
      minute: 0,
      second: 0,
      type,
      teamId: score[selectedTeam].teamId,
      teamName: score[selectedTeam].teamName,
      playerId: 'player-id',
      playerName: 'Player',
      points,
    });
  };

  const handleStat = (
    type:
      | 'rebound_offensive'
      | 'rebound_defensive'
      | 'assist'
      | 'steal'
      | 'block'
      | 'turnover'
      | 'foul_personal',
  ) => {
    onAddEvent({
      matchId: '',
      quarter: score.currentQuarter,
      minute: 0,
      second: 0,
      type,
      teamId: score[selectedTeam].teamId,
      teamName: score[selectedTeam].teamName,
      playerId: 'player-id',
      playerName: 'Player',
    });
  };

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {score.teamA.teamName}
            </p>
            <p className="text-4xl font-bold text-red-600 dark:text-red-400 mt-1">
              {score.teamA.points}
            </p>
          </div>
          <div className="text-center px-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Q{score.currentQuarter}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Shot Clock: {score.shotClock}s
            </p>
          </div>
          <div className="text-center flex-1">
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {score.teamB.teamName}
            </p>
            <p className="text-4xl font-bold text-red-600 dark:text-red-400 mt-1">
              {score.teamB.points}
            </p>
          </div>
        </div>
      </div>

      <Card>
        <CardBody>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <Button
              variant={selectedTeam === 'teamA' ? 'primary' : 'outline'}
              onClick={() => setSelectedTeam('teamA')}
            >
              {score.teamA.teamName}
            </Button>
            <Button
              variant={selectedTeam === 'teamB' ? 'primary' : 'outline'}
              onClick={() => setSelectedTeam('teamB')}
            >
              {score.teamB.teamName}
            </Button>
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Scoring
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  className="h-14 font-bold"
                  onClick={() => handleScore('2pt')}
                >
                  2PT
                </Button>
                <Button
                  variant="outline"
                  className="h-14 font-bold"
                  onClick={() => handleScore('3pt')}
                >
                  3PT
                </Button>
                <Button
                  variant="outline"
                  className="h-14 font-bold"
                  onClick={() => handleScore('free_throw')}
                >
                  FT
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Stats
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {(
                  [
                    'rebound_offensive',
                    'assist',
                    'steal',
                    'block',
                    'turnover',
                    'foul_personal',
                  ] as const
                ).map((type) => (
                  <Button
                    key={type}
                    variant="outline"
                    className="h-10 text-xs"
                    onClick={() => handleStat(type)}
                  >
                    {getEventTypeLabel(type)}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" onClick={onToggleTimer}>
          {score.isRunning ? 'Pause' : 'Start'} Timer
        </Button>
        <Button variant="outline" onClick={onNextQuarter}>
          Next Quarter
        </Button>
      </div>

      {score.events.length > 0 && (
        <Card>
          <CardBody>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {[...score.events]
                .reverse()
                .slice(0, 20)
                .map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-800 rounded"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {event.playerName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {event.teamName}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {getEventTypeLabel(event.type)}
                        {event.points ? ` (+${event.points})` : ''}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Q{event.quarter}{' '}
                        {formatGameTime(event.minute, event.second)}
                      </p>
                    </div>
                  </motion.div>
                ))}
            </div>
          </CardBody>
        </Card>
      )}

      <Button variant="outline" onClick={onUndo} className="w-full">
        Undo
      </Button>
    </div>
  );
};
