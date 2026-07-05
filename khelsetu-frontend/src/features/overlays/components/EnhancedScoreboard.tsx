import type { Match } from '@shared/types/tournament';
import { LivePulse } from '@shared/components/animations';

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
      <div className="bg-black/90 backdrop-blur-sm rounded-lg p-3 text-white min-w-[200px]">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm">{teamA?.name ?? 'TBD'}</span>
            <span className="text-lg font-black">
              {score?.teamAScore ?? '-'}
            </span>
          </div>
          <span className="text-[var(--text-tertiary)] text-xs">vs</span>
          <div className="flex items-center gap-2">
            <span className="text-lg font-black">
              {score?.teamBScore ?? '-'}
            </span>
            <span className="font-bold text-sm">{teamB?.name ?? 'TBD'}</span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-4 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <span className="font-bold text-xs">
                {teamA?.shortName ?? 'TBD'}
              </span>
            </div>
            <div>
              <div className="font-semibold text-sm">{teamA?.name ?? 'TBD'}</div>
              <div className="text-2xl font-black">{score?.teamAScore ?? '-'}</div>
            </div>
          </div>

          <div className="text-center">
            {status === 'live' && (
              <div className="mb-1">
                <LivePulse color="red" size="sm" />
              </div>
            )}
            <div className="text-xs text-gray-400">
              {score?.teamAInnings?.[0]
                ? `${score.teamAInnings[0].overs} ov`
                : 'vs'}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="font-semibold text-sm">{teamB?.name ?? 'TBD'}</div>
              <div className="text-2xl font-black">{score?.teamBScore ?? '-'}</div>
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
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 text-white shadow-2xl min-w-[400px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
            <span className="font-bold text-sm">
              {teamA?.shortName ?? 'TBD'}
            </span>
          </div>
          <div>
            <div className="font-semibold">{teamA?.name ?? 'TBD'}</div>
            <div className="text-3xl font-black">
              {score?.teamAScore ?? '-'}
              {score?.teamAInnings?.[0] && (
                <span className="text-sm font-normal text-gray-400 ml-2">
                  ({score.teamAInnings[0].wickets}/{score.teamAInnings[0].overs})
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="text-center">
          {status === 'live' && (
            <div className="inline-flex items-center gap-1 px-3 py-1 bg-red-500 rounded-full text-xs font-bold">
              <LivePulse color="red" size="sm" />
              LIVE
            </div>
          )}
          {status === 'completed' && (
            <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 rounded-full text-xs font-bold">
              FINAL
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="font-semibold">{teamB?.name ?? 'TBD'}</div>
            <div className="text-3xl font-black">
              {score?.teamBScore ?? '-'}
              {score?.teamBInnings?.[0] && (
                <span className="text-sm font-normal text-gray-400 ml-2">
                  ({score.teamBInnings[0].wickets}/{score.teamBInnings[0].overs})
                </span>
              )}
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
            <span className="font-bold text-sm">
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
    </div>
  );
}
