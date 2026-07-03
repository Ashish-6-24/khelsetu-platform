interface Team {
  id: string;
  name: string;
  shortName: string;
  logo?: string;
}

interface Player {
  id: string;
  name: string;
  teamId: string;
  role: string;
}

let nextId = 1;

export function makeTeam(overrides: Partial<Team> = {}): Team {
  return {
    id: String(nextId++),
    name: `Team ${nextId}`,
    shortName: `T${nextId}`,
    ...overrides,
  };
}

export function makePlayer(overrides: Partial<Player> = {}): Player {
  return {
    id: `p${nextId++}`,
    name: `Player ${nextId}`,
    teamId: '1',
    role: 'batsman',
    ...overrides,
  };
}
