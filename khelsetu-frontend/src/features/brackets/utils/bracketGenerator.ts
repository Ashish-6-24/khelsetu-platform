import type {
  BracketData,
  BracketMatch,
  BracketRound,
  BracketTeam,
} from '../types';

function generateId(): string {
  return `match-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function nextPow2(n: number): number {
  let p = 1;
  while (p < n) p *= 2;
  return p;
}

export function generateSingleElimination(teams: BracketTeam[]): BracketData {
  const totalSlots = nextPow2(teams.length);
  const totalRounds = Math.log2(totalSlots);
  const rounds: BracketRound[] = [];
  let prevRoundMatches: BracketMatch[] = [];

  // Seed teams with byes
  const seeded: (BracketTeam | null)[] = [];
  for (let i = 0; i < totalSlots; i++) {
    seeded.push(i < teams.length ? (teams[i] ?? null) : null);
  }

  for (let r = 0; r < totalRounds; r++) {
    const matchCount = totalSlots / Math.pow(2, r + 1);
    const roundName =
      r === totalRounds - 1
        ? 'Final'
        : r === totalRounds - 2
          ? 'Semi-Final'
          : r === totalRounds - 3
            ? 'Quarter-Final'
            : `Round ${r + 1}`;

    const matches: BracketMatch[] = [];

    for (let m = 0; m < matchCount; m++) {
      let teamA: BracketTeam | null;
      let teamB: BracketTeam | null;
      let status: BracketMatch['status'];

      if (r === 0) {
        teamA = seeded[m * 2] ?? null;
        teamB = seeded[m * 2 + 1] ?? null;
      } else {
        const prevA = prevRoundMatches[m * 2];
        const prevB = prevRoundMatches[m * 2 + 1];
        teamA =
          prevA?.winner === 'teamA' ? prevA.teamA : (prevA?.teamB ?? null);
        teamB =
          prevB?.winner === 'teamA' ? prevB.teamA : (prevB?.teamB ?? null);
      }

      if (!teamA && teamB) {
        status = 'walkover';
      } else if (teamA && !teamB) {
        status = 'walkover';
      } else if (!teamA && !teamB) {
        status = 'bye';
      } else {
        status =
          teamA && teamB
            ? r === 0 &&
              (m >= teams.length / 2 || teams.length <= totalSlots / 2)
              ? 'pending'
              : 'pending'
            : 'pending';
      }

      const match: BracketMatch = {
        id: generateId(),
        round: r + 1,
        position: m,
        teamA,
        teamB,
        scoreA: null,
        scoreB: null,
        winner: null,
        status,
        venue: undefined,
        scheduledAt: undefined,
        nextMatchId: undefined,
        nextSlot: m % 2 === 0 ? 'teamA' : 'teamB',
      };
      matches.push(match);
    }

    // Wire next match pointers
    if (r > 0) {
      matches.forEach((_match, i) => {
        const parentIdx = Math.floor(i / 2);
        const prevRound = rounds[r - 1];
        if (prevRoundMatches.length > 0 && prevRound) {
          const parentMatch = prevRound.matches[parentIdx];
          const current = prevRoundMatches[i];
          if (parentMatch && current) {
            prevRoundMatches[i] = {
              ...current,
              nextMatchId: parentMatch.id,
            };
          }
        }
      });
    }

    rounds.push({ number: r + 1, name: roundName, matches });
    prevRoundMatches = matches;
  }

  return {
    format: 'single-elimination',
    rounds,
    champion: null,
    totalMatches: rounds.reduce((sum, r) => sum + r.matches.length, 0),
    completedMatches: rounds.reduce(
      (sum, r) =>
        sum + r.matches.filter((m) => m.status === 'completed').length,
      0,
    ),
  };
}

export function generateDoubleElimination(teams: BracketTeam[]): BracketData {
  const upperBracket = generateSingleElimination(teams);

  const loserRounds: BracketRound[] = [];
  const losersBracketSize = Math.floor(teams.length / 2);

  for (let r = 0; r < upperBracket.rounds.length - 1; r++) {
    const matchCount = Math.max(1, losersBracketSize / Math.pow(2, r + 1));
    const matches: BracketMatch[] = [];

    for (let m = 0; m < matchCount; m++) {
      matches.push({
        id: generateId(),
        round: r + 1,
        position: m,
        teamA: null,
        teamB: null,
        scoreA: null,
        scoreB: null,
        winner: null,
        status: 'pending',
        venue: undefined,
        scheduledAt: undefined,
        nextMatchId: undefined,
        nextSlot: m % 2 === 0 ? 'teamA' : 'teamB',
      });
    }

    loserRounds.push({
      number: r + 1,
      name: `Losers Round ${r + 1}`,
      matches,
    });
  }

  // Grand final
  const grandFinal: BracketRound = {
    number: upperBracket.rounds.length + 1,
    name: 'Grand Final',
    matches: [
      {
        id: generateId(),
        round: upperBracket.rounds.length + 1,
        position: 0,
        teamA: null,
        teamB: null,
        scoreA: null,
        scoreB: null,
        winner: null,
        status: 'pending',
        venue: undefined,
        scheduledAt: undefined,
      },
    ],
  };

  return {
    format: 'double-elimination',
    rounds: [...upperBracket.rounds, ...loserRounds, grandFinal],
    champion: null,
    totalMatches:
      upperBracket.totalMatches +
      loserRounds.reduce((sum, r) => sum + r.matches.length, 0) +
      1,
    completedMatches: 0,
  };
}

export function generateRoundRobin(teams: BracketTeam[]): BracketData {
  const rounds: BracketRound[] = [];
  const n = teams.length;
  const matchesPerRound = Math.floor(n / 2);

  // Create a circular schedule
  const schedule: [number, number][][] = [];
  const arr = [...Array(n).keys()];

  for (let r = 0; r < n - 1; r++) {
    const roundPairs: [number, number][] = [];
    for (let i = 0; i < matchesPerRound; i++) {
      const a = arr[i];
      const b = arr[n - 1 - i];
      if (a !== undefined && b !== undefined) {
        roundPairs.push([a, b]);
      }
    }
    schedule.push(roundPairs);

    // Rotate (keep first fixed)
    const last = arr.pop()!;
    arr.splice(1, 0, last);
  }

  schedule.forEach((roundPairs, idx) => {
    const matches: BracketMatch[] = roundPairs.map(([a, b], mIdx) => ({
      id: generateId(),
      round: idx + 1,
      position: mIdx,
      teamA: teams[a] ?? null,
      teamB: teams[b] ?? null,
      scoreA: null,
      scoreB: null,
      winner: null,
      status: 'pending',
      venue: undefined,
      scheduledAt: undefined,
    }));

    rounds.push({
      number: idx + 1,
      name: `Matchday ${idx + 1}`,
      matches,
    });
  });

  return {
    format: 'round-robin',
    rounds,
    champion: null,
    totalMatches: rounds.reduce((sum, r) => sum + r.matches.length, 0),
    completedMatches: 0,
  };
}

export function advanceWinner(
  bracket: BracketData,
  matchId: string,
  winner: 'teamA' | 'teamB',
): BracketData {
  const newRounds = bracket.rounds.map((round) => ({
    ...round,
    matches: round.matches.map((match) => {
      if (match.id !== matchId) return match;

      return {
        ...match,
        winner,
        status: 'completed' as const,
      };
    }),
  }));

  // Propagate winner to next match
  for (const round of newRounds) {
    for (const match of round.matches) {
      if (match.nextMatchId && match.winner) {
        const winnerTeam = match.winner === 'teamA' ? match.teamA : match.teamB;
        for (const r2 of newRounds) {
          for (const m2 of r2.matches) {
            if (m2.id === match.nextMatchId) {
              if (match.nextSlot === 'teamA') {
                m2.teamA = winnerTeam;
              } else {
                m2.teamB = winnerTeam;
              }
            }
          }
        }
      }
    }
  }

  // Determine champion
  const lastRound = newRounds[newRounds.length - 1];
  const finalMatch = lastRound?.matches[0];
  const champion =
    finalMatch?.winner === 'teamA'
      ? finalMatch.teamA
      : finalMatch?.winner === 'teamB'
        ? finalMatch.teamB
        : null;

  return {
    ...bracket,
    rounds: newRounds,
    champion: champion ?? bracket.champion,
    completedMatches: newRounds.reduce(
      (sum, r) =>
        sum + r.matches.filter((m) => m.status === 'completed').length,
      0,
    ),
  };
}
