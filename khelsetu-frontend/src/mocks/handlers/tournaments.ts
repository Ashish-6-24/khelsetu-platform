import { HttpResponse, http } from 'msw';

import { makeTournament } from '../factories/tournament';

const tournaments = [
  makeTournament({
    id: 'tournament-1',
    name: 'Nepal Premier League 2026',
    sport: 'cricket',
    status: 'live',
    format: 'round-robin',
    startDate: '2026-03-01',
    endDate: '2026-04-15',
    venue: 'Tribhuvan University Ground',
    organizerId: 'org-1',
    maxTeams: 8,
    currentTeams: 6,
  }),
  makeTournament({
    id: 'tournament-2',
    name: 'Kathmandu T20 Cup',
    sport: 'cricket',
    status: 'upcoming',
    format: 'knockout',
    startDate: '2026-05-01',
    endDate: '2026-05-15',
    venue: 'Dasarath Stadium',
    organizerId: 'org-1',
    maxTeams: 16,
    currentTeams: 12,
  }),
  makeTournament({
    id: 'tournament-3',
    name: 'Pokhara Open 2026',
    sport: 'football',
    status: 'completed',
    format: 'league',
    startDate: '2026-01-10',
    endDate: '2026-02-28',
    venue: 'Pokhara Cricket Ground',
    organizerId: 'org-2',
    maxTeams: 10,
    currentTeams: 10,
  }),
];

export const tournamentHandlers = [
  http.get('/tournaments', ({ request }) => {
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const sport = url.searchParams.get('sport');

    let filtered = tournaments;
    if (status) {
      filtered = filtered.filter((t) => t.status === status);
    }
    if (sport) {
      filtered = filtered.filter((t) => t.sport === sport);
    }

    return HttpResponse.json({ data: filtered, total: filtered.length });
  }),

  http.get('/tournaments/:id', ({ params }) => {
    const tournament = tournaments.find((t) => t.id === params.id);
    if (!tournament) {
      return HttpResponse.json(
        { error: { message: 'Tournament not found' } },
        { status: 404 },
      );
    }
    return HttpResponse.json({ data: tournament });
  }),

  http.post('/tournaments', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    const newTournament = makeTournament({
      id: `tournament-${tournaments.length + 1}`,
      name: body.name as string,
      sport: body.sport as string,
      status: body.status as 'draft' | 'upcoming' | 'live' | 'completed' | 'cancelled',
      format: body.format as 'knockout' | 'league' | 'round-robin' | 'swiss',
      startDate: body.startDate as string,
      endDate: body.endDate as string,
      venue: body.venue as string,
      organizerId: body.organizerId as string,
      maxTeams: body.maxTeams as number,
    });
    tournaments.push(newTournament);
    return HttpResponse.json({ data: newTournament }, { status: 201 });
  }),

  http.put('/tournaments/:id', async ({ params, request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    const index = tournaments.findIndex((t) => t.id === params.id);
    if (index === -1) {
      return HttpResponse.json(
        { error: { message: 'Tournament not found' } },
        { status: 404 },
      );
    }
    const tournament = tournaments[index]!;
    if (body.name) tournament.name = body.name as string;
    if (body.status) tournament.status = body.status as typeof tournament.status;
    return HttpResponse.json({ data: tournament });
  }),

  http.delete('/tournaments/:id', ({ params }) => {
    const index = tournaments.findIndex((t) => t.id === params.id);
    if (index === -1) {
      return HttpResponse.json(
        { error: { message: 'Tournament not found' } },
        { status: 404 },
      );
    }
    tournaments.splice(index, 1);
    return HttpResponse.json({ success: true });
  }),
];
