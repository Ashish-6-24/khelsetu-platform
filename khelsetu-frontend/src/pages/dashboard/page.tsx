import { ActivityFeed } from '@components/dashboard/ActivityFeed';
import type { ActivityItem } from '@components/dashboard/ActivityFeed';
import { LiveMatchesPanel } from '@components/dashboard/LiveMatchesPanel';
import { OnboardingChecklist } from '@components/dashboard/OnboardingChecklist';
import { StatsCard } from '@components/dashboard/StatsCard';
import { Button } from '@components/ui/Button';
import { Skeleton, SkeletonStatsCard } from '@components/ui/Skeleton';
import { matchService, tournamentService } from '@services/api/tournament';
import { useAuthStore } from '@store/authStore';
import { useQuery } from '@tanstack/react-query';
import type { Match, Tournament } from '@types-domain/tournament';
import { ROUTES } from '@utils/constants';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  Calendar,
  Plus,
  Radio,
  Trophy,
  UserPlus,
  Users,
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';

const HOUR = 60 * 60 * 1000;
const FALLBACK_ACTIVITIES: ActivityItem[] = [
  {
    id: '1',
    title: 'Summer Cricket League started',
    description: 'First match scheduled at Dasharath Stadium',
    time: new Date(Date.now() - 2 * HOUR),
    type: 'tournament',
  },
  {
    id: '2',
    title: 'Tournament "Winter Cup" created',
    description: '12 teams registered',
    time: new Date(Date.now() - 5 * HOUR),
    type: 'success',
  },
  {
    id: '3',
    title: 'New player joined',
    description: 'Aarav Sharma joined Team Tigers',
    time: new Date(Date.now() - 26 * HOUR),
    type: 'player',
  },
  {
    id: '4',
    title: 'Live match went viral',
    description: '5,234 concurrent viewers',
    time: new Date(Date.now() - 50 * HOUR),
    type: 'live',
  },
];

