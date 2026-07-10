import { ActivityFeed } from '@features/dashboard/components/ActivityFeed';
import type { ActivityItem } from '@features/dashboard/components/ActivityFeed';
import { LiveMatchesPanel } from '@features/dashboard/components/LiveMatchesPanel';
import { OnboardingChecklist } from '@features/dashboard/components/OnboardingChecklist';
import { matchService, tournamentService } from '@shared/api/tournaments';
import type { Match, Tournament } from '@shared/types/tournament';
import { Badge } from '@shared/ui/Badge';
import { Button } from '@shared/ui/Button';
import { ErrorState } from '@shared/ui/ErrorState';
import { Skeleton, SkeletonStatsCard } from '@shared/ui/Skeleton';
import { ROUTES } from '@shared/utils/constants';
import { getGreeting } from '@shared/utils/date';
import { useAuthStore } from '@state/authStore';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowRight,
  BarChart3,
  Calendar,
  ChevronRight,
  Plus,
  Radio,
  Trophy,
  UserPlus,
  Users,
} from 'lucide-react';

import { Suspense, useMemo } from 'react';

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
  const {
    data: tournaments = [],
    isLoading: loadingTournaments,
    error: tournamentsError,
    refetch: refetchTournaments,
  } = useQuery<Tournament[]>({
    queryKey: ['tournaments'],
    queryFn: () => tournamentService.getAll(),
    staleTime: 2 * 60 * 1000,
  });
  const {
    data: matches = [],
    isLoading: loadingMatches,
    error: matchesError,
    refetch: refetchMatches,
  } = useQuery<Match[]>({
    queryKey: ['matches'],
    queryFn: () => matchService.getAll(),
    staleTime: 2 * 60 * 1000,
  });

  const isLoading = loadingTournaments || loadingMatches;
  const isError = tournamentsError || matchesError;
  const handleRetry = () => {
    refetchTournaments();
    refetchMatches();
  };

  const totalTournaments = useMemo(
    () => tournaments?.length ?? 0,
    [tournaments],
  );
  const liveMatches = useMemo(
    () => matches?.filter((m) => m.status === 'live').length ?? 0,
    [matches],
  );
  const totalTeams = useMemo(
    () => tournaments?.reduce((sum, t) => sum + t.currentTeams, 0) ?? 0,
    [tournaments],
  );
  const totalPlayers = useMemo(
    () => tournaments?.reduce((sum, t) => sum + t.currentTeams * 12, 0) ?? 0,
    [tournaments],
  );
  const upcomingMatches = useMemo(
    () => matches?.filter((m) => m.status === 'scheduled').slice(0, 3) ?? [],
    [matches],
  );

  const matchSuffix = liveMatches === 1 ? '' : 'es';
  const liveMatchText =
    liveMatches > 0
      ? `${liveMatches} live match${matchSuffix} right now`
      : 'All systems operational';

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

  if (isError) {
    return (
      <ErrorState
        title="Failed to load dashboard"
        message="Could not fetch tournaments or matches."
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div className="relative space-y-8">
      {/* ── Hero Welcome ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-gradient-to-br from-[var(--brand-primary)] via-[var(--brand-primary-hover)] to-[var(--brand-primary-active)] p-6 text-white shadow-[var(--shadow-xl)] sm:p-8 animate-fade-in-up dark:from-[#6b1515] dark:via-[#8b1c1c] dark:to-[#521010]">
        {/* Decorative orbs */}
        <div className="pointer-events-none absolute inset-0 -z-0">
          <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-[var(--brand-accent)]/15 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-2xl" />
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-md">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
              {liveMatchText}
            </div>
            <h1 className="mt-4 font-display text-2xl font-bold -tracking-[0.01em] text-white sm:text-3xl lg:text-4xl">
              {getGreeting()}, {user?.name?.split(' ')[0] || 'champion'}.
            </h1>
            <p className="mt-2 max-w-xl text-sm font-medium text-white/90 sm:text-base">
              {liveMatches > 0
                ? 'Your matches are live. Jump in and keep the action going.'
                : 'Here\u2019s what\u2019s happening with your tournaments. Ready to start something new?'}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              variant="primary"
              leftIcon={<Radio className="h-4 w-4" />}
              onClick={() => navigate(ROUTES.SCORING)}
              className="shadow-lg shadow-red-900/30"
            >
              {liveMatches > 0 ? 'Resume scoring' : 'Start scoring'}
            </Button>
            <Button
              size="lg"
              variant="glass"
              leftIcon={<Plus className="h-4 w-4" />}
              onClick={() => navigate(ROUTES.TOURNAMENT_CREATE)}
              className="border-white/20 text-white hover:bg-white/20"
            >
              New tournament
            </Button>
          </div>
        </div>
      </section>

      {/* ── Onboarding ───────────────────────────────────────────── */}
      <Suspense fallback={<Skeleton className="h-24" variant="rounded" />}>
        <OnboardingChecklist
          state={{
            tournament: totalTournaments > 0,
            team: totalTeams > 0,
            scoring: false,
            overlay: false,
          }}
        />
      </Suspense>

      {/* ── Key Metrics ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Tournaments"
          value={totalTournaments}
          icon={<Trophy className="h-5 w-5" />}
          accentColor="var(--brand-primary)"
          change={{ value: 12, isPositive: true }}
          delay={0}
        />
        <MetricCard
          title="Live Matches"
          value={liveMatches}
          icon={<Radio className="h-5 w-5" />}
          accentColor="var(--color-live)"
          change={
            liveMatches > 0
              ? { value: 100, isPositive: true }
              : { value: 0, isPositive: false }
          }
          delay={1}
        />
        <MetricCard
          title="Total Teams"
          value={totalTeams}
          icon={<Users className="h-5 w-5" />}
          accentColor="var(--color-info)"
          change={{ value: 8, isPositive: true }}
          delay={2}
        />
        <MetricCard
          title="Total Players"
          value={totalPlayers}
          icon={<UserPlus className="h-5 w-5" />}
          accentColor="var(--color-success)"
          change={{ value: 24, isPositive: true }}
          delay={3}
        />
      </div>

      {/* ── Live Matches (horizontal scroll) ─────────────────────── */}
      {liveMatches > 0 && (
        <section
          className="animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2.5 text-lg font-semibold text-[var(--text-primary)]">
              <span className="relative inline-flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-live)]" />
              </span>
              Live now
            </h2>
            <button
              onClick={() => navigate(ROUTES.SCORING)}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-[var(--text-link)] transition-all duration-200 hover:bg-[var(--brand-primary)]/8 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-canvas)]"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 snap-x scrollbar-hide">
            {(matches ?? [])
              .filter((m) => m.status === 'live')
              .map((match, idx) => {
                const inningsA = match.score?.teamAInnings?.[0];
                const inningsB = match.score?.teamBInnings?.[0];
                const scoreA = match.score?.teamAScore ?? 0;
                const scoreB = match.score?.teamBScore ?? 0;
                const maxScore = Math.max(scoreA, scoreB, 1);
                const progressA = (scoreA / maxScore) * 100;
                const progressB = (scoreB / maxScore) * 100;

                const formatScore = (
                  innings?: typeof inningsA,
                  total?: number,
                ) => {
                  if (innings) {
                    return `${innings.runs}/${innings.wickets}`;
                  }
                  return total?.toString() ?? '0';
                };

                const formatOvers = (innings?: typeof inningsA) => {
                  if (!innings) return '';
                  return `${innings.overs} ov`;
                };

                return (
                  <button
                    key={match.id}
                    aria-label={`${match.teamA.name} vs ${match.teamB.name} - live match`}
                    onClick={() => navigate(`/scoring/${match.id}`)}
                    className="live-card group relative flex-shrink-0 w-72 snap-start overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 shadow-[var(--shadow-sm)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-canvas)]"
                    style={{ animationDelay: `${idx * 150}ms` }}
                  >
                    {/* Animated top border */}
                    <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl live-card-border" />
                    <div className="mb-4 flex items-center justify-between">
                      <Badge variant="live" pulse size="sm">
                        LIVE
                      </Badge>
                      <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-tertiary)]">
                        Match {idx + 1}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="truncate text-sm font-medium text-[var(--text-primary)]">
                          {match.teamA.name}
                        </span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="score-update score-flash tabular-nums text-base font-bold text-[var(--text-primary)]">
                            {formatScore(inningsA, scoreA)}
                          </span>
                          {inningsA && (
                            <span className="text-[10px] tabular-nums text-[var(--text-tertiary)]">
                              {formatOvers(inningsA)}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-[var(--bg-surface-sunken)]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-accent)] transition-all duration-1000 ease-out dark:from-[#8b1c1c] dark:to-[#92710a]"
                          style={{ width: `${progressA}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="truncate text-sm font-medium text-[var(--text-primary)]">
                          {match.teamB.name}
                        </span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="score-update score-flash tabular-nums text-base font-bold text-[var(--text-primary)]">
                            {formatScore(inningsB, scoreB)}
                          </span>
                          {inningsB && (
                            <span className="text-[10px] tabular-nums text-[var(--text-tertiary)]">
                              {formatOvers(inningsB)}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-[var(--bg-surface-sunken)]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[var(--brand-accent)] to-[var(--brand-primary)] transition-all duration-1000 ease-out dark:from-[#92710a] dark:to-[#8b1c1c]"
                          style={{ width: `${progressB}%` }}
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-end gap-1 text-xs font-semibold text-[var(--text-link)]">
                      Open scoring
                      <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </button>
                );
              })}
          </div>
        </section>
      )}

      {/* ── Main Content Grid ────────────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Suspense
            fallback={
              <div className="h-80 rounded-2xl bg-[var(--bg-surface)] animate-pulse" />
            }
          >
            <UpcomingMatches
              matches={upcomingMatches}
              onSeeAll={() => navigate(ROUTES.SCHEDULE)}
            />
          </Suspense>
          <Suspense
            fallback={
              <div className="h-80 rounded-2xl bg-[var(--bg-surface)] animate-pulse" />
            }
          >
            <ActivityFeed activities={FALLBACK_ACTIVITIES} />
          </Suspense>
        </div>
        <div className="space-y-6">
          <Suspense
            fallback={
              <div className="h-80 rounded-2xl bg-[var(--bg-surface)] animate-pulse" />
            }
          >
            <LiveMatchesPanel
              matches={matches ?? []}
              onMatchClick={(match) => navigate(`/scoring/${match.id}`)}
            />
          </Suspense>
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   MetricCard — Premium stat card with animated glow
   ───────────────────────────────────────────────────────────────── */
const MetricCard = ({
  title,
  value,
  icon,
  accentColor,
  change,
  delay = 0,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  accentColor: string;
  change?: { value: number; isPositive: boolean };
  delay?: number;
}) => {
  return (
    <div
      className="animate-fade-in-up"
      style={{ animationDelay: `${delay * 80}ms`, animationFillMode: 'both' }}
    >
      <div className="group relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)]">
        {/* Gradient border glow on hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `linear-gradient(135deg, ${accentColor}20 0%, transparent 50%, ${accentColor}10 100%)`,
          }}
          aria-hidden
        />
        {/* Subtle corner accent */}
        <div
          className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-[0.07] blur-2xl transition-all duration-500 group-hover:scale-125 group-hover:opacity-[0.12]"
          style={{ background: accentColor }}
          aria-hidden
        />
        <div className="relative flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
              {title}
            </p>
            <p
              className="mt-2.5 text-3xl font-bold tracking-tight text-[var(--text-primary)] tabular-nums dark:text-white"
              style={{ fontFeatureSettings: '"tnum"' }}
            >
              {value.toLocaleString()}
            </p>
            {change && (
              <div className="mt-2 flex items-center gap-1.5">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    change.isPositive
                      ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]'
                      : 'bg-[var(--color-live)]/10 text-[var(--color-live)]'
                  }`}
                >
                  {change.isPositive ? '↑' : '↓'} {change.value}%
                </span>
              </div>
            )}
          </div>
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${accentColor}18 0%, ${accentColor}08 100%)`,
              color: accentColor,
              boxShadow: `0 4px 12px -4px ${accentColor}25`,
            }}
          >
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   UpcomingMatches — Premium list with clean card design
   ───────────────────────────────────────────────────────────────── */
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
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-info)]/15 to-[var(--color-info)]/5 text-[var(--color-info)] shadow-sm">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold tracking-tight text-[var(--text-primary)]">
              Upcoming matches
            </h2>
            <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
              Next fixtures on your schedule
            </p>
          </div>
        </div>
        <button
          onClick={onSeeAll}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-[var(--text-link)] transition-all duration-200 hover:bg-[var(--brand-primary)]/8 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-canvas)]"
        >
          See all
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
      {matches.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--bg-surface-sunken)] to-[var(--bg-surface)] text-[var(--text-tertiary)] shadow-inner">
            <Calendar className="h-7 w-7" />
          </div>
          <p className="mt-5 text-sm font-semibold text-[var(--text-primary)]">
            No upcoming matches
          </p>
          <p className="mt-1.5 text-xs text-[var(--text-secondary)] max-w-[200px]">
            Schedule matches from your tournament to see them here
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-[var(--border-subtle)]">
          {matches.map((m) => (
            <li
              key={m.id}
              className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-[var(--bg-surface-sunken)]/60 sm:px-6"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-primary-hover)] text-xs font-bold text-white shadow-sm dark:from-[#6b1515] dark:to-[#8b1c1c]">
                VS
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-[var(--text-primary)]">
                  {m.teamA.name}{' '}
                  <span className="text-[var(--text-tertiary)]">vs</span>{' '}
                  {m.teamB.name}
                </p>
                <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
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

/* ─────────────────────────────────────────────────────────────────
   QuickActions — Command-palette style action grid
   ───────────────────────────────────────────────────────────────── */
const QuickActions = () => {
  const navigate = useNavigate();
  const actions = [
    { label: 'New tournament', icon: Trophy, to: ROUTES.TOURNAMENT_CREATE },
    { label: 'Add team', icon: Users, to: ROUTES.TEAMS },
    { label: 'Add player', icon: UserPlus, to: ROUTES.PLAYERS },
    { label: 'Open analytics', icon: BarChart3, to: ROUTES.ANALYTICS },
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-[var(--shadow-sm)]">
      <div className="border-b border-[var(--border-subtle)] px-5 py-4 sm:px-6">
        <h2 className="text-base font-semibold tracking-tight text-[var(--text-primary)]">
          Quick actions
        </h2>
        <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
          Get things done faster
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 p-3">
        {actions.map((a) => (
          <button
            key={a.label}
            onClick={() => navigate(a.to)}
            className="group flex flex-col items-center gap-2.5 rounded-xl border border-transparent p-4 text-center transition-all duration-200 hover:border-[var(--border-subtle)] hover:bg-[var(--bg-surface-sunken)]/60 hover:shadow-[var(--shadow-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-canvas)]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--bg-surface-sunken)] text-[var(--text-secondary)] transition-all duration-200 group-hover:bg-[var(--brand-primary)]/10 group-hover:text-[var(--brand-primary)] group-hover:shadow-sm group-hover:scale-105">
              <a.icon className="h-5 w-5" />
            </div>
            <span className="text-xs font-medium text-[var(--text-primary)]">
              {a.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
