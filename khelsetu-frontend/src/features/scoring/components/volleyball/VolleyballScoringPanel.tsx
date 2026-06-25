import { Button } from '@components/ui/Button';
import { Card, CardBody } from '@components/ui/Card';
import { getEventTypeIcon } from '@features/scoring/utils/volleyball';
import type { VolleyballEvent, VolleyballScore } from '@types-domain/scoring';
import { motion } from 'framer-motion';

interface VolleyballScoringPanelProps {
  score: VolleyballScore;
  onAddPoint: (team: 'teamA' | 'teamB', event?: VolleyballEvent) => void;
  onEndSet: () => void;
  onSwitchServe: () => void;
  onUndo: () => void;
}

export const VolleyballScoringPanel = ({
  score,
  onAddPoint,
  onEndSet,
  onSwitchServe,
  onUndo,
}: VolleyballScoringPanelProps) => {
  const currentSet = score.sets[score.currentSet - 1];

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <p className="text-lg font-bold text-[var(--text-primary)] dark:text-white">
              {score.teamAName}
            </p>
            <p className="text-4xl font-bold text-orange-600 dark:text-orange-400 mt-1">
              {score.currentPoint.teamA}
            </p>
            <p className="text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
              Sets: {score.teamASetsWon}
            </p>
          </div>
          <div className="text-center px-4">
            <p className="text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
              Set {score.currentSet}
            </p>
            <p className="text-xs text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
              {score.servingTeam === 'teamA'
                ? `${score.teamAName} serving`
                : `${score.teamBName} serving`}
            </p>
          </div>
          <div className="text-center flex-1">
            <p className="text-lg font-bold text-[var(--text-primary)] dark:text-white">
              {score.teamBName}
            </p>
            <p className="text-4xl font-bold text-orange-600 dark:text-orange-400 mt-1">
              {score.currentPoint.teamB}
            </p>
            <p className="text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
              Sets: {score.teamBSetsWon}
            </p>
          </div>
        </div>
      </div>

      <Card>
        <CardBody>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-16 text-lg font-bold bg-orange-50 text-orange-800 hover:bg-orange-100 dark:bg-orange-900/20 dark:text-orange-300"
              onClick={() => onAddPoint('teamA')}
            >
              {score.teamAName} +1
            </Button>
            <Button
              variant="outline"
              className="h-16 text-lg font-bold bg-orange-50 text-orange-800 hover:bg-orange-100 dark:bg-orange-900/20 dark:text-orange-300"
              onClick={() => onAddPoint('teamB')}
            >
              {score.teamBName} +1
            </Button>
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" onClick={onSwitchServe}>
          Switch Serve
        </Button>
        <Button variant="outline" onClick={onEndSet}>
          End Set
        </Button>
      </div>

      {currentSet && currentSet.events.length > 0 && (
        <Card>
          <CardBody>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {[...currentSet.events].reverse().map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 p-2 bg-[var(--bg-surface-sunken)] dark:bg-[var(--bg-surface)] rounded"
                >
                  <span className="text-lg">
                    {getEventTypeIcon(event.type)}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[var(--text-primary)] dark:text-white">
                      {event.playerName ?? event.teamName}
                    </p>
                  </div>
                  <span className="text-xs text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                    Point {event.pointNumber}
                  </span>
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
