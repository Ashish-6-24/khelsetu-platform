import { playerService } from '@features/players/services/playerService';
import { PlayerCard } from '@features/teams/components/PlayerCard';
import { TeamCard } from '@features/teams/components/TeamCard';
import { teamService } from '@features/teams/services/team';
import type { Player, Team } from '@shared/types/tournament';
import { Badge } from '@shared/ui/Badge';
import { Button } from '@shared/ui/Button';
import { Input } from '@shared/ui/Input';
import { Modal } from '@shared/ui/Modal';
import { Skeleton } from '@shared/ui/Skeleton';
import { Tabs } from '@shared/ui/Tabs';
import { useToast } from '@shared/ui/toast-context';
import { ROUTES } from '@shared/utils/constants';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Plus } from 'lucide-react';

import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

const TABS = [
  { id: 'roster', label: 'Roster' },
  { id: 'stats', label: 'Statistics' },
  { id: 'matches', label: 'Matches' },
];

export const TeamDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('roster');
  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerJersey, setNewPlayerJersey] = useState('');
  const [newPlayerPosition, setNewPlayerPosition] = useState('');

  const { data: team, isLoading: loadingTeam } = useQuery<Team | null>({
    queryKey: ['team', id],
    queryFn: () => teamService.getById(id!),
    enabled: !!id,
  });

  const { data: players = [], isLoading: loadingPlayers } = useQuery<Player[]>({
    queryKey: ['team-players', id],
    queryFn: () => playerService.getByTeam(id!),
    enabled: !!id,
  });

  const addPlayer = useMutation({
    mutationFn: (data: {
      name: string;
      jerseyNumber?: number;
      position?: string;
    }) =>
      playerService.create({
        name: data.name,
        teamId: id!,
        jerseyNumber: data.jerseyNumber,
        position: data.position,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-players', id] });
      setShowAddPlayerModal(false);
      setNewPlayerName('');
      setNewPlayerJersey('');
      setNewPlayerPosition('');
    },
    onError: () => {
      addToast({ type: 'error', message: 'Failed to add player' });
    },
  });

  const removePlayer = useMutation({
    mutationFn: (playerId: string) => playerService.delete(playerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-players', id] });
    },
    onError: () => {
      addToast({ type: 'error', message: 'Failed to remove player' });
    },
  });

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPlayerName.trim()) {
      addPlayer.mutate({
        name: newPlayerName.trim(),
        jerseyNumber: newPlayerJersey
          ? parseInt(newPlayerJersey, 10)
          : undefined,
        position: newPlayerPosition || undefined,
      });
    }
  };

  if (loadingTeam) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
        <Skeleton className="h-48" />
      </div>
    );
  }

  if (!team) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] dark:text-white">
          Team Not Found
        </h1>
        <p className="text-[var(--text-secondary)] dark:text-[var(--text-tertiary)]">
          The team you are looking for does not exist.
        </p>
      </div>
    );
  }

  const roster = players ?? team.players;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => {
              if (window.history.length > 1) {
                navigate(-1);
              } else {
                navigate(ROUTES.TEAMS);
              }
            }}
            aria-label="Go back to teams"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)] dark:text-white">
              {team.name}
            </h1>
            <p className="mt-1 text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
              <Badge variant="info">{team.shortName}</Badge>
              {roster.length} players
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant="create"
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() => setShowAddPlayerModal(true)}
          >
            Add Player
          </Button>
        </div>
      </div>

      <TeamCard team={team} showStats={false} />

      <Tabs
        tabs={TABS}
        activeTab={activeTab}
        onChange={setActiveTab}
        variant="pills"
      />

      {activeTab === 'roster' && (
        <div>
          {loadingPlayers ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
          ) : roster.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {roster.map((player) => (
                <div key={player.id} className="relative group">
                  <PlayerCard player={player} />
                  <button
                    onClick={() => removePlayer.mutate(player.id)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-500 dark:bg-red-400 text-white rounded-full text-xs hover:bg-red-600 dark:hover:bg-red-300"
                    title="Remove player"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                No players on the roster yet. Add some to build your squad.
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] rounded-xl border border-[var(--border-subtle)] dark:border-[var(--border-subtle)]">
            <p className="text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
              Matches Played
            </p>
            <p className="text-3xl font-bold text-[var(--text-primary)] dark:text-white mt-2">
              {team.stats.played}
            </p>
          </div>
          <div className="p-4 bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] rounded-xl border border-[var(--border-subtle)] dark:border-[var(--border-subtle)]">
            <p className="text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
              Won
            </p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
              {team.stats.won}
            </p>
          </div>
          <div className="p-4 bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] rounded-xl border border-[var(--border-subtle)] dark:border-[var(--border-subtle)]">
            <p className="text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
              Lost
            </p>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">
              {team.stats.lost}
            </p>
          </div>
          <div className="p-4 bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] rounded-xl border border-[var(--border-subtle)] dark:border-[var(--border-subtle)]">
            <p className="text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
              Points
            </p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
              {team.stats.points}
            </p>
          </div>
        </div>
      )}

      {activeTab === 'matches' && (
        <div className="text-center py-12">
          <p className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
            Match history will be available once the team has played matches.
          </p>
        </div>
      )}

      <Modal
        isOpen={showAddPlayerModal}
        onClose={() => setShowAddPlayerModal(false)}
        title="Add Player"
      >
        <form onSubmit={handleAddPlayer} className="space-y-4">
          <Input
            label="Player Name"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            placeholder="e.g., Sandeep Lamichhane"
            required
          />
          <Input
            label="Jersey Number"
            type="number"
            value={newPlayerJersey}
            onChange={(e) => setNewPlayerJersey(e.target.value)}
            placeholder="e.g., 7"
          />
          <Input
            label="Position"
            value={newPlayerPosition}
            onChange={(e) => setNewPlayerPosition(e.target.value)}
            placeholder="e.g., Bowler"
          />
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setShowAddPlayerModal(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="create"
              className="flex-1"
              isLoading={addPlayer.isPending}
            >
              Add Player
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
