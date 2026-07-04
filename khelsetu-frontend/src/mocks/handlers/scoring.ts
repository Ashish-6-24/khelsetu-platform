import { HttpResponse, http } from 'msw';

export const scoringHandlers = [
  http.get('/matches/:matchId', ({ params }) => {
    return HttpResponse.json({
      id: params.matchId,
      matchId: params.matchId,
      innings: 1,
      score: '142/3',
      overs: 15.2,
      runRate: 9.28,
      batsmen: [
        { name: 'Aasif Sheikh', runs: 45, balls: 32, fours: 5, sixes: 2 },
        { name: 'Gyanendra Malla', runs: 28, balls: 21, fours: 3, sixes: 1 },
      ],
      bowler: {
        name: 'Sompal Kami',
        overs: 3.2,
        maidens: 0,
        runs: 28,
        wickets: 1,
      },
    });
  }),

  http.get('/matches', () => {
    return HttpResponse.json({
      data: [
        {
          id: '1',
          teamA: { id: '1', name: 'Kathmandu Kings' },
          teamB: { id: '2', name: 'Pokhara Rhinos' },
          status: 'live',
          score: '142/3',
          overs: 15.2,
        },
      ],
      total: 1,
    });
  }),

  http.post('/matches/:matchId/score', async ({ params }) => {
    return HttpResponse.json(
      { matchId: params.matchId, updated: true },
      { status: 201 },
    );
  }),
];
