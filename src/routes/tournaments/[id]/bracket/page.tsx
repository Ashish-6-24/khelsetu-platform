import { AdvancedBracketView } from '@features/brackets';
import { FixtureTable } from '@features/tournaments/components';
import { tournamentService } from '@features/tournaments/services/tournament';
import type { Match, Tournament } from '@shared/types/tournament';
import { Badge } from '@shared/ui/Badge';
import { Button } from '@shared/ui/Button';
import { Card, CardBody } from '@shared/ui/Card';
import { ErrorState } from '@shared/ui/ErrorState';
import { Skeleton } from '@shared/ui/Skeleton';
import { Tabs } from '@shared/ui/Tabs';
import { ROUTES } from '@shared/utils/constants';
import { useQuery } from '@tanstack/react-query';

import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

const TABS = [
  { id: 'bracket', label: 'Bracket' },
  { id: 'fixtures', label: 'Fixtures' },
];

export const TournamentBracketPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bracket');

  const {
    data: tournament,
    isLoading: loadingTournament,
    error: tournamentError,
  } = useQuery<Tournament | null>({
    queryKey: ['tournament', id],
    queryFn: () => tournamentService.getById(id!),
    enabled: !!id,
  });

  const { data: matches = [], isLoading: loadingMatches } = useQuery<Match[]>({
    queryKey: ['tournament-matches', id],
    queryFn: () => tournamentService.getMatches(id!),
    enabled: !!id,
  });

  if (loadingTournament || loadingMatches) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (tournamentError) {
    return (
      <ErrorState
        title="Failed to load tournament"
        message="Could not fetch tournament data. Please try again."
        onRetry={() => window.location.reload()}
      />
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
            <Badge variant={tournament.status === 'live' ? 'success' : 'info'}>
              {tournament.status}
            </Badge>
            {' · '}
            {tournament.format}
            {' · '}
            {matches?.length ?? 0} matches
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            if (window.history.length > 1) {
              navigate(-1);
            } else {
              navigate(ROUTES.TOURNAMENTS);
            }
          }}
          aria-label="Go back to tournament"
        >
          Back
        </Button>
      </div>

      <Tabs
        tabs={TABS}
        activeTab={activeTab}
        onChange={setActiveTab}
        variant="pills"
      />

      {activeTab === 'bracket' && (
        <AdvancedBracketView
          matches={matches ?? []}
          format={
            tournament.format === 'league'
              ? 'round-robin'
              : tournament.format === 'knockout'
                ? 'single-elimination'
                : (tournament.format as
                    | 'single-elimination'
                    | 'double-elimination'
                    | 'knockout'
                    | 'round-robin'
                    | 'group-to-knockout')
          }
          tournamentName={tournament.name}
        />
      )}

      {activeTab === 'fixtures' && <FixtureTable matches={matches ?? []} />}

      {matches && matches.length === 0 && (
        <Card>
          <CardBody>
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                No matches have been scheduled yet.
              </p>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};
