import { TeamCard } from '@features/teams/components/TeamCard';
import { teamService } from '@features/teams/services/team';
import { Button } from '@shared/components/ui/Button';
import { Input } from '@shared/components/ui/Input';
import { Modal } from '@shared/components/ui/Modal';
import { Skeleton } from '@shared/components/ui/Skeleton';
import { Tabs } from '@shared/components/ui/Tabs';
import type { Team } from '@shared/types/tournament';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';

import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

const TABS = [
  { id: 'all', label: 'All Teams' },
  { id: 'active', label: 'Active' },
  { id: 'archived', label: 'Archived' },
];

export const TeamsPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamShortName, setNewTeamShortName] = useState('');

  const { data: teams, isLoading } = useQuery<Team[]>({
    queryKey: ['teams'],
    queryFn: () => teamService.getAll(),
  });

  const createTeam = useMutation({
    mutationFn: (data: { name: string; shortName: string }) =>
      teamService.create({
        name: data.name,
        shortName: data.shortName,
        tournamentId: '',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      setShowCreateModal(false);
      setNewTeamName('');
      setNewTeamShortName('');
    },
  });

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTeamName.trim() && newTeamShortName.trim()) {
      createTeam.mutate({
        name: newTeamName.trim(),
        shortName: newTeamShortName.trim().toUpperCase(),
      });
    }
  };

  const filteredTeams = teams?.filter((team) => {
    if (activeTab === 'active') return team.stats.played > 0;
    if (activeTab === 'archived') return team.stats.played === 0;
    return true;
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-48 mt-2" />
          </div>
          <Skeleton className="h-10 w-36" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-48" />
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
            Teams
          </h1>
          <p className="mt-1 text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
            Manage teams and player rosters
          </p>
        </div>
        <Button
          variant="create"
          leftIcon={<Plus className="h-4 w-4" />}
          onClick={() => setShowCreateModal(true)}
        >
          Create Team
        </Button>
      </div>

      <Tabs
        tabs={TABS}
        activeTab={activeTab}
        onChange={setActiveTab}
        variant="pills"
      />

      {filteredTeams && filteredTeams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTeams.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
              onClick={() => navigate(`/teams/${team.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
            No teams yet. Build your first squad and get playing.
          </p>
        </div>
      )}

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Team"
      >
        <form onSubmit={handleCreateTeam} className="space-y-4">
          <Input
            label="Team Name"
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
            placeholder="e.g., Nepal National Team"
            required
          />
          <Input
            label="Short Name"
            value={newTeamShortName}
            onChange={(e) => setNewTeamShortName(e.target.value)}
            placeholder="e.g., NEP"
            required
          />
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setShowCreateModal(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="create"
              className="flex-1"
              isLoading={createTeam.isPending}
            >
              Create Team
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
