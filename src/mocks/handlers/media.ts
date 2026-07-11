import { http, HttpResponse } from 'msw';

const media = [
  { id: 'm1', type: 'image', title: 'NPL Final - Winning Moment', url: '', thumbnail: '', uploadedAt: '2026-07-10T20:00:00Z', tournament: 'NPL 2024' },
  { id: 'm2', type: 'video', title: 'Best Catches of NPL', url: '', thumbnail: '', uploadedAt: '2026-07-09T15:00:00Z', tournament: 'NPL 2024' },
  { id: 'm3', type: 'image', title: 'Team Photo - Kathmandu Kings', url: '', thumbnail: '', uploadedAt: '2026-07-08T12:00:00Z', tournament: 'NPL 2024' },
];

export const mediaHandlers = [
  http.get('*/media', () => HttpResponse.json({ data: media, total: media.length })),
];
