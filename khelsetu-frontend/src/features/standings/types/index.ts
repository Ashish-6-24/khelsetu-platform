export interface Standing {
  teamId: string;
  teamName: string;
  played: number;
  won: number;
  lost: number;
  drawn: number;
  points: number;
  nrr?: number;
}

export interface StandingUpdate {
  tournamentId: string;
  standings: Standing[];
}
