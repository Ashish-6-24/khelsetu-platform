import type { Standing } from '@shared/types/tournament';
import { HttpResponse, http } from 'msw';

const standings: Standing[] = [
  {
    tournamentId: 'tournament-1',
    teamId: 'team-2',
    teamName: 'Pokhara Strikers',
    played: 5,
    won: 4,
    lost: 1,
    drawn: 0,
    points: 8,
    nrr: 0.82,
    position: 1,
  },
  {
    tournamentId: 'tournament-1',
    teamId: 'team-1',
    teamName: 'Kathmandu Kings',
    played: 5,
    won: 3,
    lost: 1,
    drawn: 1,
    points: 7,
    nrr: 0.45,
    position: 2,
  },
  {
    tournamentId: 'tournament-1',
    teamId: 'team-5',
    teamName: 'Bhaktapur Gladiators',
    played: 5,
    won: 3,
    lost: 2,
    drawn: 0,
    points: 6,
    nrr: 0.12,
    position: 3,
  },
  {
    tournamentId: 'tournament-1',
    teamId: 'team-6',
    teamName: 'Morang Falcons',
    played: 5,
    won: 2,
    lost: 2,
    drawn: 1,
    points: 5,
    nrr: 0.05,
    position: 4,
  },
  {
    tournamentId: 'tournament-1',
    teamId: 'team-3',
    teamName: 'Chitwan Tigers',
    played: 5,
    won: 2,
    lost: 3,
    drawn: 0,
    points: 4,
    nrr: -0.15,
    position: 5,
  },
  {
    tournamentId: 'tournament-1',
    teamId: 'team-4',
    teamName: 'Lalitpur Patriots',
    played: 5,
    won: 1,
    lost: 4,
    drawn: 0,
    points: 2,
    nrr: -0.68,
    position: 6,
  },
];

export const standingHandlers = [
  http.get('/standings', ({ request }) => {
    const url = new URL(request.url);
    const tournamentId = url.searchParams.get('tournamentId');

    let filtered = standings;
    if (tournamentId) {
      filtered = standings.filter((s) => s.tournamentId === tournamentId);
    }

    return HttpResponse.json({ data: filtered, total: filtered.length });
  }),

  http.get('/tournaments/:tournamentId/standings', ({ params }) => {
    const filtered = standings.filter(
      (s) => s.tournamentId === params.tournamentId,
    );
    return HttpResponse.json({ data: filtered, total: filtered.length });
  }),

  http.post('/standings', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    const newStanding: Standing = {
      tournamentId: (body.tournamentId as string) ?? 'tournament-1',
      teamId: (body.teamId as string) ?? 'team-new',
      teamName: (body.teamName as string) ?? 'New Team',
      played: 0,
      won: 0,
      lost: 0,
      drawn: 0,
      points: 0,
      position: standings.length + 1,
    };
    standings.push(newStanding);
    return HttpResponse.json({ data: newStanding }, { status: 201 });
  }),

  http.put('/standings/:teamId', async ({ params, request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    const index = standings.findIndex((s) => s.teamId === params.teamId);
    if (index === -1) {
      return HttpResponse.json(
        { error: { message: 'Standing not found' } },
        { status: 404 },
      );
    }
    const standing = standings[index]!;
    if (body.played !== undefined) standing.played = body.played as number;
    if (body.won !== undefined) standing.won = body.won as number;
    if (body.lost !== undefined) standing.lost = body.lost as number;
    if (body.drawn !== undefined) standing.drawn = body.drawn as number;
    if (body.points !== undefined) standing.points = body.points as number;
    if (body.nrr !== undefined) standing.nrr = body.nrr as number;
    return HttpResponse.json({ data: standing });
  }),
];
