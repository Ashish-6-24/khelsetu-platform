import { http, HttpResponse } from 'msw';

const players: Record<string, { id: string; name: string; team: string; role: string; battingStyle: string; bowlingStyle: string; age: number; matches: number; runs: number; wickets: number }> = {
  '1': { id: '1', name: 'Sandeep Lamichhane', team: 'Kathmandu Kings', role: 'Bowler', battingStyle: 'Right-hand', bowlingStyle: 'Leg-break googly', age: 24, matches: 45, runs: 120, wickets: 72 },
  '2': { id: '2', name: 'Rohit Kumar', team: 'Pokhara Strikers', role: 'Batsman', battingStyle: 'Right-hand', bowlingStyle: 'None', age: 28, matches: 52, runs: 1850, wickets: 0 },
  '3': { id: '3', name: 'Aarav Patel', team: 'Lalitpur Warriors', role: 'All-rounder', battingStyle: 'Left-hand', bowlingStyle: 'Left-arm orthodox', age: 26, matches: 38, runs: 920, wickets: 28 },
  '4': { id: '4', name: 'Karan Shrestha', team: 'Chitwan Rhinos', role: 'Bowler', battingStyle: 'Right-hand', bowlingStyle: 'Right-arm fast', age: 22, matches: 20, runs: 85, wickets: 34 },
  '5': { id: '5', name: 'Vijay Thapa', team: 'Kathmandu Kings', role: 'Wicketkeeper', battingStyle: 'Right-hand', bowlingStyle: 'None', age: 25, matches: 40, runs: 1100, wickets: 0 },
  '6': { id: '6', name: 'Anil Mandal', team: 'Pokhara Strikers', role: 'Batsman', battingStyle: 'Left-hand', bowlingStyle: 'Right-arm offbreak', age: 30, matches: 60, runs: 2200, wickets: 12 },
};

export const playersHandlers = [
  http.get('*/players/:id', ({ params }) => {
    const player = players[params.id as string];
    if (!player) return HttpResponse.json({ error: 'Player not found' }, { status: 404 });
    return HttpResponse.json({ data: player });
  }),
  http.patch('*/players/:id', ({ params }) => {
    const player = players[params.id as string];
    if (!player) return HttpResponse.json({ error: 'Player not found' }, { status: 404 });
    return HttpResponse.json({ data: player, success: true });
  }),
];
