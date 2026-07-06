import { HttpResponse, http } from 'msw';

import type { CricketInnings } from '@shared/types/scoring';
import type { Match, MatchStatus } from '@shared/types/tournament';

const teamA = {
  id: 'team-1',
  name: 'Kathmandu Kings',
  shortName: 'KKT',
  tournamentId: 'tournament-1',
  players: [],
  stats: { played: 5, won: 3, lost: 1, drawn: 1, points: 7, nrr: 0.45 },
  createdAt: new Date().toISOString(),
};

const teamB = {
  id: 'team-2',
  name: 'Pokhara Strikers',
  shortName: 'PKR',
  tournamentId: 'tournament-1',
  players: [],
  stats: { played: 5, won: 4, lost: 1, drawn: 0, points: 8, nrr: 0.82 },
  createdAt: new Date().toISOString(),
};

const teamC = {
  id: 'team-3',
  name: 'Chitwan Tigers',
  shortName: 'CHT',
  tournamentId: 'tournament-1',
  players: [],
  stats: { played: 5, won: 2, lost: 3, drawn: 0, points: 4, nrr: -0.15 },
  createdAt: new Date().toISOString(),
};

const teamD = {
  id: 'team-4',
  name: 'Lalitpur Patriots',
  shortName: 'LPT',
  tournamentId: 'tournament-1',
  players: [],
  stats: { played: 5, won: 1, lost: 4, drawn: 0, points: 2, nrr: -0.68 },
  createdAt: new Date().toISOString(),
};

const matches: Match[] = [
  {
    id: 'match-1',
    tournamentId: 'tournament-1',
    teamA,
    teamB,
    status: 'live',
    scheduledAt: new Date().toISOString(),
    venue: 'Tribhuvan University Ground',
    score: {
      teamAScore: 145,
      teamBScore: 120,
      teamAInnings: [{ teamId: 'team-1', runs: 145, wickets: 6, overs: 20, extras: 12 }],
      teamBInnings: [{ teamId: 'team-2', runs: 120, wickets: 8, overs: 16, extras: 8 }],
    },
  },
  {
    id: 'match-2',
    tournamentId: 'tournament-1',
    teamA: teamC,
    teamB: teamD,
    status: 'scheduled',
    scheduledAt: new Date(Date.now() + 3600000).toISOString(),
    venue: 'Dasarath Stadium',
  },
  {
    id: 'match-3',
    tournamentId: 'tournament-1',
    teamA,
    teamB: teamC,
    status: 'completed',
    scheduledAt: new Date(Date.now() - 86400000).toISOString(),
    venue: 'Tribhuvan University Ground',
    winner: teamA,
    score: {
      teamAScore: 180,
      teamBScore: 165,
      teamAInnings: [{ teamId: 'team-1', runs: 180, wickets: 4, overs: 20, extras: 15 }],
      teamBInnings: [{ teamId: 'team-3', runs: 165, wickets: 9, overs: 19, extras: 10 }],
    },
  },
  {
    id: 'match-4',
    tournamentId: 'tournament-1',
    teamA,
    teamB: teamD,
    status: 'completed',
    scheduledAt: new Date(Date.now() - 172800000).toISOString(),
    venue: 'Dasarath Stadium',
    winner: teamA,
    score: {
      teamAScore: 195,
      teamBScore: 142,
      teamAInnings: [{ teamId: 'team-1', runs: 195, wickets: 3, overs: 20, extras: 8 }],
      teamBInnings: [{ teamId: 'team-4', runs: 142, wickets: 10, overs: 18, extras: 6 }],
    },
  },
];

const liveScoreData: Record<string, CricketInnings> = {
  'match-1': {
    inningsNumber: 1,
    battingTeamId: 'team-2',
    battingTeamName: 'Pokhara Strikers',
    bowlingTeamId: 'team-1',
    bowlingTeamName: 'Kathmandu Kings',
    runs: 120,
    wickets: 8,
    overs: 16.3,
    balls: [],
    batsmen: [
      { playerId: 'p4', playerName: 'Aasif Sheikh', runs: 45, balls: 32, fours: 5, sixes: 2, strikeRate: 140.62, isOnStrike: true, isOut: false },
      { playerId: 'p5', playerName: 'Sompal Kami', runs: 12, balls: 15, fours: 1, sixes: 0, strikeRate: 80.0, isOnStrike: false, isOut: true },
    ],
    bowlers: [
      { playerId: 'p2', playerName: 'Dipendra Singh Airee', overs: 3.3, maidens: 0, runs: 28, wickets: 1, economy: 8.0, isBowling: true },
    ],
    currentStrikerId: 'p4',
    currentNonStrikerId: 'p5',
    currentBowlerId: 'p2',
    partnership: { runs: 24, balls: 18, batsmanAId: 'p4', batsmanAName: 'Aasif Sheikh', batsmanBId: 'p5', batsmanBName: 'Sompal Kami' },
    isComplete: false,
  },
};

export const scoringHandlers = [
  http.get('/matches', ({ request }) => {
    const url = new URL(request.url);
    const tournamentId = url.searchParams.get('tournamentId');
    const status = url.searchParams.get('status') as MatchStatus | null;

    let filtered = matches;
    if (tournamentId) {
      filtered = filtered.filter((m) => m.tournamentId === tournamentId);
    }
    if (status) {
      filtered = filtered.filter((m) => m.status === status);
    }

    return HttpResponse.json({ data: filtered, total: filtered.length });
  }),

  http.get('/matches/:matchId', ({ params }) => {
    const match = matches.find((m) => m.id === params.matchId);
    if (!match) {
      return HttpResponse.json(
        { error: { message: 'Match not found' } },
        { status: 404 },
      );
    }
    return HttpResponse.json({ data: match });
  }),

  http.get('/matches/:matchId/score', ({ params }) => {
    const innings = liveScoreData[params.matchId as string];
    if (!innings) {
      const match = matches.find((m) => m.id === params.matchId);
      if (!match) {
        return HttpResponse.json(
          { error: { message: 'Match not found' } },
          { status: 404 },
        );
      }
      return HttpResponse.json({
        data: {
          matchId: match.id,
          innings: match.score?.teamAInnings?.[0] ?? null,
          currentInningsIndex: 0,
          lastBalls: [],
        },
      });
    }

    return HttpResponse.json({
      data: {
        matchId: params.matchId,
        innings: [innings],
        currentInningsIndex: 0,
        lastBalls: [],
      },
    });
  }),

  http.post('/matches/:matchId/score', async ({ params, request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    const match = matches.find((m) => m.id === params.matchId);
    if (!match) {
      return HttpResponse.json(
        { error: { message: 'Match not found' } },
        { status: 404 },
      );
    }
    return HttpResponse.json({
      data: {
        matchId: params.matchId,
        updated: true,
        score: body,
      },
    });
  }),

  http.post('/matches', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    const newMatch: Match = {
      id: `match-${matches.length + 1}`,
      tournamentId: (body.tournamentId as string) ?? 'tournament-1',
      teamA: body.teamA as Match['teamA'] ?? teamA,
      teamB: body.teamB as Match['teamB'] ?? teamB,
      status: 'scheduled',
      scheduledAt: (body.scheduledAt as string) ?? new Date().toISOString(),
      venue: (body.venue as string) ?? 'Tribhuvan University Ground',
    };
    matches.push(newMatch);
    return HttpResponse.json({ data: newMatch }, { status: 201 });
  }),
];
