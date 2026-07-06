import type { Tournament } from '@shared/types/tournament';

export function makeTournament(
  overrides: Partial<Tournament> = {},
): Tournament {
  return {
    id: overrides.id ?? '1',
    name: overrides.name ?? 'Nepal Premier League 2026',
    sport: overrides.sport ?? 'cricket',
    status: overrides.status ?? 'upcoming',
    format: overrides.format ?? 'round-robin',
    startDate: overrides.startDate ?? '2026-03-01',
    endDate: overrides.endDate ?? '2026-04-15',
    venue: overrides.venue ?? 'Tribhuvan University Ground',
    organizerId: overrides.organizerId ?? 'org-1',
    maxTeams: overrides.maxTeams ?? 8,
    currentTeams: overrides.currentTeams ?? 6,
    createdAt: overrides.createdAt ?? new Date().toISOString(),
    updatedAt: overrides.updatedAt ?? new Date().toISOString(),
  };
}
