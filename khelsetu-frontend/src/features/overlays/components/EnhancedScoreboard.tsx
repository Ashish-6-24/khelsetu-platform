import type { Match } from '@shared/types/tournament';
import { LivePulse } from '@shared/components/animations';
import { motion } from 'framer-motion';

interface EnhancedScoreboardProps {
  match: Match;
  variant?: 'full' | 'compact' | 'minimal';
}

export function EnhancedScoreboard({
  match,
  variant = 'full',
}: EnhancedScoreboardProps) {
  const { teamA, teamB, score, status } = match;

  if (variant === 'minimal') {
    return (
      <div className="bg-[var(--bg-surface-dark)]/90 backdrop-blur-sm rounded-lg p-3 text-[var(--text-primary-dark)] w-full sm:min-w-[200px]">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
            <span className="font-bold text-xs sm:text-sm truncate">{teamA?.name ?? 'TBD'}</span>
            <motion.span
              key={score?.teamAScore}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="text-base sm:text-lg font-black shrink-0"
            >
              {score?.teamAScore ?? '-'}
            </motion.span>
          </div>
          <span className="text-[var(--text-tertiary)] text-xs shrink-0">vs</span>
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1 justify-end">
            <motion.span
              key={score?.teamBScore}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="text-base sm:text-lg font-black shrink-0"
            >
              {score?.teamBScore ?? '-'}
            </motion.span>
            <span className="font-bold text-xs sm:text-sm truncate">{teamB?.name ?? 'TBD'}</span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="bg-gradient-to-r from-[var(--bg-surface-dark)] to-[var(--bg-surface-dark)]/80 rounded-xl p-4 text-[var(--text-primary-dark)] shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <span className="font-bold text-xs">
                {teamA?.shortName ?? 'TBD'}
              </span>
            </div>
            <div>
              <div className="font-semibold text-sm">{teamA?.name ?? 'TBD'}</div>
              <motion.div
                key={score?.teamAScore}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="text-2xl font-black"
              >
                {score?.teamAScore ?? '-'}
              </motion.div>
            </div>
          </div>

          <div className="text-center">
            {status === 'live' && (
              <div className="mb-1">
                <LivePulse color="red" size="sm" />
              </div>
            )}
            <div className="text-xs text-[var(--text-secondary-dark)]">
              {score?.teamAInnings?.[0]
                ? `${score.teamAInnings[0].overs} ov`
                : 'vs'}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="font-semibold text-sm">{teamB?.name ?? 'TBD'}</div>
              <motion.div
                key={score?.teamBScore}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="text-2xl font-black"
              >
                {score?.teamBScore ?? '-'}
              </motion.div>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <span className="font-bold text-xs">
                {teamB?.shortName ?? 'TBD'}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Full variant
  return (
    <div className="bg-gradient-to-br from-[var(--bg-surface-dark)] via-[var(--bg-surface-dark)]/90 to-[var(--bg-surface-dark)] rounded-2xl p-4 sm:p-6 text-[var(--text-primary-dark)] shadow-2xl w-full">
      <div className="flex items-center justify-between gap-2 sm:gap-4 mb-4">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <span className="font-bold text-xs sm:text-sm">
              {teamA?.shortName ?? 'TBD'}
            </span>
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-sm sm:text-base truncate">{teamA?.name ?? 'TBD'}</div>
            <div className="text-2xl sm:text-3xl font-black">
              <motion.span
                key={score?.teamAScore}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {score?.teamAScore ?? '-'}
              </motion.span>
              {score?.teamAInnings?.[0] && (
                <span className="text-xs sm:text-sm font-normal text-gray-400 ml-1 sm:ml-2">
                  ({score.teamAInnings[0].wickets}/{score.teamAInnings[0].overs})
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="text-center shrink-0">
          {status === 'live' && (
            <div className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-red-500 rounded-full text-xs font-bold">
              <span className="relative inline-flex items-center" aria-hidden="true">
                <motion.span
                  animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0 rounded-full bg-red-500"
                />
                <span className="relative inline-block h-2 w-2 rounded-full bg-red-500" />
              </span>
              LIVE
              <span className="sr-only"> — Match in progress</span>
            </div>
          )}
          {status === 'completed' && (
            <div className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-green-500 rounded-full text-xs font-bold">
              FINAL
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 justify-end">
          <div className="text-right min-w-0">
            <div className="font-semibold text-sm sm:text-base truncate">{teamB?.name ?? 'TBD'}</div>
            <div className="text-2xl sm:text-3xl font-black">
              <motion.span
                key={score?.teamBScore}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {score?.teamBScore ?? '-'}
              </motion.span>
              {score?.teamBInnings?.[0] && (
                <span className="text-xs sm:text-sm font-normal text-gray-400 ml-1 sm:ml-2">
                  ({score.teamBInnings[0].wickets}/{score.teamBInnings[0].overs})
                </span>
              )}
            </div>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <span className="font-bold text-xs sm:text-sm">
              {teamB?.shortName ?? 'TBD'}
            </span>
          </div>
        </div>
      </div>

      {match.venue && (
        <div className="text-center text-xs text-gray-400 mt-2">
          {match.venue}
        </div>
      )}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {status === 'live' && `Live: ${teamA?.name ?? 'Team A'} ${score?.teamAScore ?? '0'} vs ${teamB?.name ?? 'Team B'} ${score?.teamBScore ?? '0'}`}
      </div>
    </div>
  );
}
