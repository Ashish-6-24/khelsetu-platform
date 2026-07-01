import { Badge } from '@shared/components/ui/Badge';
import { Card, CardBody } from '@shared/components/ui/Card';
import { Skeleton } from '@shared/components/ui/Skeleton';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

import { useMemo, useState } from 'react';

import { useBracketData } from '../hooks/useBracketData';
import type { BracketFormat, BracketTeam } from '../types';
import { BracketControls } from './BracketControls';
import { BracketMatchCard } from './BracketMatchCard';
import { ZoomPanContainer } from './ZoomPanContainer';

interface AdvancedBracketViewProps {
  matches?: Array<{
    id: string;
    teamA: { id: string; name: string; shortName?: string; logo?: string };
    teamB: { id: string; name: string; shortName?: string; logo?: string };
    score?: { teamAScore: number; teamBScore: number };
    winner?: { id: string };
    status: string;
    venue?: string;
    scheduledAt?: string;
    round?: string;
  }>;
  format: BracketFormat;
  teams?: BracketTeam[];
  tournamentName?: string;
  isLoading?: boolean;
}

const BRACKET_ELEMENT_ID = 'advanced-bracket-export';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const roundVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export const AdvancedBracketView = ({
  matches = [],
  format,
  teams = [],
  tournamentName = 'Tournament',
  isLoading = false,
}: AdvancedBracketViewProps) => {
  const [activeFormat, setActiveFormat] = useState<BracketFormat>(format);

  const bracketTeams = useMemo(() => {
    if (teams.length > 0) return teams;

    const teamMap = new Map<string, BracketTeam>();
    for (const m of matches) {
      if (!teamMap.has(m.teamA.id)) {
        teamMap.set(m.teamA.id, {
          id: m.teamA.id,
          name: m.teamA.name,
          shortName: m.teamA.shortName || m.teamA.name,
          logo: m.teamA.logo,
        });
      }
      if (!teamMap.has(m.teamB.id)) {
        teamMap.set(m.teamB.id, {
          id: m.teamB.id,
          name: m.teamB.name,
          shortName: m.teamB.shortName || m.teamB.name,
          logo: m.teamB.logo,
        });
      }
    }
    return Array.from(teamMap.values());
  }, [teams, matches]);

  const { bracket, stats } = useBracketData({
    format: activeFormat,
    teams: bracketTeams,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-80" />
        <Skeleton className="h-4 w-64" />
        <div className="flex flex-wrap gap-8">
          {[1, 2, 3].map((r) => (
            <div key={r} className="space-y-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-40 w-64 rounded-xl" />
              <Skeleton className="h-40 w-64 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!bracket || bracket.rounds.length === 0) {
    return (
      <Card>
        <CardBody>
          <div className="text-center py-16">
            <Trophy className="h-12 w-12 text-[var(--text-secondary)] dark:text-[var(--text-secondary)] mx-auto mb-4" />
            <p className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)] text-lg font-medium">
              No bracket data available
            </p>
            <p className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)] text-sm mt-1">
              Add teams and matches to generate a bracket
            </p>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <BracketControls
          format={activeFormat}
          onFormatChange={setActiveFormat}
          tournamentName={tournamentName}
          bracketElementId={BRACKET_ELEMENT_ID}
        />
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 rounded-full bg-gray-100 dark:bg-[var(--bg-surface)] overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-accent)]"
            initial={{ width: 0 }}
            animate={{ width: `${stats.completionPercent}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
        <span className="text-xs font-medium text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)] tabular-nums whitespace-nowrap">
          {stats.completedMatches}/{stats.totalMatches} matches
          {stats.completionPercent > 0 && (
            <span className="ml-1 text-[var(--brand-accent)]">
              ({stats.completionPercent}%)
            </span>
          )}
        </span>
      </div>

      {/* Champion display */}
      {bracket.champion && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-[var(--brand-accent)] to-[var(--brand-accent-hover)] p-4 shadow-[0_4px_20px_-4px_rgb(184_134_11/0.4)]"
        >
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white/20">
            <Trophy className="h-5 w-5 text-[var(--brand-accent-ink)]" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-accent-ink)]/70">
              Champion
            </p>
            <p className="text-lg font-bold text-[var(--brand-accent-ink)]">
              {bracket.champion.name}
            </p>
          </div>
        </motion.div>
      )}

      {/* Bracket visualization */}
      <ZoomPanContainer
        id={BRACKET_ELEMENT_ID}
        className="bg-[var(--bg-canvas)] border border-gray-200/60 dark:border-[var(--border-subtle)]/60 rounded-2xl"
      >
        <motion.div
          className="flex gap-8 p-6 sm:p-8 min-h-[400px] overflow-x-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {bracket.rounds.map((round, roundIdx) => {
            // Offset rounds vertically for visual hierarchy
            const verticalOffset =
              roundIdx > 0 ? Math.min(roundIdx * 32, roundIdx * 40) : 0;

            return (
              <motion.div
                key={round.number}
                variants={roundVariants}
                className="flex flex-col gap-4 flex-shrink-0"
                style={{ paddingTop: `${verticalOffset}px` }}
              >
                {/* Round header */}
                <div className="flex items-center gap-2 mb-2">
                  <h3
                    className={clsx(
                      'text-sm font-bold uppercase tracking-wider',
                      roundIdx === bracket.rounds.length - 1
                        ? 'text-[var(--brand-accent)]'
                        : 'text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]',
                    )}
                  >
                    {round.name}
                  </h3>
                  <Badge variant="outline" size="sm">
                    {round.matches.length}
                  </Badge>
                </div>

                {/* Match cards */}
                <div className="flex flex-col gap-4">
                  {round.matches.map((match) => (
                    <BracketMatchCard key={match.id} match={match} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </ZoomPanContainer>

      {/* Stats footer */}
      <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
        <span>
          {stats.totalRounds} round{stats.totalRounds !== 1 ? 's' : ''} ·{' '}
          {bracket.format.replace(/-/g, ' ')}
        </span>
        <span>
          {bracketTeams.length} team{bracketTeams.length !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  );
};
