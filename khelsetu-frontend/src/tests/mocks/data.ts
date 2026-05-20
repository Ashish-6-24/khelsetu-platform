export const mockUser = {
  id: 'user-1',
  email: 'test@example.com',
  name: 'Test User',
  role: 'admin' as const,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

export const mockTournament = {
  id: 'tournament-1',
  name: 'Test Tournament',
  sport: 'Cricket',
  format: 'league' as const,
  status: 'upcoming' as const,
  startDate: '2026-06-01T00:00:00.000Z',
  endDate: '2026-06-30T00:00:00.000Z',
  venue: 'Test Venue',
  organizerId: 'org-1',
  maxTeams: 16,
  currentTeams: 8,
  createdAt: '2026-05-01T00:00:00.000Z',
  updatedAt: '2026-05-19T00:00:00.000Z',
};

export const mockMatch = {
  id: 'match-1',
  tournamentId: 'tournament-1',
  teamA: {
    id: 'team-1',
    name: 'Team A',
    shortName: 'TEA',
    tournamentId: 'tournament-1',
    players: [],
    stats: { played: 0, won: 0, lost: 0, drawn: 0, points: 0 },
    createdAt: '2026-05-01T00:00:00.000Z',
  },
  teamB: {
    id: 'team-2',
    name: 'Team B',
    shortName: 'TEB',
    tournamentId: 'tournament-1',
    players: [],
    stats: { played: 0, won: 0, lost: 0, drawn: 0, points: 0 },
    createdAt: '2026-05-01T00:00:00.000Z',
  },
  status: 'scheduled' as const,
  scheduledAt: '2026-06-01T14:00:00.000Z',
  venue: 'Ground 1',
};
