import type { Match } from '@shared/types/tournament';
import { Avatar } from '@shared/ui/Avatar';
import { Badge, type BadgeVariant } from '@shared/ui/Badge';
import { formatDate, formatTime } from '@shared/utils/date';
import { motion } from 'framer-motion';

const statusVariantMap: Record<Match['status'], BadgeVariant> = {
  scheduled: 'info',
  live: 'live',
  completed: 'default',
  cancelled: 'error',
  postponed: 'warning',
};

interface MatchCardProps {
  match: Match;
  onClick?: () => void;
  compact?: boolean;
}

export const MatchCard = ({
  match,
  onClick,
  compact = false,
}: MatchCardProps) => {
  if (compact) {
    return (
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="cursor-pointer"
        onClick={onClick}
      >
        <div className="flex items-center justify-between p-3 bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] rounded-xl border border-[var(--border-subtle)] dark:border-[var(--border-subtle)]">
          <div className="flex items-center gap-3 flex-1">
            <span className="text-sm font-medium text-[var(--text-primary)] dark:text-white">
              {match.teamA.shortName}
            </span>
            <span className="text-xs text-[var(--text-tertiary)]">vs</span>
            <span className="text-sm font-medium text-[var(--text-primary)] dark:text-white">
              {match.teamB.shortName}
            </span>
          </div>
          <Badge
            variant={statusVariantMap[match.status]}
            pulse={match.status === 'live'}
          >
            {match.status}
          </Badge>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <div className="p-4 bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-subtle)] dark:border-[var(--border-subtle)] shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <Badge
            variant={statusVariantMap[match.status]}
            pulse={match.status === 'live'}
          >
            {match.status === 'live' ? 'LIVE' : match.status}
          </Badge>
          <span className="text-xs text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
            {formatDate(match.scheduledAt)} at {formatTime(match.scheduledAt)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex-1 text-center">
            <Avatar
              name={match.teamA.name}
              size="md"
              className="mx-auto mb-2"
            />
            <p className="font-semibold text-[var(--text-primary)] dark:text-white">
              {match.teamA.name}
            </p>
          </div>
          <div className="px-6">
            {match.score ? (
              <div className="text-center">
                <p className="text-2xl font-bold text-[var(--text-primary)] dark:text-white">
                  {match.score.teamAScore} - {match.score.teamBScore}
                </p>
                {match.winner && (
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    {match.winner.name} wins
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                vs
              </p>
            )}
          </div>
          <div className="flex-1 text-center">
            <Avatar
              name={match.teamB.name}
              size="md"
              className="mx-auto mb-2"
            />
            <p className="font-semibold text-[var(--text-primary)] dark:text-white">
              {match.teamB.name}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
