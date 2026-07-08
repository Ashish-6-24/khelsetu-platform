import type { Match } from '@shared/types/tournament';
import { Badge } from '@shared/ui/Badge';
import { Card, CardBody } from '@shared/ui/Card';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

function getMatchStatusVariant(status: string): 'live' | 'success' | 'info' {
  if (status === 'live') return 'live';
  if (status === 'completed') return 'success';
  return 'info';
}

interface BracketMatchProps {
  match: Match;
  isWinner?: (teamId: string) => boolean;
}

export const BracketMatch = ({ match, isWinner }: BracketMatchProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] rounded-xl border border-[var(--border-subtle)] dark:border-[var(--border-subtle)] overflow-hidden shadow-sm"
    >
      <div className="p-3">
        <div
          className={clsx(
            'flex items-center justify-between p-2 rounded-lg',
            isWinner?.(match.teamA.id)
              ? 'bg-green-50 dark:bg-green-900/20'
              : 'bg-[var(--bg-surface-sunken)] dark:bg-[var(--bg-surface-raised)]/50',
          )}
        >
          <span
            className={clsx(
              'text-sm font-medium',
              isWinner?.(match.teamA.id)
                ? 'text-green-700 dark:text-green-400'
                : 'text-[var(--text-primary)] dark:text-white',
            )}
          >
            {match.teamA.name}
          </span>
          {match.score && (
            <span className="text-sm font-bold text-[var(--text-primary)] dark:text-white">
              {match.score.teamAScore}
            </span>
          )}
        </div>
        <div className="my-1 border-t border-[var(--border-subtle)] dark:border-[var(--border-subtle)]" />
        <div
          className={clsx(
            'flex items-center justify-between p-2 rounded-lg',
            isWinner?.(match.teamB.id)
              ? 'bg-green-50 dark:bg-green-900/20'
              : 'bg-[var(--bg-surface-sunken)] dark:bg-[var(--bg-surface-raised)]/50',
          )}
        >
          <span
            className={clsx(
              'text-sm font-medium',
              isWinner?.(match.teamB.id)
                ? 'text-green-700 dark:text-green-400'
                : 'text-[var(--text-primary)] dark:text-white',
            )}
          >
            {match.teamB.name}
          </span>
          {match.score && (
            <span className="text-sm font-bold text-[var(--text-primary)] dark:text-white">
              {match.score.teamBScore}
            </span>
          )}
        </div>
      </div>
      <div className="px-3 py-2 bg-[var(--bg-surface-sunken)] dark:bg-[var(--bg-surface-raised)]/30 border-t border-[var(--border-subtle)] dark:border-[var(--border-subtle)] flex items-center justify-between">
        <Badge
          variant={getMatchStatusVariant(match.status)}
          pulse={match.status === 'live'}
        >
          {match.status}
        </Badge>
        <span className="text-xs text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
          {match.venue}
        </span>
      </div>
    </motion.div>
  );
};

interface BracketVisualizerProps {
  matches: Match[];
  format: 'knockout' | 'league';
}

export const BracketVisualizer = ({
  matches,
  format,
}: BracketVisualizerProps) => {
  if (format === 'knockout') {
    const rounds = matches.reduce<Record<string, Match[]>>((acc, match) => {
      const round = match.round ?? 'Final';
      acc[round] ??= [];
      acc[round].push(match);
      return acc;
    }, {});

    return (
      <div className="space-y-6">
        {Object.entries(rounds).map(([roundName, roundMatches]) => (
          <div key={roundName}>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] dark:text-white mb-3">
              {roundName}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {roundMatches.map((match) => (
                <BracketMatch
                  key={match.id}
                  match={match}
                  isWinner={(teamId) => match.winner?.id === teamId}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  const matchesByRound = matches.reduce<Record<string, Match[]>>(
    (acc, match) => {
      const round = String(match.round ?? 1);
      acc[round] ??= [];
      acc[round].push(match);
      return acc;
    },
    {},
  );

  return (
    <div className="space-y-6">
      {Object.entries(matchesByRound).map(([round, roundMatches]) => (
        <div key={round}>
          <h3 className="text-lg font-semibold text-[var(--text-primary)] dark:text-white mb-3">
            Round {round}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roundMatches.map((match) => (
              <BracketMatch key={match.id} match={match} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

interface FixtureTableProps {
  matches: Match[];
}

export const FixtureTable = ({ matches }: FixtureTableProps) => {
  return (
    <Card>
      <CardBody className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <caption className="sr-only">Tournament Bracket</caption>
            <thead>
              <tr className="border-b border-[var(--border-subtle)] dark:border-[var(--border-subtle)]">
                <th
                  scope="col"
                  className="text-left px-4 py-3 text-sm font-medium text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]"
                >
                  Match
                </th>
                <th
                  scope="col"
                  className="text-left px-4 py-3 text-sm font-medium text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]"
                >
                  Teams
                </th>
                <th
                  scope="col"
                  className="text-left px-4 py-3 text-sm font-medium text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="text-left px-4 py-3 text-sm font-medium text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]"
                >
                  Venue
                </th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match) => (
                <tr
                  key={match.id}
                  className="border-b border-[var(--border-subtle)] dark:border-[var(--border-subtle)] last:border-0"
                >
                  <td className="px-4 py-3 text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                    #{match.id}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm">
                      <p className="font-medium text-[var(--text-primary)] dark:text-white">
                        {match.teamA.name}
                      </p>
                      <p className="font-medium text-[var(--text-primary)] dark:text-white">
                        {match.teamB.name}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={getMatchStatusVariant(match.status)}
                      pulse={match.status === 'live'}
                    >
                      {match.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                    {match.venue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
};
