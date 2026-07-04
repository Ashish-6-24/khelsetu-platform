import { HttpResponse, http } from 'msw';

import { makePlayer, makeTeam } from '../factories/team';

const teams = [
  makeTeam({ id: '1', name: 'Kathmandu Kings', shortName: 'KKT' }),
  makeTeam({ id: '2', name: 'Pokhara Rhinos', shortName: 'PKR' }),
  makeTeam({ id: '3', name: 'Chitwan Tigers', shortName: 'CHT' }),
];

export const teamHandlers = [
  http.get('/teams', () => {
    return HttpResponse.json({ data: teams, total: teams.length });
  }),

  http.get('/teams/:id', ({ params }) => {
    const team = teams.find((t) => t.id === params.id);
    if (!team)
      return HttpResponse.json({ error: 'Not found' }, { status: 404 });
    return HttpResponse.json(team);
  }),

  http.get('/teams/:id/players', ({ params }) => {
    return HttpResponse.json({
      data: [
        makePlayer({ teamId: params.id as string, name: 'Rohit Paudel' }),
        makePlayer({
          teamId: params.id as string,
          name: 'Dipendra Singh Airee',
        }),
      ],
    });
  }),
];
