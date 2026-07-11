import { http, HttpResponse } from 'msw';

const notifications = [
  { id: '1', type: 'info', title: 'Tournament Updated', message: 'NPL 2024 schedule has been updated', read: false, createdAt: '2026-07-10T10:00:00Z' },
  { id: '2', type: 'success', title: 'Match Completed', message: 'NPL Final has ended', read: true, createdAt: '2026-07-09T18:00:00Z' },
  { id: '3', type: 'warning', title: 'Venue Conflict', message: 'Tribhuvan University Ground is booked on Jul 15', read: false, createdAt: '2026-07-08T09:00:00Z' },
];

export const notificationsHandlers = [
  http.get('*/notifications', () => {
    return HttpResponse.json({ data: notifications, total: notifications.length });
  }),
  http.patch('*/notifications/read-all', () => {
    notifications.forEach((n) => { n.read = true; });
    return HttpResponse.json({ success: true });
  }),
  http.patch('*/notifications/:id/read', ({ params }) => {
    const n = notifications.find((n) => n.id === params.id);
    if (n) n.read = true;
    return HttpResponse.json({ success: true });
  }),
  http.delete('*/notifications/:id', ({ params }) => {
    const idx = notifications.findIndex((n) => n.id === params.id);
    if (idx !== -1) notifications.splice(idx, 1);
    return HttpResponse.json({ success: true });
  }),
];
