import { HttpResponse, http } from 'msw';

import type { Venue } from '@shared/types/tournament';

const venues: Venue[] = [
  {
    id: 'venue-1',
    name: 'Tribhuvan University Ground',
    location: 'Kirtipur, Kathmandu',
    capacity: 15000,
    facilities: ['Floodlights', 'Covered Stands', 'Parking'],
    status: 'available',
    homeTeam: 'Kathmandu Kings',
  },
  {
    id: 'venue-2',
    name: 'Dasarath Stadium',
    location: 'Dasharath, Kathmandu',
    capacity: 25000,
    facilities: ['Floodlights', 'Covered Stands', 'Parking', 'VIP Box'],
    status: 'available',
  },
  {
    id: 'venue-3',
    name: 'Pokhara Cricket Ground',
    location: 'Pokhara, Kaski',
    capacity: 10000,
    facilities: ['Floodlights', 'Parking'],
    status: 'available',
    homeTeam: 'Pokhara Strikers',
  },
  {
    id: 'venue-4',
    name: 'Chitwan National Stadium',
    location: 'Bharatpur, Chitwan',
    capacity: 12000,
    facilities: ['Floodlights', 'Covered Stands'],
    status: 'available',
    homeTeam: 'Chitwan Tigers',
  },
  {
    id: 'venue-5',
    name: 'Biratnagar Cricket Ground',
    location: 'Biratnagar, Morang',
    capacity: 8000,
    facilities: ['Parking'],
    status: 'maintenance',
  },
];

export const venueHandlers = [
  http.get('/venues', ({ request }) => {
    const url = new URL(request.url);
    const status = url.searchParams.get('status');

    let filtered = venues;
    if (status) {
      filtered = venues.filter((v) => v.status === status);
    }

    return HttpResponse.json({ data: filtered, total: filtered.length });
  }),

  http.get('/venues/:id', ({ params }) => {
    const venue = venues.find((v) => v.id === params.id);
    if (!venue) {
      return HttpResponse.json(
        { error: { message: 'Venue not found' } },
        { status: 404 },
      );
    }
    return HttpResponse.json({ data: venue });
  }),

  http.post('/venues', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    const newVenue: Venue = {
      id: `venue-${venues.length + 1}`,
      name: (body.name as string) ?? 'New Venue',
      location: (body.location as string) ?? 'Nepal',
      capacity: (body.capacity as number) ?? 5000,
      facilities: (body.facilities as string[]) ?? [],
      status: 'available',
    };
    venues.push(newVenue);
    return HttpResponse.json({ data: newVenue }, { status: 201 });
  }),

  http.put('/venues/:id', async ({ params, request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    const index = venues.findIndex((v) => v.id === params.id);
    if (index === -1) {
      return HttpResponse.json(
        { error: { message: 'Venue not found' } },
        { status: 404 },
      );
    }
    const venue = venues[index]!;
    if (body.name) venue.name = body.name as string;
    if (body.status) venue.status = body.status as Venue['status'];
    return HttpResponse.json({ data: venue });
  }),
];
