import { TournamentCard } from '@components/tournament/TournamentCard';
import { Button } from '@components/ui/Button';
import { Skeleton } from '@components/ui/Skeleton';
import { tournamentService } from '@services/api/tournament';
import { useQuery } from '@tanstack/react-query';
import type { Tournament } from '@types-domain/tournament';

import { useNavigate } from 'react-router-dom';

export const TournamentsPage = () => {
  const navigate = useNavigate();
  const {
    data: tournaments,
    isLoading,
    error,
  } = useQuery<Tournament[]>({
    queryKey: ['tournaments'],
    queryFn: () => tournamentService.getAll(),
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64 mt-2" />
          </div>
          <Button>Create Tournament</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-40" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Tournaments
            </h1>
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              Failed to load tournaments
            </p>
          </div>
          <Button>Create Tournament</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Tournaments
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your tournaments
          </p>
        </div>
        <Button>Create Tournament</Button>
      </div>

      {tournaments && tournaments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tournaments.map((tournament) => (
            <TournamentCard
              key={tournament.id}
              tournament={tournament}
              onClick={() => navigate(`/tournaments/${tournament.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No tournaments found. Create your first tournament to get started.
          </p>
        </div>
      )}
    </div>
  );
};