export const DashboardPage = () => {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const { data: tournaments, isLoading: loadingTournaments } = useQuery<
    Tournament[]
  >({
    queryKey: ['tournaments'],
    queryFn: () => tournamentService.getAll(),
  });
  const { data: matches, isLoading: loadingMatches } = useQuery<Match[]>({
    queryKey: ['matches'],
    queryFn: () => matchService.getAll(),
  });

  const isLoading = loadingTournaments || loadingMatches;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonStatsCard key={i} />
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <Skeleton className="h-80 lg:col-span-2" variant="rounded" />
          <Skeleton className="h-80" variant="rounded" />
        </div>
      </div>
    );
  }

  const totalTournaments = tournaments?.length ?? 0;
  const liveMatches = matches?.filter((m) => m.status === 'live').length ?? 0;
  const totalTeams =
    tournaments?.reduce((sum, t) => sum + t.currentTeams, 0) ?? 0;
  const totalPlayers =
    tournaments?.reduce((sum, t) => sum + t.currentTeams * 12, 0) ?? 0;
  const upcomingMatches =
    matches?.filter((m) => m.status === 'scheduled').slice(0, 3) ?? [];

  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-gradient-to-br from-[#7F1D1D] via-[#991B1B] to-[#450A0A] p-6 text-white shadow-[var(--shadow-lg)] sm:p-8"
      >
        <div className="pointer-events-none absolute inset-0 -z-0 opacity-30">
          <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-violet-300/30 blur-3xl" />
          <div className="absolute inset-0 grid-pattern opacity-30" />
        </div>
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
              <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
              {liveMatches > 0
                ? `${liveMatches} live match${liveMatches === 1 ? '' : 'es'} right now`
                : 'All systems operational'}
            </div>
            <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Welcome back, {user?.name?.split(' ')[0] || 'champion'}.
            </h1>
            <p className="mt-1.5 max-w-xl text-sm text-blue-100 sm:text-base">
              {liveMatches > 0
                ? 'You have live matches running. Jump into the scoring console now.'
                : 'Here\u2019s a snapshot of your tournaments. Spin up a new event or open the scoring console.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              size="lg"
              variant="secondary"
              leftIcon={<Radio className="h-4 w-4" />}
              onClick={() => navigate(ROUTES.SCORING)}
            >
              {liveMatches > 0 ? 'Resume scoring' : 'Start scoring'}
            </Button>
            <Button
              size="lg"
              variant="glass"
              leftIcon={<Plus className="h-4 w-4" />}
              onClick={() => navigate(ROUTES.TOURNAMENT_CREATE)}
            >
              New tournament
            </Button>
          </div>
        </div>
      </motion.section>

      <OnboardingChecklist
        state={{
          tournament: totalTournaments > 0,
          team: totalTeams > 0,
          scoring: false,
          overlay: false,
        }}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Tournaments"
          value={totalTournaments}
          icon={<Trophy className="h-5 w-5" />}
          accent="blue"
          change={{ value: 12, isPositive: true }}
          delay={0.05}
        />
        <StatsCard
          title="Live Matches"
          value={liveMatches}
          icon={<Radio className="h-5 w-5" />}
          accent="red"
          change={
            liveMatches > 0
              ? { value: 100, isPositive: true }
              : { value: 0, isPositive: false }
          }
          delay={0.1}
        />
        <StatsCard
          title="Total Teams"
          value={totalTeams}
          icon={<Users className="h-5 w-5" />}
          accent="violet"
          change={{ value: 8, isPositive: true }}
          delay={0.15}
        />
        <StatsCard
          title="Total Players"
          value={totalPlayers}
          icon={<UserPlus className="h-5 w-5" />}
          accent="green"
          change={{ value: 24, isPositive: true }}
          delay={0.2}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <UpcomingMatches
            matches={upcomingMatches}
            onSeeAll={() => navigate(ROUTES.SCHEDULE)}
          />
          <ActivityFeed activities={FALLBACK_ACTIVITIES} />
        </div>
        <div className="space-y-6">
          <LiveMatchesPanel
            matches={matches ?? []}
            onMatchClick={(match) => navigate(`/scoring/${match.id}`)}
          />
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

const UpcomingMatches = ({
  matches,
  onSeeAll,
}: {
  matches: Match[];
  onSeeAll: () => void;
}) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-[var(--shadow-sm)]">
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-5 py-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
            <Calendar className="h-4 w-4" size={18} />
          </div>
          <div>
            <h2 className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">
              Upcoming matches
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Next fixtures on your schedule
            </p>
          </div>
        </div>
        <button
          onClick={onSeeAll}
          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          See all
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
      {matches.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
            <Calendar className="h-5 w-5" />
          </div>
          <p className="mt-3 text-sm font-medium text-slate-900 dark:text-white">
            No upcoming matches
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Schedule matches from your tournament
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-[var(--border-subtle)]">
          {matches.map((m) => (
            <li
              key={m.id}
              className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-slate-50/70 sm:px-6 dark:hover:bg-slate-800/40"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#7F1D1D] to-[#991B1B] text-sm font-semibold text-white">
                VS
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                  {m.teamA.name} <span className="text-slate-400">vs</span>{' '}
                  {m.teamB.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {new Date(m.scheduledAt).toLocaleString(undefined, {
                    weekday: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <Button size="sm" variant="outline">
                Open
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const QuickActions = () => {
  const navigate = useNavigate();
  const actions = [
    { label: 'New tournament', icon: Trophy, to: ROUTES.TOURNAMENT_CREATE },
    { label: 'Add team', icon: Users, to: ROUTES.TEAMS },
    { label: 'Open analytics', icon: BarChart3, to: ROUTES.ANALYTICS },
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-[var(--shadow-sm)]">
      <div className="border-b border-[var(--border-subtle)] px-5 py-4 sm:px-6">
        <h2 className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">
          Quick actions
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Get things done faster
        </p>
      </div>
      <div className="p-2">
        {actions.map((a) => (
          <button
            key={a.label}
            onClick={() => navigate(a.to)}
            className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors group-hover:bg-blue-500/10 group-hover:text-blue-600 dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-blue-500/15 dark:group-hover:text-blue-400">
              <a.icon className="h-4 w-4" />
            </div>
            <span className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-200">
              {a.label}
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-600 dark:group-hover:text-slate-200" />
          </button>
        ))}
      </div>
    </div>
  );
};
