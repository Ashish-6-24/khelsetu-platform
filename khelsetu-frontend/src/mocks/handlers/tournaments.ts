import { HttpResponse, http } from 'msw';

import { makeTournament } from '../factories/tournament';

const tournaments = [
  makeTournament({
    id: '1',
    name: 'Nepal Premier League 2026',
    status: 'live',
  }),
  makeTournament({ id: '2', name: 'Kathmandu Cup', status: 'upcoming' }),
  makeTournament({ id: '3', name: 'Pokhara Open', status: 'completed' }),
];

export const tournamentHandlers = [
  http.get('/tournaments', () => {
    return HttpResponse.json({ data: tournaments, total: tournaments.length });
  }),

  http.get('/tournaments/:id', ({ params }) => {
    const tournament = tournaments.find((t) => t.id === params.id);
    if (!tournament)
      return HttpResponse.json({ error: 'Not found' }, { status: 404 });
    return HttpResponse.json(tournament);
  }),

  http.post('/tournaments', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json(
      makeTournament({ id: '4', ...body } as Partial<
        ReturnType<typeof makeTournament>
      >),
      { status: 201 },
    );
  }),
];
