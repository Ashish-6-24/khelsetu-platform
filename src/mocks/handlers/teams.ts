import { HttpResponse, http } from 'msw';

import { makePlayer, makeTeam } from '../factories/team';

const teams = [
  makeTeam({
    id: 'team-1',
    name: 'Kathmandu Kings',
    shortName: 'KKT',
    tournamentId: 'tournament-1',
    players: [
      makePlayer({
        id: 'p1',
        name: 'Rohit Paudel',
        teamId: 'team-1',
        stats: { matches: 5, runs: 234, wickets: 0 },
      }),
      makePlayer({
        id: 'p2',
        name: 'Dipendra Singh Airee',
        teamId: 'team-1',
        stats: { matches: 5, runs: 156, wickets: 12 },
      }),
      makePlayer({
        id: 'p3',
        name: 'Kushal Bhurtel',
        teamId: 'team-1',
        stats: { matches: 5, runs: 189, wickets: 0 },
      }),
    ],
    stats: { played: 5, won: 3, lost: 1, drawn: 1, points: 7, nrr: 0.45 },
  }),
  makeTeam({
    id: 'team-2',
    name: 'Pokhara Strikers',
    shortName: 'PKR',
    tournamentId: 'tournament-1',
    players: [
      makePlayer({
        id: 'p4',
        name: 'Aasif Sheikh',
        teamId: 'team-2',
        stats: { matches: 5, runs: 198, wickets: 0 },
      }),
      makePlayer({
        id: 'p5',
        name: 'Sompal Kami',
        teamId: 'team-2',
        stats: { matches: 5, runs: 45, wickets: 10 },
      }),
    ],
    stats: { played: 5, won: 4, lost: 1, drawn: 0, points: 8, nrr: 0.82 },
  }),
  makeTeam({
    id: 'team-3',
    name: 'Chitwan Tigers',
    shortName: 'CHT',
    tournamentId: 'tournament-1',
    players: [
      makePlayer({
        id: 'p6',
        name: 'Gyanendra Malla',
        teamId: 'team-3',
        stats: { matches: 5, runs: 176, wickets: 0 },
      }),
      makePlayer({
        id: 'p7',
        name: 'Sandeep Lamichhane',
        teamId: 'team-3',
        stats: { matches: 5, runs: 12, wickets: 14 },
      }),
    ],
    stats: { played: 5, won: 2, lost: 3, drawn: 0, points: 4, nrr: -0.15 },
  }),
  makeTeam({
    id: 'team-4',
    name: 'Lalitpur Patriots',
    shortName: 'LPT',
    tournamentId: 'tournament-1',
    players: [
      makePlayer({
        id: 'p8',
        name: 'Binod Bhandari',
        teamId: 'team-4',
        stats: { matches: 5, runs: 145, wickets: 0 },
      }),
      makePlayer({
        id: 'p9',
        name: 'Lalit Rajbanshi',
        teamId: 'team-4',
        stats: { matches: 5, runs: 28, wickets: 8 },
      }),
    ],
    stats: { played: 5, won: 1, lost: 4, drawn: 0, points: 2, nrr: -0.68 },
  }),
  makeTeam({
    id: 'team-5',
    name: 'Bhaktapur Gladiators',
    shortName: 'BKT',
    tournamentId: 'tournament-1',
    players: [
      makePlayer({
        id: 'p10',
        name: 'Sharad Vesawkar',
        teamId: 'team-5',
        stats: { matches: 5, runs: 167, wickets: 3 },
      }),
    ],
    stats: { played: 5, won: 3, lost: 2, drawn: 0, points: 6, nrr: 0.12 },
  }),
  makeTeam({
    id: 'team-6',
    name: 'Morang Falcons',
    shortName: 'MNG',
    tournamentId: 'tournament-1',
    players: [
      makePlayer({
        id: 'p11',
        name: 'Paras Khadka',
        teamId: 'team-6',
        stats: { matches: 5, runs: 198, wickets: 6 },
      }),
    ],
    stats: { played: 5, won: 2, lost: 2, drawn: 1, points: 5, nrr: 0.05 },
  }),
];

export const teamHandlers = [
  http.get('/teams', ({ request }) => {
    const url = new URL(request.url);
    const tournamentId = url.searchParams.get('tournamentId');

    let filtered = teams;
    if (tournamentId) {
      filtered = teams.filter((t) => t.tournamentId === tournamentId);
    }

    return HttpResponse.json({ data: filtered, total: filtered.length });
  }),

  http.get('/teams/:id', ({ params }) => {
    const team = teams.find((t) => t.id === params.id);
    if (!team) {
      return HttpResponse.json(
        { error: { message: 'Team not found' } },
        { status: 404 },
      );
    }
    return HttpResponse.json({ data: team });
  }),

  http.get('/teams/:id/players', ({ params }) => {
    const team = teams.find((t) => t.id === params.id);
    if (!team) {
      return HttpResponse.json(
        { error: { message: 'Team not found' } },
        { status: 404 },
      );
    }
    return HttpResponse.json({
      data: team.players,
      total: team.players.length,
    });
  }),

  http.post('/teams', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    const newTeam = makeTeam({
      id: `team-${teams.length + 1}`,
      name: body.name as string,
      shortName: body.shortName as string,
      tournamentId: body.tournamentId as string,
    });
    teams.push(newTeam);
    return HttpResponse.json({ data: newTeam }, { status: 201 });
  }),

  http.put('/teams/:id', async ({ params, request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    const index = teams.findIndex((t) => t.id === params.id);
    if (index === -1) {
      return HttpResponse.json(
        { error: { message: 'Team not found' } },
        { status: 404 },
      );
    }
    const team = teams[index]!;
    if (body.name) team.name = body.name as string;
    if (body.shortName) team.shortName = body.shortName as string;
    return HttpResponse.json({ data: team });
  }),

  http.delete('/teams/:id', ({ params }) => {
    const index = teams.findIndex((t) => t.id === params.id);
    if (index === -1) {
      return HttpResponse.json(
        { error: { message: 'Team not found' } },
        { status: 404 },
      );
    }
    teams.splice(index, 1);
    return HttpResponse.json({ success: true });
  }),
];
