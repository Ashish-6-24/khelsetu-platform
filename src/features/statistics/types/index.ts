export interface MatchStatistics {
  matchId: string;
  teamA: TeamStatistics;
  teamB: TeamStatistics;
  playerStats: PlayerMatchStat[];
}

export interface TeamStatistics {
  teamId: string;
  teamName: string;
  possession: number;
  shotsOnTarget: number;
  shotsOffTarget: number;
  totalShots: number;
  passAccuracy: number;
  totalPasses: number;
  successfulPasses: number;
  fouls: number;
  corners: number;
  yellowCards: number;
  redCards: number;
  saves: number;
  offsides: number;
  goals: number;
  assists: number;
}

export interface PlayerMatchStat {
  playerId: string;
  playerName: string;
  teamId: string;
  teamName: string;
  position: string;
  minutesPlayed: number;
  goals: number;
  assists: number;
  shots: number;
  shotsOnTarget: number;
  passes: number;
  passAccuracy: number;
  tackles: number;
  interceptions: number;
  saves: number;
  yellowCards: number;
  redCards: number;
  rating: number;
}
