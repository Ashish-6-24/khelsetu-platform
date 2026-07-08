import { secureRandomFloat } from '@shared/utils/crypto-random';

/** Parse "142/3" → { runs: 142, wickets: 3 } */
export const parseScore = (s: string) => {
  const match = s.match(/(\d+)\/(\d+)/);
  if (!match || !match[1] || !match[2]) return null;
  return {
    runs: Number.parseInt(match[1]!),
    wickets: Number.parseInt(match[2]!),
  };
};

/** Increment a cricket score realistically */
export const incrementScore = (s: string): string => {
  const parsed = parseScore(s);
  if (!parsed) return s;
  const { runs, wickets } = parsed;
  const rand = secureRandomFloat();
  if (rand < 0.5) return `${runs + 1}/${wickets}`;
  if (rand < 0.7) return `${runs + 2}/${wickets}`;
  if (rand < 0.85) return `${runs + 4}/${wickets}`;
  if (rand < 0.95) return `${runs + 6}/${wickets}`;
  if (wickets < 9) return `${runs}/${wickets + 1}`;
  return s;
};
