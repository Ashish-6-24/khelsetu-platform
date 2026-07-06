import { usePlayers } from '@features/players/hooks/usePlayers';
import { useTeams } from '@features/teams/hooks/useTeams';
import { PlayerCard } from '@features/teams/components/PlayerCard';
import { useReducedMotion } from '@shared/hooks/useReducedMotion';
import { Button } from '@shared/components/ui/Button';
import { Card, CardBody, CardHeader } from '@shared/components/ui/Card';
import { Input } from '@shared/components/ui/Input';
import { Select } from '@shared/components/ui/Select';
import { Skeleton } from '@shared/components/ui/Skeleton';
import { Tabs } from '@shared/components/ui/Tabs';
import { motion } from 'framer-motion';
import { Search, UserPlus } from 'lucide-react';
import { useState } from 'react';

// Position values must match backend enum — cricket (batsman, bowler, all-rounder, wicketkeeper) and football (goalkeeper, defender, midfielder, forward)
const POSITION_TABS = [
  { id: 'all', label: 'All' },
  { id: 'batsman', label: 'Batsman' },
  { id: 'bowler', label: 'Bowler' },
  { id: 'all-rounder', label: 'All-rounder' },
  { id: 'wicketkeeper', label: 'Wicketkeeper' },
  { id: 'goalkeeper', label: 'Goalkeeper' },
  { id: 'defender', label: 'Defender' },
  { id: 'midfielder', label: 'Midfielder' },
  { id: 'forward', label: 'Forward' },
];

const POSITION_OPTIONS = POSITION_TABS.filter((t) => t.id !== 'all').map(
  (t) => ({ value: t.id, label: t.label })
);

export const PlayersPage = () => {
  const prefersReducedMotion = useReducedMotion();
  const [search, setSearch] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [position, setPosition] = useState('all');
  const [showRegistration, setShowRegistration] = useState(false);
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    jerseyNumber: '',
    position: '',
    teamId: '',
  });

  const {
    players,
    isLoading,
    isError,
    error,
    createPlayer,
    isCreating,
  } = usePlayers({
    search,
    position,
  });

  const { teams, isLoading: teamsLoading } = useTeams();

  const isFormValid = newPlayer.name.trim() !== '' && newPlayer.teamId !== '';

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    await createPlayer({
      name: newPlayer.name,
      jerseyNumber: newPlayer.jerseyNumber
        ? Number(newPlayer.jerseyNumber)
        : undefined,
      position: newPlayer.position || undefined,
      teamId: newPlayer.teamId,
    });
    setNewPlayer({ name: '', jerseyNumber: '', position: '', teamId: '' });
    setShowRegistration(false);
  };

  if (isLoading) {
    return (
      <div className="space-y-6" aria-busy="true" aria-live="polite" aria-label="Loading players">
        <Skeleton className="h-8 w-40" aria-hidden="true" />
        <Skeleton className="h-10 w-full" aria-hidden="true" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48" aria-hidden="true" />
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
            Players
          </h1>
          <div role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">
            Failed to load players: {error?.message ?? 'Unknown error'}
          </div>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
  } as const;

  const listVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05 } },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' as const } },
  } as const;

  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Players
          </h1>
          <p className="text-[var(--text-tertiary)] mt-1">
            {players.length} player{players.length !== 1 ? 's' : ''} registered
          </p>
        </div>
        <Button variant="create" leftIcon={<UserPlus className="h-4 w-4" />} onClick={() => setShowRegistration(true)}>
          Register Player
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <motion.div
            animate={searchFocused ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute left-3 top-1/2 -translate-y-1/2"
          >
            <Search className="w-4 h-4 text-[var(--text-tertiary)]" aria-hidden="true" />
          </motion.div>
          <Input
            placeholder="Search players..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="pl-10"
          />
        </div>
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <Tabs
            tabs={POSITION_TABS}
            activeTab={position}
            onChange={setPosition}
            variant="pills"
          />
        </div>
      </div>

      {showRegistration && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">
              Register New Player
            </h3>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Input
                  label="Player Name"
                  value={newPlayer.name}
                  onChange={(e) =>
                    setNewPlayer((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                />
                <Input
                  label="Jersey Number"
                  type="number"
                  value={newPlayer.jerseyNumber}
                  onChange={(e) =>
                    setNewPlayer((prev) => ({
                      ...prev,
                      jerseyNumber: e.target.value,
                    }))
                  }
                />
                <Select
                  label="Position"
                  value={newPlayer.position}
                  onChange={(value) =>
                    setNewPlayer((prev) => ({
                      ...prev,
                      position: value,
                    }))
                  }
                  options={POSITION_OPTIONS}
                />
                <Select
                  label="Team"
                  value={newPlayer.teamId}
                  onChange={(value) =>
                    setNewPlayer((prev) => ({
                      ...prev,
                      teamId: value,
                    }))
                  }
                  options={teams.map((t) => ({ value: t.id, label: t.name }))}
                  placeholder="Select a team"
                  required
                />
              </div>
              <div className="flex gap-3">
                <Button type="submit" variant="create" disabled={isCreating || teamsLoading || !isFormValid}>
                  {isCreating ? 'Registering...' : 'Register Player'}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowRegistration(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}

      {players.length === 0 ? (
        <Card>
          <CardBody className="p-12 text-center">
            <UserPlus className="w-12 h-12 mx-auto text-[var(--text-tertiary)] mb-4" aria-hidden="true" />
            <p className="text-[var(--text-tertiary)]">
              {search
                ? 'No players match your search'
                : 'No players registered yet'}
            </p>
          </CardBody>
        </Card>
      ) : (
        <motion.div
          variants={prefersReducedMotion ? undefined : listVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {players.map((player) => (
            <motion.div key={player.id} variants={prefersReducedMotion ? undefined : itemVariants}>
              <PlayerCard player={player} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};