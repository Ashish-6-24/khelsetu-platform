import type {
  Player,
  PlayerStats,
  Team,
  TeamStats,
} from '@shared/types/tournament';

let nextId = 1;

export function makePlayer(overrides: Partial<Player> = {}): Player {
  const id = overrides.id ?? `p${nextId++}`;
  const stats: PlayerStats = {
    matches: 5,
    runs: 0,
    wickets: 0,
    ...overrides.stats,
  };

  return {
    id,
    name: overrides.name ?? `Player ${nextId}`,
    teamId: overrides.teamId ?? '1',
    stats,
  };
}

export function makeTeam(overrides: Partial<Team> = {}): Team {
  const id = overrides.id ?? String(nextId++);
  const stats: TeamStats = {
    played: 5,
    won: 3,
    lost: 1,
    drawn: 1,
    points: 7,
    nrr: 0.45,
    ...overrides.stats,
  };

  const players: Player[] = overrides.players ?? [
    makePlayer({ teamId: id, name: 'Rohit Paudel' }),
    makePlayer({ teamId: id, name: 'Dipendra Singh Airee' }),
  ];

  return {
    id,
    name: overrides.name ?? `Team ${nextId}`,
    shortName: overrides.shortName ?? `T${nextId}`,
    tournamentId: overrides.tournamentId ?? '1',
    players,
    stats,
    createdAt: overrides.createdAt ?? new Date().toISOString(),
  };
}
