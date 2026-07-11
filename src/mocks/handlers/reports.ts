import { http, HttpResponse } from 'msw';

const reports = [
  { id: 'r1', title: 'NPL 2024 Summary', type: 'tournament', createdAt: '2026-07-10T12:00:00Z', status: 'completed' },
  { id: 'r2', title: 'Player Performance Report', type: 'player', createdAt: '2026-07-09T10:00:00Z', status: 'completed' },
];

const matchReport = {
  summary: 'A thrilling match with excellent batting performances from both sides.',
  keyMoments: ['Powerplay: Team A scored 52/1', 'Middle overs: Steady build-up', 'Death overs: Team B chased down the target'],
  playerOfTheMatch: { id: 'p1', name: 'Sandeep Lamichhane', performance: '4/23' },
  scorecard: { teamA: { runs: 180, wickets: 6, overs: 20 }, teamB: { runs: 181, wickets: 4, overs: 19.2 } },
};

export const reportsHandlers = [
  http.get('*/reports', () => HttpResponse.json({ data: reports })),
  http.get('*/reports/:id/export', () => new HttpResponse('Report data (CSV)', { headers: { 'Content-Type': 'text/csv', 'Content-Disposition': 'attachment; filename=report.csv' } })),
  http.get('*/matches/:matchId/report', () => HttpResponse.json({ data: matchReport })),
  http.post('*/matches/:matchId/report/generate', () => HttpResponse.json({ data: matchReport, success: true })),
  http.put('*/matches/:matchId/report', () => HttpResponse.json({ success: true })),
  http.patch('*/matches/:matchId/report', () => HttpResponse.json({ success: true })),
];
