import type { MatchStatus, Team } from '@types-domain/tournament';

export interface GeneratedFixture {
  round: number;
  matchNumber: number;
  teamA: Team | null;
  teamB: Team | null;
  venue: string;
  scheduledAt: string;
}

export const generateLeagueFixtures = (
  teams: Team[],
  startDate: string,
  venue: string,
  matchesPerDay = 2,
): GeneratedFixture[] => {
  const fixtures: GeneratedFixture[] = [];
  const n = teams.length;

  if (n < 2) return fixtures;

  const rounds = n % 2 === 0 ? n - 1 : n;
  const teamsList = [...teams];
  if (n % 2 !== 0) {
    teamsList.push({
      id: 'bye',
      name: 'BYE',
      shortName: 'BYE',
      tournamentId: '',
      players: [],
      stats: { played: 0, won: 0, lost: 0, drawn: 0, points: 0 },
      createdAt: '',
    });
  }

  const teamCount = teamsList.length;
  for (let round = 0; round < rounds; round++) {
    for (let match = 0; match < teamCount / 2; match++) {
      const teamAIndex = (round + match) % (teamCount - 1);
      const teamBIndex = teamCount - 1 - ((round + match) % (teamCount - 1));

      if (match === 0) {
        const teamA = teamsList[teamCount - 1];
        const teamB = teamsList[teamAIndex];
        if (teamA && teamB && teamA.id !== 'bye' && teamB.id !== 'bye') {
          const date = new Date(startDate);
          date.setDate(
            date.getDate() + Math.floor(fixtures.length / matchesPerDay),
          );
          fixtures.push({
            round: round + 1,
            matchNumber: fixtures.length + 1,
            teamA: teamA,
            teamB: teamB,
            venue,
            scheduledAt: date.toISOString(),
          });
        }
      } else {
        const teamA = teamsList[teamAIndex];
        const teamB = teamsList[teamBIndex];
        if (teamA && teamB && teamA.id !== 'bye' && teamB.id !== 'bye') {
          const date = new Date(startDate);
          date.setDate(
            date.getDate() + Math.floor(fixtures.length / matchesPerDay),
          );
          fixtures.push({
            round: round + 1,
            matchNumber: fixtures.length + 1,
            teamA: teamA,
            teamB: teamB,
            venue,
            scheduledAt: date.toISOString(),
          });
        }
      }
    }
  }

  return fixtures;
};

export const generateKnockoutBracket = (
  teams: Team[],
  startDate: string,
  venue: string,
): { round: string; matches: GeneratedFixture[] }[] => {
  const bracket: { round: string; matches: GeneratedFixture[] }[] = [];
  const n = teams.length;

  if (n < 2) return bracket;

  const rounds = Math.ceil(Math.log2(n));
  let currentTeams = [...teams];

  for (let round = 0; round < rounds; round++) {
    const roundMatches: GeneratedFixture[] = [];
    const roundName =
      round === rounds - 1
        ? 'Final'
        : round === rounds - 2
          ? 'Semi Finals'
          : `Round of ${Math.pow(2, rounds - round)}`;

    for (let i = 0; i < currentTeams.length; i += 2) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + round * 3);

      roundMatches.push({
        round: round + 1,
        matchNumber: roundMatches.length + 1,
        teamA: currentTeams[i] ?? null,
        teamB: currentTeams[i + 1] ?? null,
        venue,
        scheduledAt: date.toISOString(),
      });
    }

    bracket.push({ round: roundName, matches: roundMatches });
    currentTeams = roundMatches.map(() => ({
      id: `tbd-${round}`,
      name: 'TBD',
      shortName: 'TBD',
      tournamentId: '',
      players: [],
      stats: { played: 0, won: 0, lost: 0, drawn: 0, points: 0 },
      createdAt: '',
    }));
  }

  return bracket;
};

export const getMatchStatusColor = (status: MatchStatus): string => {
  const colors: Record<MatchStatus, string> = {
    scheduled: 'text-gray-500 dark:text-gray-400',
    live: 'text-green-600 dark:text-green-400',
    completed: 'text-blue-600 dark:text-blue-400',
    cancelled: 'text-red-600 dark:text-red-400',
    postponed: 'text-yellow-600 dark:text-yellow-400',
  };
  return colors[status];
};
