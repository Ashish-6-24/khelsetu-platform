import { PlayerCard } from '@features/teams/components/PlayerCard';
import { playerService } from '@features/teams/services/team';
import { Input } from '@shared/components/ui/Input';
import { Skeleton } from '@shared/components/ui/Skeleton';
import { Tabs } from '@shared/components/ui/Tabs';
import type { Player } from '@shared/types/tournament';
import { useQuery } from '@tanstack/react-query';
import { Search, Users } from 'lucide-react';

import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

const POSITION_FILTERS = [
  { id: 'all', label: 'All Positions' },
  { id: 'batsman', label: 'Batsman' },
  { id: 'bowler', label: 'Bowler' },
  { id: 'all-rounder', label: 'All Rounder' },
  { id: 'wicket-keeper', label: 'Wicket Keeper' },
  { id: 'forward', label: 'Forward' },
  { id: 'midfielder', label: 'Midfielder' },
  { id: 'defender', label: 'Defender' },
  { id: 'goalkeeper', label: 'Goalkeeper' },
];

export const PlayersPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const { data: players, isLoading } = useQuery<Player[]>({
    queryKey: ['players'],
    queryFn: () => playerService.getAll(),
  });

  const filteredPlayers =
    players?.filter((player) => {
      const matchesSearch = player.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesPosition =
        activeFilter === 'all' ||
        player.position?.toLowerCase() === activeFilter;
      return matchesSearch && matchesPosition;
    }) ?? [];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-64 mt-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Players
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {players?.length ?? 0} players registered
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search players by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
      </div>

      <Tabs
        tabs={POSITION_FILTERS}
        activeTab={activeFilter}
        onChange={setActiveFilter}
        variant="pills"
      />

      {filteredPlayers.length === 0 ? (
        <div className="text-center py-12">
          <Users className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-3" />
          <p className="text-lg font-medium text-gray-900 dark:text-white">
            {searchQuery ? 'No matches found' : 'No players yet'}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {searchQuery
              ? 'Try a different search term'
              : "Add players to your teams and they'll show up here"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPlayers.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              onClick={() => navigate(`/players/${player.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
