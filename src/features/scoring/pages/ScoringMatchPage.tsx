import { playerService } from '@features/players/services/playerService';
import {
  BasketballScoringPanel,
  CricketScoringPanel,
  FootballScoringPanel,
  VolleyballScoringPanel,
} from '@features/scoring/components';
import { useScoringWebSocket } from '@features/scoring/hooks/useScoringWebSocket';
import { ConnectionStatusIndicator } from '@features/scoring/live/components/ConnectionStatusIndicator';
import { MatchStatusIndicator } from '@features/scoring/live/components/MatchStatusIndicator';
import { useSocket } from '@features/websocket/useSocket';
import { matchService } from '@shared/api/tournaments';
import type { Match } from '@shared/types/tournament';
import { Button } from '@shared/ui/Button';
import { Card, CardBody } from '@shared/ui/Card';
import { ErrorState } from '@shared/ui/ErrorState';
import { Skeleton } from '@shared/ui/Skeleton';
import { ROUTES } from '@shared/utils/constants';
import { useScoringStore } from '@state/scoringStore';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';

import { useCallback, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

export const ScoringMatchPage = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();
  const activeSport = useScoringStore((s) => s.activeSport);
  const setActiveMatch = useScoringStore((s) => s.setActiveMatch);
  const setScoring = useScoringStore((s) => s.setScoring);
  const undoLastAction = useScoringStore((s) => s.undoLastAction);
  const addCricketBall = useScoringStore((s) => s.addCricketBall);
  const storeAddFootballEvent = useScoringStore((s) => s.addFootballEvent);
  const updateFootballMinute = useScoringStore((s) => s.updateFootballMinute);
  const toggleFootballTimer = useScoringStore((s) => s.toggleFootballTimer);
  const addVolleyballPoint = useScoringStore((s) => s.addVolleyballPoint);
  const endVolleyballSet = useScoringStore((s) => s.endVolleyballSet);
  const switchVolleyballServe = useScoringStore((s) => s.switchVolleyballServe);
  const storeAddBasketballEvent = useScoringStore((s) => s.addBasketballEvent);
  const nextBasketballQuarter = useScoringStore((s) => s.nextBasketballQuarter);
  const toggleBasketballTimer = useScoringStore((s) => s.toggleBasketballTimer);
  const cricket = useScoringStore((s) => s.cricket);
  const football = useScoringStore((s) => s.football);
  const volleyball = useScoringStore((s) => s.volleyball);
  const basketball = useScoringStore((s) => s.basketball);

  const addFootballEvent = useCallback(
    (
      event: Omit<
        Parameters<typeof storeAddFootballEvent>[0],
        'id' | 'timestamp'
      >,
    ) =>
      storeAddFootballEvent({
        ...event,
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
      } as Parameters<typeof storeAddFootballEvent>[0]),
    [storeAddFootballEvent],
  );

  const addBasketballEvent = useCallback(
    (
      event: Omit<
        Parameters<typeof storeAddBasketballEvent>[0],
        'id' | 'timestamp'
      >,
    ) =>
      storeAddBasketballEvent({
        ...event,
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
      } as Parameters<typeof storeAddBasketballEvent>[0]),
    [storeAddBasketballEvent],
  );

  const {
    data: match,
    isLoading,
    error,
    refetch,
  } = useQuery<Match | null>({
    queryKey: ['match', matchId],
    queryFn: () => matchService.getById(matchId!),
    enabled: !!matchId,
  });

  const { data: teamAPlayers = [] } = useQuery({
    queryKey: ['players', 'team', match?.teamA?.id],
    queryFn: () => playerService.getByTeam(match!.teamA.id),
    enabled: !!match?.teamA?.id,
  });

  const { data: teamBPlayers = [] } = useQuery({
    queryKey: ['players', 'team', match?.teamB?.id],
    queryFn: () => playerService.getByTeam(match!.teamB.id),
    enabled: !!match?.teamB?.id,
  });

  useScoringWebSocket(matchId);

  const { connectionStatus, reconnectAttempts, maxReconnectAttempts } =
    useSocket();

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

  if (error) {
    return (
      <ErrorState
        title="Failed to load match"
        message="Could not fetch match data. Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  if (!match) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Match Not Found
        </h1>
        <p className="text-[var(--text-secondary)]">
          The match you are looking for does not exist.
        </p>
      </div>
    );
  }

  const sport = (match as Match & { sport?: string }).sport ?? 'cricket';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => {
              if (window.history.length > 1) {
                navigate(-1);
              } else {
                navigate(ROUTES.SCORING);
              }
            }}
            aria-label="Go back to scoring"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">
              {match.teamA.name} vs {match.teamB.name}
            </h1>
            <p className="mt-1 text-sm text-[var(--text-tertiary)]">
              {match.venue} &middot;{' '}
              {sport.charAt(0).toUpperCase() + sport.slice(1)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ConnectionStatusIndicator
            status={connectionStatus}
            reconnectAttempts={reconnectAttempts}
            maxReconnectAttempts={maxReconnectAttempts}
          />
          <MatchStatusIndicator status={match.status} />
        </div>
      </div>

      {!activeSport && (
        <Card>
          <CardBody>
            <div className="text-center py-8 space-y-4">
              <p className="text-lg font-semibold text-[var(--text-primary)]">
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
              cricket.score?.innings[cricket.score.currentInningsIndex] && (
                <CricketScoringPanel
                  innings={
                    cricket.score.innings[cricket.score.currentInningsIndex]!
                  }
                  onAddBall={addCricketBall}
                  onUndo={undoLastAction}
                />
              )}
            {sport === 'football' && football.score && (
              <FootballScoringPanel
                score={football.score}
                onAddEvent={addFootballEvent}
                onMinuteUpdate={updateFootballMinute}
                onToggleTimer={toggleFootballTimer}
                onUndo={undoLastAction}
                teamAPlayers={teamAPlayers.map((p) => ({
                  id: p.id,
                  name: p.name,
                }))}
                teamBPlayers={teamBPlayers.map((p) => ({
                  id: p.id,
                  name: p.name,
                }))}
              />
            )}
            {sport === 'volleyball' && volleyball.score && (
              <VolleyballScoringPanel
                score={volleyball.score}
                onAddPoint={addVolleyballPoint}
                onEndSet={endVolleyballSet}
                onSwitchServe={switchVolleyballServe}
                onUndo={undoLastAction}
              />
            )}
            {sport === 'basketball' && basketball.score && (
              <BasketballScoringPanel
                score={basketball.score}
                onAddEvent={addBasketballEvent}
                onNextQuarter={nextBasketballQuarter}
                onToggleTimer={toggleBasketballTimer}
                onUndo={undoLastAction}
              />
            )}
          </div>

          <div>
            <Card>
              <CardBody>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                  Match Info
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-[var(--text-tertiary)]">Tournament</p>
                    <p className="font-medium text-[var(--text-primary)]">
                      {match.tournamentId ?? 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[var(--text-tertiary)]">Sport</p>
                    <p className="font-medium text-[var(--text-primary)] capitalize">
                      {sport}
                    </p>
                  </div>
                  <div>
                    <p className="text-[var(--text-tertiary)]">Status</p>
                    <p className="font-medium text-[var(--text-primary)] capitalize">
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
