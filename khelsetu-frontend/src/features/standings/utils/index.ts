import type { Standing } from '@features/standings/types';

export const sortStandings = (standings: Standing[]): Standing[] => {
  return [...standings].sort(
    (a, b) =>
      b.points - a.points ||
      (b.nrr ?? 0) - (a.nrr ?? 0) ||
      a.teamName.localeCompare(b.teamName),
  );
};

export const calculateNRR = (
  runsFor: number,
  oversFor: number,
  runsAgainst: number,
  oversAgainst: number,
): number => {
  if (oversFor === 0 || oversAgainst === 0) return 0;
  const runRateFor = runsFor / oversFor;
  const runRateAgainst = runsAgainst / oversAgainst;
  return parseFloat((runRateFor - runRateAgainst).toFixed(3));
};

export const getQualificationZone = (
  _totalTeams: number,
  playoffSpots: number = 4,
): number[] => {
  return Array.from({ length: playoffSpots }, (_, i) => i);
};

export const isQualified = (
  rank: number,
  playoffSpots: number = 4,
): boolean => {
  return rank < playoffSpots;
};

export const getTeamForm = (
  standing: Standing,
  lastN: number = 5,
): string[] => {
  const total = standing.won + standing.lost + standing.drawn;
  if (total === 0) return [];

  const form: string[] = [];
  for (let i = 0; i < Math.min(lastN, total); i++) {
    if (standing.won > form.filter((f) => f === 'W').length) {
      form.push('W');
    } else if (standing.drawn > form.filter((f) => f === 'D').length) {
      form.push('D');
    } else {
      form.push('L');
    }
  }
  return form.slice(0, lastN);
};
