import { Badge } from '@components/ui/Badge';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { MapPin, Clock } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import type { BracketMatch } from '../types';

interface BracketMatchCardProps {
  match: BracketMatch;
  className?: string;
}

const statusVariant: Record<
  BracketMatch['status'],
  'live' | 'success' | 'info' | 'default' | 'warning' | 'error'
> = {
  live: 'live',
  completed: 'success',
  pending: 'info',
  bye: 'default',
  walkover: 'warning',
  disqualified: 'error',
};

const statusLabel: Record<BracketMatch['status'], string> = {
  live: 'LIVE',
  completed: 'Completed',
  pending: 'Pending',
  bye: 'BYE',
  walkover: 'Walkover',
  disqualified: 'DQ',
};

export const BracketMatchCard = ({
  match,
  className,
}: BracketMatchCardProps) => {
  const isWinnerA = match.winner === 'teamA';
  const isWinnerB = match.winner === 'teamB';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
      className={twMerge(
        clsx(
          'w-64 rounded-xl border overflow-hidden',
          'bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl',
          'border-gray-200/60 dark:border-gray-700/60',
          'shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)]',
          'transition-shadow duration-200',
          match.status === 'live' &&
            'ring-2 ring-red-500/30 dark:ring-red-400/30',
          className,
        ),
      )}
    >
      {/* Status bar */}
      <div
        className={clsx(
          'px-3 py-1.5 flex items-center justify-between',
          match.status === 'live'
            ? 'bg-gradient-to-r from-[#7f1d1d] to-[#991b1b]'
            : match.status === 'completed'
              ? 'bg-emerald-50 dark:bg-emerald-900/20'
              : 'bg-gray-50 dark:bg-gray-700/30',
        )}
      >
        <Badge
          variant={statusVariant[match.status]}
          pulse={match.status === 'live'}
          size="sm"
        >
          {statusLabel[match.status]}
        </Badge>
        {match.round && (
          <span
            className={clsx(
              'text-[10px] font-medium uppercase tracking-wider',
              match.status === 'live'
                ? 'text-white/80'
                : 'text-gray-400 dark:text-gray-500',
            )}
          >
            R{match.round}
          </span>
        )}
      </div>

      {/* Team rows */}
      <div className="p-3 space-y-1.5">
        {/* Team A */}
        <div
          className={clsx(
            'flex items-center justify-between p-2 rounded-lg transition-colors',
            isWinnerA
              ? 'bg-emerald-50 dark:bg-emerald-900/20'
              : 'bg-gray-50 dark:bg-gray-700/40',
          )}
        >
          <div className="flex items-center gap-2 min-w-0">
            {match.teamA?.logo ? (
              <img
                src={match.teamA.logo}
                alt={`${match.teamA.shortName || match.teamA.name} logo`}
                className="h-5 w-5 rounded-full object-cover flex-shrink-0"
              />
            ) : match.teamA?.seed != null ? (
              <span className="h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-[10px] font-bold text-gray-500 dark:text-gray-300 flex-shrink-0">
                {match.teamA.seed}
              </span>
            ) : null}
            <span
              className={clsx(
                'text-sm font-medium truncate',
                isWinnerA
                  ? 'text-emerald-700 dark:text-emerald-400'
                  : 'text-gray-900 dark:text-white',
              )}
            >
              {match.teamA?.shortName || match.teamA?.name || 'TBD'}
            </span>
          </div>
          {match.scoreA != null && (
            <span
              className={clsx(
                'text-sm font-bold tabular-nums',
                isWinnerA
                  ? 'text-emerald-700 dark:text-emerald-400'
                  : 'text-gray-500 dark:text-gray-400',
              )}
            >
              {match.scoreA}
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-2 px-2">
          <div className="flex-1 h-px bg-gray-100 dark:bg-gray-700/50" />
          <span className="text-[10px] font-semibold text-gray-300 dark:text-gray-600">
            VS
          </span>
          <div className="flex-1 h-px bg-gray-100 dark:bg-gray-700/50" />
        </div>

        {/* Team B */}
        <div
          className={clsx(
            'flex items-center justify-between p-2 rounded-lg transition-colors',
            isWinnerB
              ? 'bg-emerald-50 dark:bg-emerald-900/20'
              : 'bg-gray-50 dark:bg-gray-700/40',
          )}
        >
          <div className="flex items-center gap-2 min-w-0">
            {match.teamB?.logo ? (
              <img
                src={match.teamB.logo}
                alt={`${match.teamB.shortName || match.teamB.name} logo`}
                className="h-5 w-5 rounded-full object-cover flex-shrink-0"
              />
            ) : match.teamB?.seed != null ? (
              <span className="h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-[10px] font-bold text-gray-500 dark:text-gray-300 flex-shrink-0">
                {match.teamB.seed}
              </span>
            ) : null}
            <span
              className={clsx(
                'text-sm font-medium truncate',
                isWinnerB
                  ? 'text-emerald-700 dark:text-emerald-400'
                  : 'text-gray-900 dark:text-white',
              )}
            >
              {match.teamB?.shortName || match.teamB?.name || 'TBD'}
            </span>
          </div>
          {match.scoreB != null && (
            <span
              className={clsx(
                'text-sm font-bold tabular-nums',
                isWinnerB
                  ? 'text-emerald-700 dark:text-emerald-400'
                  : 'text-gray-500 dark:text-gray-400',
              )}
            >
              {match.scoreB}
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      {(match.venue || match.scheduledAt) && (
        <div className="px-3 py-2 border-t border-gray-100 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50 flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
          {match.venue && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {match.venue}
            </span>
          )}
          {match.scheduledAt && (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {new Date(match.scheduledAt).toLocaleDateString()}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
};
