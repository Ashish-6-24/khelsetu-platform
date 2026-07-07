import { LiveEventCenter } from '@features/events';
import { matchService } from '@features/tournaments/services/tournament';
import type { Match } from '@shared/types/tournament';
import { ErrorState } from '@shared/ui/ErrorState';
import { Skeleton } from '@shared/ui/Skeleton';
import { useQuery } from '@tanstack/react-query';

import { useParams } from 'react-router-dom';

export const LiveEventCenterPage = () => {
  const { matchId } = useParams<{ matchId: string }>();

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

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-16" />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <Skeleton className="h-64 lg:col-span-2" />
          <Skeleton className="h-64 lg:col-span-3" />
        </div>
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
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {match.teamA.name} vs {match.teamB.name}
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {match.venue} &middot;{' '}
          {sport.charAt(0).toUpperCase() + sport.slice(1)}
        </p>
      </div>

      <LiveEventCenter
        matchId={match.id}
        sport={sport as 'football' | 'cricket' | 'volleyball'}
        teamA={{ id: match.teamA.id, name: match.teamA.name }}
        teamB={{ id: match.teamB.id, name: match.teamB.name }}
      />
    </div>
  );
};
