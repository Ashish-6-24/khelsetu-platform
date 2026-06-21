import {
  StatisticsDashboard,
  StatisticsDashboardEmpty,
  StatisticsDashboardSkeleton,
} from '@features/match-statistics/components/StatisticsDashboard';
import { useMatchStatistics } from '@features/match-statistics/hooks/useMatchStatistics';
import { matchService } from '@services/api/tournament';
import { useQuery } from '@tanstack/react-query';

import { useParams } from 'react-router-dom';

export const MatchStatisticsPage = () => {
  const { matchId } = useParams<{ matchId: string }>();

  const { data: match, isLoading: matchLoading } = useQuery({
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Match Statistics
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Loading match data...
          </p>
        </div>
        <StatisticsDashboardSkeleton />
      </div>
    );
  }

  if (!statistics) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Match Statistics
          </h1>
          {match && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Match Statistics
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {statistics.teamA.teamName} vs {statistics.teamB.teamName}
        </p>
      </div>
      <StatisticsDashboard data={statistics} />
    </div>
  );
};
