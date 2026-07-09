import type { MatchStatus, Team } from '@shared/types/tournament';

export interface GeneratedFixture {
  round: number;
  matchNumber: number;
  teamA: Team | null;
  teamB: Team | null;
  venue: string;
  scheduledAt: string;
}

function createFixture(
  round: number,
  matchNumber: number,
  teamA: Team,
  teamB: Team,
  startDate: string,
  venue: string,
  matchesPerDay: number,
  currentCount: number,
): GeneratedFixture {
  const date = new Date(startDate);
  date.setDate(date.getDate() + Math.floor(currentCount / matchesPerDay));
  return {
    round,
    matchNumber,
    teamA,
    teamB,
    venue,
    scheduledAt: date.toISOString(),
  };
}

function isValidMatch(a: Team, b: Team): boolean {
  return a.id !== 'bye' && b.id !== 'bye';
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

      const teamA =
        match === 0 ? teamsList[teamCount - 1] : teamsList[teamAIndex];
      const teamB = match === 0 ? teamsList[teamAIndex] : teamsList[teamBIndex];
      if (teamA && teamB && isValidMatch(teamA, teamB)) {
        fixtures.push(
          createFixture(
            round + 1,
            fixtures.length + 1,
            teamA,
            teamB,
            startDate,
            venue,
            matchesPerDay,
            fixtures.length,
          ),
        );
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
    scheduled: 'text-[var(--text-tertiary)]',
    live: 'text-green-600 dark:text-green-400',
    completed: 'text-blue-600 dark:text-blue-400',
    cancelled: 'text-red-600 dark:text-red-400',
    postponed: 'text-yellow-600 dark:text-yellow-400',
  };
  return colors[status];
};
