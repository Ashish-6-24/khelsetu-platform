import type {
  TournamentFormat,
  TournamentStatus,
} from '@shared/types/tournament';

interface Tournament {
  id: string;
  name: string;
  status: TournamentStatus;
  format: TournamentFormat;
  startDate: string;
  endDate: string;
  teams: number;
}

export function makeTournament(
  overrides: Partial<Tournament> = {},
): Tournament {
  return {
    id: '1',
    name: 'Nepal Premier League 2026',
    status: 'upcoming',
    format: 'round-robin',
    startDate: '2026-03-01',
    endDate: '2026-04-15',
    teams: 8,
    ...overrides,
  };
}
