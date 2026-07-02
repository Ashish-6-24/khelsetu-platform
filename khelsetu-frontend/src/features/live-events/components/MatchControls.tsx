import { Badge } from '@shared/components/ui/Badge';
import { Button } from '@shared/components/ui/Button';
import { Card, CardBody } from '@shared/components/ui/Card';

import type { MatchPhase, MatchTimerState } from '../types';

interface MatchControlsProps {
  timer: MatchTimerState & {
    displayTime: string;
    canStart: boolean;
    canPause: boolean;
    canResume: boolean;
    canEnd: boolean;
    canAdvance: boolean;
    startMatch: () => void;
    pauseMatch: () => void;
    resumeMatch: () => void;
    endMatch: () => void;
    advancePhase: () => void;
    startSecondHalf: () => void;
    startExtraTime: () => void;
    startPenalties: () => void;
    goToHalftime: () => void;
  };
}

const PHASE_LABELS: Record<MatchPhase, string> = {
  not_started: 'Not Started',
  first_half: '1st Half',
  halftime: 'Half Time',
  second_half: '2nd Half',
  extra_time_first: 'ET 1st Half',
  extra_time_second: 'ET 2nd Half',
  penalties: 'Penalties',
  completed: 'Completed',
};

export const MatchControls = ({ timer }: MatchControlsProps) => {
  const phaseLabel = PHASE_LABELS[timer.phase];

  return (
    <Card glass elevated>
      <CardBody padding="md">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="flex flex-col items-center">
            <p className="text-xs font-medium text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)] uppercase tracking-wider mb-1">
              Timer
            </p>
            <p
              className="text-4xl sm:text-5xl font-bold tabular-nums text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-accent)] dark:from-red-400 dark:to-amber-400 font-mono"
              aria-live="polite"
              aria-atomic="true"
            >
              {timer.displayTime}
            </p>
            <div className="mt-1.5">
              {timer.phase === 'not_started' ? (
                <Badge variant="outline" size="sm">
                  {phaseLabel}
                </Badge>
              ) : timer.phase === 'completed' ? (
                <Badge variant="success" size="sm">
                  {phaseLabel}
                </Badge>
              ) : timer.isRunning ? (
                <Badge variant="live" size="sm">
                  {phaseLabel}
                </Badge>
              ) : (
                <Badge variant="warning" size="sm">
                  {phaseLabel}
                </Badge>
              )}
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {timer.canStart && (
                <Button variant="success" size="md" onClick={timer.startMatch}>
                  Start Match
                </Button>
              )}

              {timer.canPause && (
                <Button
                  variant="outline"
                  size="md"
                  onClick={timer.pauseMatch}
                  className="border-red-200 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  Pause
                </Button>
              )}

              {timer.canResume && (
                <Button variant="success" size="md" onClick={timer.resumeMatch}>
                  Resume
                </Button>
              )}

              {timer.canEnd && (
                <Button variant="danger" size="md" onClick={timer.endMatch}>
                  End Match
                </Button>
              )}

              {timer.canAdvance && timer.phase === 'first_half' && (
                <Button
                  variant="outline"
                  size="md"
                  onClick={timer.goToHalftime}
                >
                  Half Time
                </Button>
              )}

              {timer.canAdvance && timer.phase === 'halftime' && (
                <Button
                  variant="success"
                  size="md"
                  onClick={timer.startSecondHalf}
                >
                  2nd Half
                </Button>
              )}

              {timer.canAdvance && timer.phase === 'second_half' && (
                <Button
                  variant="outline"
                  size="md"
                  onClick={timer.startExtraTime}
                >
                  Extra Time
                </Button>
              )}

              {timer.canAdvance && timer.phase === 'second_half' && (
                <Button variant="gold" size="md" onClick={timer.startPenalties}>
                  Penalties
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
