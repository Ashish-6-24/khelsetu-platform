import { MatchStatusIndicator } from '@components/scoring/MatchStatusIndicator';
import { Button } from '@components/ui/Button';
import { Card, CardBody } from '@components/ui/Card';
import { Skeleton } from '@components/ui/Skeleton';
import {
  BasketballScoringPanel,
  CricketScoringPanel,
  FootballScoringPanel,
  VolleyballScoringPanel,
} from '@features/scoring/components';
import { matchService } from '@services/api/tournament';
import { useScoringStore } from '@store/scoringStore';
import { useQuery } from '@tanstack/react-query';
import type { Match } from '@types-domain/tournament';

import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

export const ScoringMatchPage = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const {
    activeSport,
    setActiveMatch,
    setScoring,
    undoLastAction,
    cricket,
    football,
    volleyball,
    basketball,
  } = useScoringStore();

  const { data: match, isLoading } = useQuery<Match>({
    queryKey: ['match', matchId],
    queryFn: () => matchService.getById(matchId!),
    enabled: !!matchId,
  });

  useEffect(() => {
    if (match && matchId) {
      const sport = (match as Match & { sport?: string }).sport ?? 'cricket';
      setActiveMatch(
        matchId,
        sport as 'cricket' | 'football' | 'volleyball' | 'basketball',
      );
    }
  }, [match, matchId, setActiveMatch]);

  const handleStartMatch = () => {
    setScoring(true);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (!match) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Match Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          The match you are looking for does not exist.
        </p>
      </div>
    );
  }

  const sport = (match as Match & { sport?: string }).sport ?? 'cricket';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {match.teamA.name} vs {match.teamB.name}
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {match.venue} &middot;{' '}
            {sport.charAt(0).toUpperCase() + sport.slice(1)}
          </p>
        </div>
        <MatchStatusIndicator status={match.status} />
      </div>

      {!activeSport && (
        <Card>
          <CardBody>
            <div className="text-center py-8 space-y-4">
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                Ready to start scoring?
              </p>
              <Button variant="live" onClick={handleStartMatch}>
                Start Match
              </Button>
            </div>
          </CardBody>
        </Card>
      )}

      {activeSport && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {sport === 'cricket' &&
              cricket.score &&
              cricket.score.innings[cricket.score.currentInningsIndex] && (
                <CricketScoringPanel
                  innings={
                    cricket.score.innings[cricket.score.currentInningsIndex]!
                  }
                  onAddBall={() => {}}
                  onUndo={undoLastAction}
                />
              )}
            {sport === 'football' && football.score && (
              <FootballScoringPanel
                score={football.score}
                onAddEvent={() => {}}
                onMinuteUpdate={() => {}}
                onToggleTimer={() => {}}
                onUndo={undoLastAction}
              />
            )}
            {sport === 'volleyball' && volleyball.score && (
              <VolleyballScoringPanel
                score={volleyball.score}
                onAddPoint={() => {}}
                onEndSet={() => {}}
                onSwitchServe={() => {}}
                onUndo={undoLastAction}
              />
            )}
            {sport === 'basketball' && basketball.score && (
              <BasketballScoringPanel
                score={basketball.score}
                onAddEvent={() => {}}
                onNextQuarter={() => {}}
                onToggleTimer={() => {}}
                onUndo={undoLastAction}
              />
            )}
          </div>

          <div>
            <Card>
              <CardBody>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Match Info
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Tournament
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {match.tournamentId ?? 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Sport</p>
                    <p className="font-medium text-gray-900 dark:text-white capitalize">
                      {sport}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Status</p>
                    <p className="font-medium text-gray-900 dark:text-white capitalize">
                      {match.status}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
