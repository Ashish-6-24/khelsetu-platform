import { sortPlayersByRating, getRatingColor, getRatingBg } from '../utils/statCalculations';
import type { PlayerMatchStat } from '../types';

interface PlayerStatsTableProps {
  players: PlayerMatchStat[];
}

export const PlayerStatsTable = ({ players }: PlayerStatsTableProps) => {
  const sorted = sortPlayersByRating(players);

  if (sorted.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white/80 p-8 text-center backdrop-blur-xl dark:border-gray-700 dark:bg-gray-800/80">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No player statistics available
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-xl dark:border-gray-700 dark:bg-gray-800/80">
      <div className="overflow-x-auto">
        <table className="w-full text-sm" aria-label="Player statistics">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/50 dark:border-gray-700 dark:bg-gray-900/50">
              <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-500 dark:text-gray-400">
                Player
              </th>
              <th scope="col" className="px-3 py-3 text-center font-semibold text-gray-500 dark:text-gray-400">
                Min
              </th>
              <th scope="col" className="px-3 py-3 text-center font-semibold text-gray-500 dark:text-gray-400">
                G
              </th>
              <th scope="col" className="px-3 py-3 text-center font-semibold text-gray-500 dark:text-gray-400">
                A
              </th>
              <th scope="col" className="px-3 py-3 text-center font-semibold text-gray-500 dark:text-gray-400">
                Pass%
              </th>
              <th scope="col" className="px-3 py-3 text-center font-semibold text-gray-500 dark:text-gray-400">
                Tkl
              </th>
              <th scope="col" className="px-3 py-3 text-center font-semibold text-gray-500 dark:text-gray-400">
                Rating
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
            {sorted.map((player, index) => (
              <tr
                key={player.playerId}
                className={`transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/30 ${
                  index % 2 === 0
                    ? 'bg-white dark:bg-transparent'
                    : 'bg-gray-50/50 dark:bg-gray-800/50'
                }`}
              >
                <td className="px-4 py-2.5">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {player.playerName}
                    </span>
                    <span className="ml-1.5 text-xs text-gray-400 dark:text-gray-500">
                      {player.position}
                    </span>
                  </div>
                </td>
                <td className="px-3 py-2.5 text-center tabular-nums text-gray-600 dark:text-gray-400">
                  {player.minutesPlayed}&apos;
                </td>
                <td className="px-3 py-2.5 text-center font-semibold tabular-nums text-gray-900 dark:text-white">
                  {player.goals}
                </td>
                <td className="px-3 py-2.5 text-center tabular-nums text-gray-600 dark:text-gray-400">
                  {player.assists}
                </td>
                <td className="px-3 py-2.5 text-center tabular-nums text-gray-600 dark:text-gray-400">
                  {player.passAccuracy}%
                </td>
                <td className="px-3 py-2.5 text-center tabular-nums text-gray-600 dark:text-gray-400">
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
