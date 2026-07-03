import { StandingsTable } from '@features/standings/components';
import { useStandings, useStandingsWebSocket } from '@features/standings/hooks';
import type { Standing } from '@features/standings/types';
import { tournamentService } from '@features/tournaments/services/tournament';
import { Badge } from '@shared/components/ui/Badge';
import { Button } from '@shared/components/ui/Button';
import { Card, CardBody } from '@shared/components/ui/Card';
import { Skeleton } from '@shared/components/ui/Skeleton';
import { Tabs } from '@shared/components/ui/Tabs';
import type { Match, Team, Tournament } from '@shared/types/tournament';
import { useQuery } from '@tanstack/react-query';

import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

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
    useQuery<Tournament>({
      queryKey: ['tournament', id],
      queryFn: () => tournamentService.getById(id!),
      enabled: !!id,
    });

  const { data: matches, isLoading: loadingMatches } = useQuery<Match[]>({
    queryKey: ['tournament-matches', id],
    queryFn: () => tournamentService.getMatches(id!),
    enabled: !!id,
  });

  const { data: teams, isLoading: loadingTeams } = useQuery<Team[]>({
    queryKey: ['tournament-teams', id],
    queryFn: () => tournamentService.getTeams(id!),
    enabled: !!id,
  });

  const { data: standings, isLoading: loadingStandings } = useQuery<Standing[]>(
    {
      queryKey: ['tournament-standings', id],
      queryFn: () => tournamentService.getStandings(id!) as Promise<Standing[]>,
      enabled: !!id,
    },
  );

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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Tournament Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          The tournament you are looking for does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {tournament.name}
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {tournament.sport} &middot; {tournament.format} &middot;{' '}
            <Badge variant={tournament.status === 'live' ? 'success' : 'info'}>
              {tournament.status}
            </Badge>
          </p>
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
            <p className="text-sm text-gray-500 dark:text-gray-400">Teams</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {teams?.length ?? tournament.currentTeams}
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-sm text-gray-500 dark:text-gray-400">Matches</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {matches?.length ?? 0}
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-sm text-gray-500 dark:text-gray-400">Live</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
              {matches?.filter((m) => m.status === 'live').length ?? 0}
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Completed
            </p>
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
            {loadingMatches ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16" />
                ))}
              </div>
            ) : matches && matches.length > 0 ? (
              <div className="space-y-3">
                {matches.map((match) => (
                  <div
                    key={match.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => navigate(`/scoring/${match.id}`)}
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {match.teamA.name} vs {match.teamB.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {match.venue}
                      </p>
                    </div>
                    <Badge
                      variant={
                        match.status === 'live'
                          ? 'live'
                          : match.status === 'completed'
                            ? 'success'
                            : 'info'
                      }
                      pulse={match.status === 'live'}
                    >
                      {match.status}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
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
                    className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => navigate(`/teams/${team.id}`)}
                  >
                    <p className="font-medium text-gray-900 dark:text-white">
                      {team.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {team.players.length} players
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
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
