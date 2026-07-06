import type { PlayerMatchStat } from '../types';
import {
  getRatingBg,
  getRatingColor,
  sortPlayersByRating,
} from '../utils/statCalculations';

interface PlayerStatsTableProps {
  players: PlayerMatchStat[];
}

export const PlayerStatsTable = ({ players }: PlayerStatsTableProps) => {
  const sorted = sortPlayersByRating(players);

  if (sorted.length === 0) {
    return (
      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 p-8 text-center backdrop-blur-xl dark:border-[var(--border-subtle)] dark:bg-[var(--bg-surface)]/80">
        <p className="text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
          No player statistics available
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 backdrop-blur-xl dark:border-[var(--border-subtle)] dark:bg-[var(--bg-surface)]/80">
      <div className="overflow-x-auto">
        <table className="w-full text-sm" aria-label="Player statistics">
          <thead>
            <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface-sunken)]/50 dark:border-[var(--border-subtle)] dark:bg-[var(--bg-canvas)]/50">
              <th
                scope="col"
                className="px-4 py-3 text-left font-semibold text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]"
              >
                Player
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center font-semibold text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]"
              >
                Min
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center font-semibold text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]"
              >
                G
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center font-semibold text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]"
              >
                A
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center font-semibold text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]"
              >
                Pass%
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center font-semibold text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]"
              >
                Tkl
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center font-semibold text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]"
              >
                Rating
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
            {sorted.map((player, index) => (
              <tr
                key={player.playerId}
                className={`transition-colors hover:bg-[var(--bg-surface-sunken)] dark:hover:bg-[var(--bg-surface-raised)]/30 ${
                  index % 2 === 0
                    ? 'bg-[var(--bg-surface)] dark:bg-transparent'
                    : 'bg-[var(--bg-surface-sunken)]/50 dark:bg-[var(--bg-surface)]/50'
                }`}
              >
                <td className="px-4 py-2.5">
                  <div>
                    <span className="font-medium text-[var(--text-primary)] dark:text-white">
                      {player.playerName}
                    </span>
                    <span className="ml-1.5 text-xs text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                      {player.position}
                    </span>
                  </div>
                </td>
                <td className="px-3 py-2.5 text-center tabular-nums text-[var(--text-secondary)] dark:text-[var(--text-tertiary)]">
                  {player.minutesPlayed}&apos;
                </td>
                <td className="px-3 py-2.5 text-center font-semibold tabular-nums text-[var(--text-primary)] dark:text-white">
                  {player.goals}
                </td>
                <td className="px-3 py-2.5 text-center tabular-nums text-[var(--text-secondary)] dark:text-[var(--text-tertiary)]">
                  {player.assists}
                </td>
                <td className="px-3 py-2.5 text-center tabular-nums text-[var(--text-secondary)] dark:text-[var(--text-tertiary)]">
                  {player.passAccuracy}%
                </td>
                <td className="px-3 py-2.5 text-center tabular-nums text-[var(--text-secondary)] dark:text-[var(--text-tertiary)]">
                  {player.tackles}
                </td>
                <td className="px-3 py-2.5 text-center">
                  <span
                    className={`inline-block min-w-[2.5rem] rounded-lg px-2 py-0.5 text-center text-xs font-bold tabular-nums ${getRatingBg(player.rating)} ${getRatingColor(player.rating)}`}
                  >
                    {player.rating.toFixed(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
