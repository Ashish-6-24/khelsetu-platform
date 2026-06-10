import { Badge } from '@components/ui/Badge';
import { Button } from '@components/ui/Button';
import { Card, CardBody } from '@components/ui/Card';
import { Skeleton } from '@components/ui/Skeleton';
import { Tabs } from '@components/ui/Tabs';
import { StandingsTable } from '@features/standings/components';
import { useStandings } from '@features/standings/hooks';
import type { Standing } from '@features/standings/types';
import { tournamentService } from '@services/api/tournament';
import { useQuery } from '@tanstack/react-query';
import type { Tournament } from '@types-domain/tournament';

import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

const SPORT_FILTERS = [
  { id: 'all', label: 'All Sports' },
  { id: 'cricket', label: 'Cricket' },
  { id: 'football', label: 'Football' },
  { id: 'volleyball', label: 'Volleyball' },
  { id: 'basketball', label: 'Basketball' },
];

export const StandingsPage = () => {
  const navigate = useNavigate();
  const [activeSport, setActiveSport] = useState('all');
  const [selectedTournamentId, setSelectedTournamentId] = useState<string>('');

  const { data: tournaments, isLoading: loadingTournaments } = useQuery<
    Tournament[]
  >({
    queryKey: ['tournaments'],
    queryFn: () => tournamentService.getAll(),
  });

  const filteredTournaments =
    tournaments?.filter((t) => {
      const sport = (t as Tournament & { sport?: string }).sport ?? 'cricket';
      return activeSport === 'all' || sport === activeSport;
    }) ?? [];

  const selectedTournament = tournaments?.find(
    (t) => t.id === selectedTournamentId,
  );

  const { standings, isLoading: loadingStandings } =
    useStandings(selectedTournamentId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Standings
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          View tournament standings and points tables
        </p>
      </div>

      <Tabs
        tabs={SPORT_FILTERS}
        activeTab={activeSport}
        onChange={(sport) => {
          setActiveSport(sport);
          setSelectedTournamentId('');
        }}
        variant="pills"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1">
          <Card>
            <CardBody>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Select Tournament
              </h3>
              {loadingTournaments ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-10" />
                  ))}
                </div>
              ) : filteredTournaments.length > 0 ? (
                <div className="space-y-2">
                  {filteredTournaments.map((tournament) => (
                    <button
                      key={tournament.id}
                      onClick={() => setSelectedTournamentId(tournament.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedTournamentId === tournament.id
                          ? 'bg-blue-50 border-2 border-blue-500 dark:bg-blue-900/20'
                          : 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 border-2 border-transparent'
                      }`}
                    >
                      <p className="font-medium text-sm text-gray-900 dark:text-white truncate">
                        {tournament.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant={
                            tournament.status === 'live'
                              ? 'live'
                              : tournament.status === 'completed'
                                ? 'success'
                                : 'info'
                          }
                          className="text-xs"
                        >
                          {tournament.status}
                        </Badge>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {(tournament as Tournament & { sport?: string })
                            .sport ?? 'cricket'}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                  No tournaments found
                </p>
              )}
            </CardBody>
          </Card>
        </div>

        <div className="md:col-span-3">
          {selectedTournamentId ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {selectedTournament?.name}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Points Table
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() =>
                    navigate(`/tournaments/${selectedTournamentId}`)
                  }
                >
                  View Tournament
                </Button>
              </div>
              <StandingsTable
                standings={standings as Standing[]}
                isLoading={loadingStandings}
                sport={
                  ((selectedTournament as Tournament & { sport?: string })
                    ?.sport ?? 'cricket') as
                    | 'cricket'
                    | 'football'
                    | 'volleyball'
                    | 'basketball'
                }
              />
            </div>
          ) : (
            <Card>
              <CardBody>
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    Select a tournament to view standings
                  </p>
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
