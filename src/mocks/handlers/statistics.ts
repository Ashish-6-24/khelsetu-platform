import { http, HttpResponse } from 'msw';

const statistics = {
  batting: [
    { playerId: 'p1', name: 'Rohit Kumar', runs: 67, balls: 45, fours: 8, sixes: 2, strikeRate: 148.89 },
    { playerId: 'p2', name: 'Aarav Patel', runs: 43, balls: 38, fours: 5, sixes: 1, strikeRate: 113.16 },
  ],
  bowling: [
    { playerId: 'p3', name: 'Sandeep Lamichhane', overs: 4, maidens: 0, runs: 23, wickets: 4, economy: 5.75 },
    { playerId: 'p4', name: 'Karan Shrestha', overs: 4, maidens: 1, runs: 31, wickets: 2, economy: 7.75 },
  ],
  fallOfWickets: [{ wicket: 1, runs: 34, over: 5.2, batter: 'Rohit Kumar' }, { wicket: 2, runs: 89, over: 12.4, batter: 'Aarav Patel' }],
  partnerships: [{ between: ['Rohit Kumar', 'Vijay Thapa'], runs: 55, balls: 32 }],
};

export const statisticsHandlers = [
  http.get('*/matches/:matchId/statistics', () => HttpResponse.json({ data: statistics })),
];
