import { MatchCard } from '@components/sports/MatchCard';
import { Skeleton } from '@components/ui/Skeleton';
import { Tabs } from '@components/ui/Tabs';
import { matchService } from '@services/api/tournament';
import { useQuery } from '@tanstack/react-query';
import type { Match } from '@types-domain/tournament';

import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

const SPORT_FILTERS = [
  { id: 'all', label: 'All Sports' },
  { id: 'cricket', label: 'Cricket' },
  { id: 'football', label: 'Football' },
  { id: 'volleyball', label: 'Volleyball' },
  { id: 'basketball', label: 'Basketball' },
];

export const ScoringPage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');

  const {
    data: matches,
    isLoading,
    error,
  } = useQuery<Match[]>({
    queryKey: ['matches'],
    queryFn: () => matchService.getAll(),
  });

  const filteredMatches =
    matches?.filter((m) => {
      const sport = (m as Match & { sport?: string }).sport ?? 'cricket';
      return activeFilter === 'all' || sport === activeFilter;
    }) ?? [];

  const liveMatches = filteredMatches.filter((m) => m.status === 'live');
  const todayMatches = filteredMatches.filter((m) => m.status === 'scheduled');
  const completedMatches = filteredMatches.filter(
    (m) => m.status === 'completed',
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-64 mt-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Live Scoring
          </h1>
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            Failed to load matches
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Live Scoring
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Score matches in real-time
        </p>
      </div>

      <Tabs
        tabs={SPORT_FILTERS}
        activeTab={activeFilter}
        onChange={setActiveFilter}
        variant="pills"
      />

      {liveMatches.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Live Now
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {liveMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                onClick={() => navigate(`/scoring/${match.id}`)}
              />
            ))}
          </div>
        </div>
      )}

      {todayMatches.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Upcoming
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {todayMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                onClick={() => navigate(`/scoring/${match.id}`)}
              />
            ))}
          </div>
        </div>
      )}

      {completedMatches.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Completed
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                onClick={() => navigate(`/scoring/${match.id}`)}
              />
            ))}
          </div>
        </div>
      )}

      {matches && matches.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            Nothing scheduled yet. Create a tournament and add matches to start
            scoring.
          </p>
        </div>
      )}
    </div>
  );
};
