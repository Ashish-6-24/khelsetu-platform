import { matchService } from '@features/tournaments/services/tournament';
import { Badge } from '@shared/components/ui/Badge';
import { Card, CardBody } from '@shared/components/ui/Card';
import { Skeleton } from '@shared/components/ui/Skeleton';
import { Tabs } from '@shared/components/ui/Tabs';
import { useReducedMotion } from '@shared/hooks/useReducedMotion';
import type { Match } from '@shared/types/tournament';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Calendar, Clock, Filter, MapPin, Play, Trophy } from 'lucide-react';

import { useMemo, useState } from 'react';

import { useNavigate } from 'react-router-dom';

const STATUS_TABS = [
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'live', label: 'Live Now' },
  { id: 'completed', label: 'Completed' },
];

const SPORT_FILTERS = [
  { id: 'all', label: 'All Sports' },
  { id: 'cricket', label: 'Cricket' },
  { id: 'football', label: 'Football' },
  { id: 'volleyball', label: 'Volleyball' },
  { id: 'basketball', label: 'Basketball' },
];

export const SchedulePage = () => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const [activeStatus, setActiveStatus] = useState('upcoming');
  const [activeSport, setActiveSport] = useState('all');

  const {
    data: matches = [],
    isLoading,
    isError,
    error,
  } = useQuery<Match[]>({
    queryKey: ['matches'],
    queryFn: () => matchService.getAll(),
  });

  const filteredMatches = useMemo(() => {
    return matches.filter((m) => {
      const sport = m.sport ?? 'cricket';
      const matchesSport = activeSport === 'all' || sport === activeSport;

      if (activeStatus === 'live') return m.status === 'live' && matchesSport;
      if (activeStatus === 'completed')
        return m.status === 'completed' && matchesSport;
      return m.status === 'scheduled' && matchesSport;
    });
  }, [matches, activeStatus, activeSport]);

  const liveCount = useMemo(
    () => matches.filter((m) => m.status === 'live').length,
    [matches],
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Schedule
          </h1>
          <div
            role="alert"
            className="mt-1 text-sm text-red-600 dark:text-red-400"
          >
            Failed to load matches: {error?.message ?? 'Unknown error'}
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        className="space-y-6"
        aria-busy="true"
        aria-live="polite"
        aria-label="Loading schedule"
      >
        <Skeleton className="h-8 w-40" aria-hidden="true" />
        <Skeleton className="h-10 w-full" aria-hidden="true" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32" aria-hidden="true" />
          ))}
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
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Schedule
        </h1>
        <p className="text-[var(--text-tertiary)] mt-1">
          Match calendar and upcoming fixtures
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <Tabs
            tabs={STATUS_TABS}
            activeTab={activeStatus}
            onChange={setActiveStatus}
            variant="pills"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[var(--text-tertiary)] shrink-0" />
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <Tabs
              tabs={SPORT_FILTERS}
              activeTab={activeSport}
              onChange={setActiveSport}
              variant="pills"
            />
          </div>
        </div>
      </div>

      {liveCount > 0 && activeStatus !== 'live' && (
        <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
          <CardBody className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="font-medium text-red-700 dark:text-red-400">
                {liveCount} match{liveCount > 1 ? 'es' : ''} live now
              </span>
              <button
                onClick={() => setActiveStatus('live')}
                className="text-sm text-red-600 dark:text-red-400 underline"
              >
                View all
              </button>
            </div>
          </CardBody>
        </Card>
      )}

      {filteredMatches.length === 0 ? (
        <Card>
          <CardBody className="p-12 text-center">
            <Calendar
              className="w-12 h-12 mx-auto text-[var(--text-tertiary)] mb-4"
              aria-hidden="true"
            />
            <p className="text-[var(--text-tertiary)]">
              No {activeStatus} matches{' '}
              {activeSport !== 'all' ? `for ${activeSport}` : ''}
            </p>
          </CardBody>
        </Card>
      ) : (
        <motion.div
          variants={prefersReducedMotion ? undefined : listVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          {filteredMatches.map((match) => (
            <motion.div
              key={match.id}
              variants={prefersReducedMotion ? undefined : itemVariants}
            >
              <button
                type="button"
                className="w-full text-left cursor-pointer hover:shadow-md transition-shadow rounded-lg"
                onClick={() => navigate(`/scoring/${match.id}`)}
              >
                <Card>
                  <CardBody className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-[var(--text-primary)] truncate">
                            {match.teamA?.name ?? 'TBD'}
                          </span>
                          <span className="text-[var(--text-tertiary)] text-sm shrink-0">
                            vs
                          </span>
                          <span className="font-semibold text-[var(--text-primary)] truncate">
                            {match.teamB?.name ?? 'TBD'}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 text-sm text-[var(--text-tertiary)]">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" aria-hidden="true" />
                            {formatDate(match.scheduledAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" aria-hidden="true" />
                            {formatTime(match.scheduledAt)}
                          </span>
                          {match.venue && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" aria-hidden="true" />
                              {match.venue}
                            </span>
                          )}
                        </div>

                        {match.score && (
                          <div className="mt-2 text-sm font-medium text-[var(--text-primary)]">
                            {match.teamA?.name}: {match.score.teamAScore} ·{' '}
                            {match.teamB?.name}: {match.score.teamBScore}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {match.status === 'live' && (
                          <Badge variant="error" className="animate-pulse">
                            <Play className="w-3 h-3 mr-1" />
                            LIVE
                          </Badge>
                        )}
                        {match.status === 'completed' && match.winner && (
                          <Badge variant="success">
                            <Trophy className="w-3 h-3 mr-1" />
                            {match.winner.name}
                          </Badge>
                        )}
                        {match.status === 'scheduled' && (
                          <Badge variant="default">Scheduled</Badge>
                        )}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};
