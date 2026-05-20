export type TournamentStatus =
  | 'draft'
  | 'upcoming'
  | 'live'
  | 'completed'
  | 'cancelled';
export type TournamentFormat = 'knockout' | 'league' | 'round-robin' | 'swiss';
export type MatchStatus =
  | 'scheduled'
  | 'live'
  | 'completed'
  | 'cancelled'
  | 'postponed';

export interface Tournament {
  id: string;
  name: string;
  description?: string;
  sport: string;
  format: TournamentFormat;
  status: TournamentStatus;
  startDate: string;
  endDate: string;
  venue: string;
  organizerId: string;
  maxTeams: number;
  currentTeams: number;
  rules?: string;
  prizePool?: number;
  entryFee?: number;
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo?: string;
  tournamentId: string;
  captain?: string;
  players: Player[];
  stats: TeamStats;
  createdAt: string;
}

export interface Player {
  id: string;
  name: string;
  jerseyNumber?: number;
  position?: string;
  teamId?: string;
  stats: PlayerStats;
}

export interface Match {
  id: string;
  tournamentId: string;
  teamA: Team;
  teamB: Team;
  status: MatchStatus;
  scheduledAt: string;
  startedAt?: string;
  endedAt?: string;
  venue: string;
  round?: string;
  score?: MatchScore;
  winner?: Team;
}

export interface MatchScore {
  teamAScore: number;
  teamBScore: number;
  teamAInnings?: Innings[];
  teamBInnings?: Innings[];
}

export interface Innings {
  teamId: string;
  runs: number;
  wickets: number;
  overs: number;
  extras?: number;
}

export interface TeamStats {
  played: number;
  won: number;
  lost: number;
  drawn: number;
  points: number;
  nrr?: number;
}

export interface PlayerStats {
  matches: number;
  runs?: number;
  wickets?: number;
  goals?: number;
  assists?: number;
}

export interface CreateTournamentInput {
  name: string;
  description?: string;
  sport: string;
  format: TournamentFormat;
  startDate: string;
  endDate: string;
  venue: string;
  maxTeams: number;
  rules?: string;
  prizePool?: number;
  entryFee?: number;
}
