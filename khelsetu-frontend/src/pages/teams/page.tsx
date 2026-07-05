import { TeamCard } from '@features/teams/components/TeamCard';
import { useTeams } from '@features/teams/hooks/useTeams';
import { Button } from '@shared/components/ui/Button';
import { Card, CardBody } from '@shared/components/ui/Card';
import { Input } from '@shared/components/ui/Input';
import { Skeleton } from '@shared/components/ui/Skeleton';
import { Search, Users, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const TeamsPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const { teams, isLoading, isError, error } = useTeams({ search });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-10 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
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
            Teams
          </h1>
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            Failed to load teams: {error?.message ?? 'Unknown error'}
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
            Teams
          </h1>
          <p className="text-[var(--text-tertiary)] mt-1">
            {teams.length} team{teams.length !== 1 ? 's' : ''} available
          </p>
        </div>
        <Button onClick={() => navigate('/teams/create')}>
          <UserPlus className="w-4 h-4 mr-2" />
          Add Team
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" />
        <Input
          placeholder="Search teams..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {teams.length === 0 ? (
        <Card>
          <CardBody className="p-12 text-center">
            <Users className="w-12 h-12 mx-auto text-[var(--text-tertiary)] mb-4" />
            <p className="text-[var(--text-tertiary)]">
              {search
                ? 'No teams match your search'
                : 'No teams available. Create a tournament to add teams.'}
            </p>
          </CardBody>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teams.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
              onClick={() => navigate(`/teams/${team.id}`)}
              showStats={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};
