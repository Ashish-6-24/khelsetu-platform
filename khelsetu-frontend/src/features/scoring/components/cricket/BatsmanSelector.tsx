import type { CricketBatsmanScore } from '@types-domain/scoring';

interface BatsmanSelectorProps {
  batsmen: CricketBatsmanScore[];
  strikerId: string;
  nonStrikerId: string;
  onSelectStriker: (playerId: string) => void;
  onSelectNonStriker: (playerId: string) => void;
}

export const BatsmanSelector = ({
  batsmen,
  strikerId,
  nonStrikerId,
  onSelectStriker,
  onSelectNonStriker,
}: BatsmanSelectorProps) => {
  const availableBatsmen = batsmen.filter((b) => !b.isOut);

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-[var(--text-primary)] dark:text-[var(--text-secondary)] mb-1">
          Striker
        </label>
        <select
          value={strikerId}
          onChange={(e) => onSelectStriker(e.target.value)}
          className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] px-3 py-2 text-sm dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface)] dark:text-white"
        >
          {availableBatsmen.map((b) => (
            <option key={b.playerId} value={b.playerId}>
              {b.playerName} ({b.runs} runs)
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--text-primary)] dark:text-[var(--text-secondary)] mb-1">
          Non-Striker
        </label>
        <select
          value={nonStrikerId}
          onChange={(e) => onSelectNonStriker(e.target.value)}
          className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] px-3 py-2 text-sm dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface)] dark:text-white"
        >
          {availableBatsmen
            .filter((b) => b.playerId !== strikerId)
            .map((b) => (
              <option key={b.playerId} value={b.playerId}>
                {b.playerName} ({b.runs} runs)
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};
