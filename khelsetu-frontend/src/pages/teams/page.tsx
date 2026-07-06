import { TeamCard } from '@features/teams/components/TeamCard';
import { useTeams } from '@features/teams/hooks/useTeams';
import { Button } from '@shared/components/ui/Button';
import { Card, CardBody } from '@shared/components/ui/Card';
import { Input } from '@shared/components/ui/Input';
import { Skeleton } from '@shared/components/ui/Skeleton';
import { useReducedMotion } from '@shared/hooks/useReducedMotion';
import { motion } from 'framer-motion';
import { Search, UserPlus, Users } from 'lucide-react';

import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

export const TeamsPage = () => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const [search, setSearch] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const { teams, isLoading, isError, error } = useTeams({ search });

  if (isLoading) {
    return (
      <div
        className="space-y-6"
        aria-busy="true"
        aria-live="polite"
        aria-label="Loading teams"
      >
        <Skeleton className="h-8 w-40" aria-hidden="true" />
        <Skeleton className="h-10 w-full" aria-hidden="true" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
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
            Teams
          </h1>
          <div
            role="alert"
            className="mt-1 text-sm text-red-600 dark:text-red-400"
          >
            Failed to load teams: {error?.message ?? 'Unknown error'}
          </div>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' as const },
    },
  } as const;

  const listVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05 } },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25, ease: 'easeOut' as const },
    },
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
            Teams
          </h1>
          <p className="text-[var(--text-tertiary)] mt-1">
            {teams.length} team{teams.length !== 1 ? 's' : ''} available
          </p>
        </div>
        <Button
          variant="create"
          leftIcon={<UserPlus className="h-4 w-4" />}
          onClick={() => navigate('/teams/create')}
        >
          Add Team
        </Button>
      </div>

      <div className="relative">
        <motion.div
          animate={searchFocused ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute left-3 top-1/2 -translate-y-1/2"
        >
          <Search
            className="w-4 h-4 text-[var(--text-tertiary)]"
            aria-hidden="true"
          />
        </motion.div>
        <Input
          placeholder="Search teams..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          className="pl-10"
        />
      </div>

      {teams.length === 0 ? (
        <Card>
          <CardBody className="p-12 text-center">
            <Users
              className="w-12 h-12 mx-auto text-[var(--text-tertiary)] mb-4"
              aria-hidden="true"
            />
            <p className="text-[var(--text-tertiary)]">
              {search
                ? 'No teams match your search'
                : 'No teams available. Create a tournament to add teams.'}
            </p>
          </CardBody>
        </Card>
      ) : (
        <motion.div
          variants={prefersReducedMotion ? undefined : listVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {teams.map((team) => (
            <motion.div
              key={team.id}
              variants={prefersReducedMotion ? undefined : itemVariants}
            >
              <TeamCard
                team={team}
                onClick={() => navigate(`/teams/${team.id}`)}
                showStats={false}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};
