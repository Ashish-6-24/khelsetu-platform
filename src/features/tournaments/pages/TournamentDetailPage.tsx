import { StandingsTable } from '@features/standings/components';
import { useStandings, useStandingsWebSocket } from '@features/standings/hooks';
import type { Standing } from '@features/standings/types';
import { tournamentService } from '@shared/api/tournaments';
import type { Match, Team, Tournament } from '@shared/types/tournament';
import { Badge } from '@shared/ui/Badge';
import { Button } from '@shared/ui/Button';
import { Card, CardBody } from '@shared/ui/Card';
import { Skeleton } from '@shared/ui/Skeleton';
import { Tabs } from '@shared/ui/Tabs';
import { ROUTES } from '@shared/utils/constants';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';

import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

function getMatchStatusVariant(status: string): 'live' | 'success' | 'info' {
  if (status === 'live') return 'live';
  if (status === 'completed') return 'success';
  return 'info';
}

const TABS = [
  { id: 'matches', label: 'Matches' },
  { id: 'teams', label: 'Teams' },
  { id: 'standings', label: 'Standings' },
];

export const TournamentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('matches');

  const { data: tournament, isLoading: loadingTournament } =
    useQuery<Tournament | null>({
      queryKey: ['tournament', id],
      queryFn: () => tournamentService.getById(id!),
      enabled: !!id,
    });

  const { data: matches = [], isLoading: loadingMatches } = useQuery<Match[]>({
    queryKey: ['tournament-matches', id],
    queryFn: () => tournamentService.getMatches(id!),
    enabled: !!id,
  });

  const { data: teams = [], isLoading: loadingTeams } = useQuery<Team[]>({
    queryKey: ['tournament-teams', id],
    queryFn: () => tournamentService.getTeams(id!),
    enabled: !!id,
  });

  const { data: standings = [], isLoading: loadingStandings } = useQuery<
    Standing[]
  >({
    queryKey: ['tournament-standings', id],
    queryFn: () => tournamentService.getStandings(id!) as Promise<Standing[]>,
    enabled: !!id,
  });

  const { standings: featureStandings, isLoading: featureLoadingStandings } =
    useStandings(id!);
  useStandingsWebSocket(id);

  if (loadingTournament) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Tournament Not Found
        </h1>
        <p className="text-[var(--text-secondary)]">
          The tournament you are looking for does not exist.
        </p>
      </div>
    );
  }

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
                navigate(ROUTES.TOURNAMENTS);
              }
            }}
            aria-label="Go back to tournaments"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">
              {tournament.name}
            </h1>
            <p className="mt-1 text-sm text-[var(--text-tertiary)]">
              {tournament.sport} &middot; {tournament.format} &middot;{' '}
              <Badge
                variant={tournament.status === 'live' ? 'success' : 'info'}
              >
                {tournament.status}
              </Badge>
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => navigate(`/tournaments/${id}/bracket`)}
          >
            View Bracket
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(`/tournaments/${id}/edit`)}
          >
            Edit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardBody>
            <p className="text-sm text-[var(--text-tertiary)]">Teams</p>
            <p className="text-2xl font-bold text-[var(--text-primary)] mt-1">
              {teams?.length ?? tournament.currentTeams}
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-sm text-[var(--text-tertiary)]">Matches</p>
            <p className="text-2xl font-bold text-[var(--text-primary)] mt-1">
              {matches?.length ?? 0}
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-sm text-[var(--text-tertiary)]">Live</p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">
              {matches?.filter((m) => m.status === 'live').length ?? 0}
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-sm text-[var(--text-tertiary)]">Completed</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
              {matches?.filter((m) => m.status === 'completed').length ?? 0}
            </p>
          </CardBody>
        </Card>
      </div>

      <Tabs
        tabs={TABS}
        activeTab={activeTab}
        onChange={setActiveTab}
        variant="pills"
      />

      {activeTab === 'matches' && (
        <Card>
          <CardBody>
            {loadingMatches && (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16" />
                ))}
              </div>
            )}
            {!loadingMatches && matches && matches.length > 0 && (
              <div className="space-y-3">
                {matches.map((match) => (
                  <div
                    key={match.id}
                    role="button"
                    tabIndex={0}
                    className="flex items-center justify-between p-3 bg-[var(--bg-surface)] rounded-lg cursor-pointer hover:bg-[var(--bg-surface-raised)] transition-colors"
                    onClick={() => navigate(`/scoring/${match.id}`)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        navigate(`/scoring/${match.id}`);
                      }
                    }}
                  >
                    <div>
                      <p className="font-medium text-[var(--text-primary)]">
                        {match.teamA.name} vs {match.teamB.name}
                      </p>
                      <p className="text-sm text-[var(--text-tertiary)]">
                        {match.venue}
                      </p>
                    </div>
                    <Badge
                      variant={getMatchStatusVariant(match.status)}
                      pulse={match.status === 'live'}
                    >
                      {match.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
            {!loadingMatches && (!matches || matches.length === 0) && (
              <p className="text-[var(--text-tertiary)] text-center py-8">
                No matches scheduled yet. Add matches to get the tournament
                rolling.
              </p>
            )}
          </CardBody>
        </Card>
      )}

      {activeTab === 'teams' && (
        <Card>
          <CardBody>
            {loadingTeams ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-12" />
                ))}
              </div>
            ) : teams && teams.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {teams.map((team) => (
                  <div
                    key={team.id}
                    role="button"
                    tabIndex={0}
                    className="p-3 bg-[var(--bg-surface)] rounded-lg cursor-pointer hover:bg-[var(--bg-surface-raised)] transition-colors"
                    onClick={() => navigate(`/teams/${team.id}`)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        navigate(`/teams/${team.id}`);
                      }
                    }}
                  >
                    <p className="font-medium text-[var(--text-primary)]">
                      {team.name}
                    </p>
                    <p className="text-sm text-[var(--text-tertiary)]">
                      {team.players.length} players
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[var(--text-tertiary)] text-center py-8">
                No teams signed up yet. Register teams to compete.
              </p>
            )}
          </CardBody>
        </Card>
      )}

      {activeTab === 'standings' && (
        <StandingsTable
          standings={featureStandings ?? (standings as Standing[]) ?? []}
          isLoading={loadingStandings || featureLoadingStandings}
          sport={
            (tournament?.sport as
              'cricket' | 'football' | 'volleyball' | 'basketball') ?? 'cricket'
          }
        />
      )}
    </div>
  );
};
