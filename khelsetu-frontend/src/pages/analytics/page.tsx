import { tournamentService } from '@features/tournaments/services/tournament';
import { Badge } from '@shared/components/ui/Badge';
import { Card, CardBody } from '@shared/components/ui/Card';
import { Skeleton } from '@shared/components/ui/Skeleton';
import { Tabs } from '@shared/components/ui/Tabs';
import type { Tournament } from '@shared/types/tournament';
import { useQuery } from '@tanstack/react-query';
import { BarChart3, Calendar, Trophy, Users } from 'lucide-react';

import { useMemo, useState } from 'react';

const TIME_FILTERS = [
  { id: '7d', label: 'Last 7 Days' },
  { id: '30d', label: 'Last 30 Days' },
  { id: '90d', label: 'Last 90 Days' },
  { id: 'all', label: 'All Time' },
];

const getDateRange = (filter: string): { start: Date; end: Date } => {
  const end = new Date();
  const start = new Date();
  switch (filter) {
    case '7d':
      start.setDate(end.getDate() - 7);
      break;
    case '30d':
      start.setDate(end.getDate() - 30);
      break;
    case '90d':
      start.setDate(end.getDate() - 90);
      break;
    default:
      start.setFullYear(2000);
  }
  return { start, end };
};

export const AnalyticsPage = () => {
  const [timeFilter, setTimeFilter] = useState('30d');

  const { data: tournaments, isLoading: loadingTournaments } = useQuery<
    Tournament[]
  >({
    queryKey: ['tournaments'],
    queryFn: () => tournamentService.getAll(),
  });

  const dateRange = getDateRange(timeFilter);

  const filteredTournaments = useMemo(() => {
    const currentNow = new Date();
    return (
      tournaments?.filter((t) => {
        const created = new Date(t.createdAt ?? currentNow);
        return created >= dateRange.start && created <= dateRange.end;
      }) ?? []
    );
  }, [tournaments, dateRange]);

  const stats = {
    totalTournaments: filteredTournaments.length,
    liveTournaments: filteredTournaments.filter((t) => t.status === 'live')
      .length,
    completedTournaments: filteredTournaments.filter(
      (t) => t.status === 'completed',
    ).length,
    upcomingTournaments: filteredTournaments.filter(
      (t) => t.status === 'upcoming',
    ).length,
    totalTeams:
      tournaments?.reduce((sum, t) => sum + (t.currentTeams ?? 0), 0) ?? 0,
    totalMatches: 0,
    liveMatches: 0,
  };

  const sportDistribution = filteredTournaments.reduce<Record<string, number>>(
    (acc, t) => {
      const sport = (t as Tournament & { sport?: string }).sport ?? 'cricket';
      acc[sport] = (acc[sport] ?? 0) + 1;
      return acc;
    },
    {},
  );

  const formatDistribution = filteredTournaments.reduce<Record<string, number>>(
    (acc, t) => {
      const format = t.format ?? 'unknown';
      acc[format] = (acc[format] ?? 0) + 1;
      return acc;
    },
    {},
  );

  if (loadingTournaments) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] dark:text-white">
            Analytics
          </h1>
          <p className="mt-1 text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
            Tournament and platform insights
          </p>
        </div>
      </div>

      <Tabs
        tabs={TIME_FILTERS}
        activeTab={timeFilter}
        onChange={setTimeFilter}
        variant="pills"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                  Tournaments
                </p>
                <p className="text-3xl font-bold text-[var(--text-primary)] dark:text-white mt-1">
                  {stats.totalTournaments}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                  Live Now
                </p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">
                  {stats.liveTournaments}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                  Teams
                </p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-1">
                  {stats.totalTeams}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                  Completed
                </p>
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 mt-1">
                  {stats.completedTournaments}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardBody>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] dark:text-white mb-4">
              Tournaments by Sport
            </h3>
            {Object.keys(sportDistribution).length > 0 ? (
              <div className="space-y-3">
                {Object.entries(sportDistribution)
                  .sort(([, a], [, b]) => b - a)
                  .map(([sport, count]) => {
                    const percentage =
                      stats.totalTournaments > 0
                        ? Math.round((count / stats.totalTournaments) * 100)
                        : 0;
                    return (
                      <div key={sport}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-[var(--text-primary)] dark:text-[var(--text-secondary)] capitalize">
                            {sport}
                          </span>
                          <span className="text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                            {count} ({percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-[var(--bg-surface-raised)] rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <p className="text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)] text-center py-8">
                No tournament data available
              </p>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] dark:text-white mb-4">
              Tournaments by Format
            </h3>
            {Object.keys(formatDistribution).length > 0 ? (
              <div className="space-y-3">
                {Object.entries(formatDistribution)
                  .sort(([, a], [, b]) => b - a)
                  .map(([format, count]) => {
                    const percentage =
                      stats.totalTournaments > 0
                        ? Math.round((count / stats.totalTournaments) * 100)
                        : 0;
                    return (
                      <div key={format}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-[var(--text-primary)] dark:text-[var(--text-secondary)] capitalize">
                            {format}
                          </span>
                          <span className="text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                            {count} ({percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-[var(--bg-surface-raised)] rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <p className="text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)] text-center py-8">
                No format data available
              </p>
            )}
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardBody>
          <h3 className="text-lg font-semibold text-[var(--text-primary)] dark:text-white mb-4">
            Tournament Status Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Live
                  </p>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                    {stats.liveTournaments}
                  </p>
                </div>
                <Badge variant="success" pulse={stats.liveTournaments > 0}>
                  Active
                </Badge>
              </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Upcoming
                  </p>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                    {stats.upcomingTournaments}
                  </p>
                </div>
                <Badge variant="info">Scheduled</Badge>
              </div>
            </div>
            <div className="bg-[var(--bg-surface-sunken)] dark:bg-[var(--bg-surface)] rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--text-secondary)] dark:text-[var(--text-tertiary)]">
                    Completed
                  </p>
                  <p className="text-2xl font-bold text-[var(--text-primary)] dark:text-[var(--text-secondary)]">
                    {stats.completedTournaments}
                  </p>
                </div>
                <Badge>Finished</Badge>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
