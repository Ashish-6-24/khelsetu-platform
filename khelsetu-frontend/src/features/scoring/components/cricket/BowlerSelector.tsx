import type { CricketBowlerScore } from '@types-domain/scoring';

interface BowlerSelectorProps {
  bowlers: CricketBowlerScore[];
  currentBowlerId: string;
  onSelectBowler: (playerId: string) => void;
}

export const BowlerSelector = ({
  bowlers,
  currentBowlerId,
  onSelectBowler,
}: BowlerSelectorProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Bowler
      </label>
      <select
        value={currentBowlerId}
        onChange={(e) => onSelectBowler(e.target.value)}
        className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
      >
        {bowlers.map((b) => (
          <option key={b.playerId} value={b.playerId}>
            {b.playerName} ({b.overs} ov, {b.wickets}/{b.runs})
          </option>
        ))}
      </select>
    </div>
  );
};
