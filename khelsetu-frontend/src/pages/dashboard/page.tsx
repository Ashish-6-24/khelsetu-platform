import { ActivityFeed } from '@components/dashboard/ActivityFeed';
import { LiveMatchesPanel } from '@components/dashboard/LiveMatchesPanel';
import { StatsCard } from '@components/dashboard/StatsCard';
import { Skeleton } from '@components/ui/Skeleton';
import { matchService, tournamentService } from '@services/api/tournament';
import { useQuery } from '@tanstack/react-query';
import type { Match, Tournament } from '@types-domain/tournament';
import { BarChart3, Trophy, UserPlus, Users } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { data: tournaments, isLoading: loadingTournaments } = useQuery<
    Tournament[]
  >({
    queryKey: ['tournaments'],
    queryFn: () => tournamentService.getAll(),
  });

  const { data: matches, isLoading: loadingMatches } = useQuery<Match[]>({
    queryKey: ['matches'],
    queryFn: () => matchService.getAll(),
  });

  const isLoading = loadingTournaments || loadingMatches;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-72 mt-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  const totalTournaments = tournaments?.length ?? 0;
  const liveMatches = matches?.filter((m) => m.status === 'live').length ?? 0;
  const totalTeams =
    tournaments?.reduce((sum, t) => sum + t.currentTeams, 0) ?? 0;
  const totalPlayers =
    tournaments?.reduce((sum, t) => sum + t.currentTeams * 12, 0) ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Welcome back! Here&apos;s what&apos;s happening with your tournaments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Tournaments"
          value={totalTournaments}
          icon={<Trophy className="w-6 h-6" />}
        />
        <StatsCard
          title="Live Matches"
          value={liveMatches}
          icon={<BarChart3 className="w-6 h-6" />}
          change={
            liveMatches > 0 ? { value: 100, isPositive: true } : undefined
          }
        />
        <StatsCard
          title="Total Teams"
          value={totalTeams}
          icon={<Users className="w-6 h-6" />}
        />
        <StatsCard
          title="Total Players"
          value={totalPlayers}
          icon={<UserPlus className="w-6 h-6" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LiveMatchesPanel
          matches={matches ?? []}
          onMatchClick={(match) => navigate(`/scoring/${match.id}`)}
        />
        <ActivityFeed
          activities={[
            {
              id: '1',
              title: 'Summer Cricket League started',
              time: '2 hours ago',
              type: 'success',
            },
            {
              id: '2',
              title: 'Tournament "Winter Cup" created',
              time: '5 hours ago',
              type: 'info',
            },
          ]}
        />
      </div>
    </div>
  );
};
