import {
  StatisticsDashboard,
  StatisticsDashboardEmpty,
  StatisticsDashboardSkeleton,
} from '@features/statistics/components/StatisticsDashboard';
import { useMatchStatistics } from '@features/statistics/hooks/useMatchStatistics';
import { matchService } from '@features/tournaments/services/tournament';
import { ErrorState } from '@shared/ui/ErrorState';
import { useQuery } from '@tanstack/react-query';

import { useParams } from 'react-router-dom';

export const MatchStatisticsPage = () => {
  const { matchId } = useParams<{ matchId: string }>();

  const {
    data: match,
    isLoading: matchLoading,
    error: matchError,
  } = useQuery({
    queryKey: ['match', matchId],
    queryFn: () => matchService.getById(matchId!),
    enabled: !!matchId,
  });

  const { data: statistics, isLoading: statsLoading } = useMatchStatistics(
    matchId ?? '',
  );

  if (matchLoading || statsLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Match Statistics
          </h1>
          <p className="mt-1 text-sm text-[var(--text-tertiary)]">
            Loading match data...
          </p>
        </div>
        <StatisticsDashboardSkeleton />
      </div>
    );
  }

  if (matchError) {
    return (
      <ErrorState
        title="Failed to load match statistics"
        message="Could not fetch match data. Please try again."
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (!statistics) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Match Statistics
          </h1>
          {match && (
            <p className="mt-1 text-sm text-[var(--text-tertiary)]">
              {match.teamA.name} vs {match.teamB.name}
            </p>
          )}
        </div>
        <StatisticsDashboardEmpty />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Match Statistics
        </h1>
        <p className="mt-1 text-sm text-[var(--text-tertiary)]">
          {statistics.teamA.teamName} vs {statistics.teamB.teamName}
        </p>
      </div>
      <StatisticsDashboard data={statistics} />
    </div>
  );
};
