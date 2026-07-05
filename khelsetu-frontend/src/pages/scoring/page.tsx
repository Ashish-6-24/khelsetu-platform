import { CreateMatchModal } from '@features/scoring/components/CreateMatchModal';
import { MatchSelector } from '@features/scoring/components/MatchSelector';
import { matchService } from '@features/tournaments/services/tournament';
import { Button } from '@shared/components/ui/Button';
import { Skeleton } from '@shared/components/ui/Skeleton';
import { Tabs } from '@shared/components/ui/Tabs';
import type { Match } from '@shared/types/tournament';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
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
  const [showCreateModal, setShowCreateModal] = useState(false);

  const {
    data: matches,
    isLoading,
    isError,
    error,
  } = useQuery<Match[]>({
    queryKey: ['matches'],
    queryFn: () => matchService.getAll(),
  });

  const filteredMatches =
    matches?.filter((m) => {
      const sport = m.sport ?? 'cricket';
      return activeFilter === 'all' || sport === activeFilter;
    }) ?? [];

  const liveMatches = filteredMatches.filter((m) => m.status === 'live');
  const upcomingMatches = filteredMatches.filter(
    (m) => m.status === 'scheduled',
  );
  const completedMatches = filteredMatches.filter(
    (m) => m.status === 'completed',
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-10 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Live Scoring
          </h1>
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            Failed to load matches: {error?.message ?? 'Unknown error'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Live Scoring
          </h1>
          <p className="mt-1 text-sm text-[var(--text-tertiary)]">
            Select a match to start scoring or create a new one
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Match
        </Button>
      </div>

      <Tabs
        tabs={SPORT_FILTERS}
        activeTab={activeFilter}
        onChange={setActiveFilter}
        variant="pills"
      />

      {liveMatches.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
            Live Now
          </h2>
          <MatchSelector
            matches={liveMatches}
            onSelect={(id) => navigate(`/scoring/${id}`)}
          />
        </div>
      )}

      {upcomingMatches.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
            Upcoming
          </h2>
          <MatchSelector
            matches={upcomingMatches}
            onSelect={(id) => navigate(`/scoring/${id}`)}
          />
        </div>
      )}

      {completedMatches.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
            Completed
          </h2>
          <MatchSelector
            matches={completedMatches}
            onSelect={(id) => navigate(`/scoring/${id}`)}
          />
        </div>
      )}

      {filteredMatches.length === 0 && (matches?.length ?? 0) > 0 && (
        <div className="text-center py-12">
          <p className="text-[var(--text-tertiary)]">
            No {activeFilter !== 'all' ? activeFilter : ''} matches found
          </p>
        </div>
      )}

      {(matches?.length ?? 0) === 0 && (
        <div className="text-center py-12">
          <p className="text-[var(--text-tertiary)]">
            No matches yet. Create a tournament and add matches to start
            scoring.
          </p>
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <CreateMatchModal
            onSubmit={async (data) => {
              await matchService.create({
                tournamentId: '',
                teamAId: data.teamAId,
                teamBId: data.teamBId,
                scheduledAt: data.scheduledAt,
                venue: data.venue,
              });
            }}
            onClose={() => setShowCreateModal(false)}
          />
        </div>
      )}
    </div>
  );
};
