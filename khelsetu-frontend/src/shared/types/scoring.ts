export type SportType = 'cricket' | 'football' | 'volleyball' | 'basketball';

// ==================== CRICKET TYPES ====================

export type CricketScoreType = 'run' | 'wicket' | 'extra' | 'over';
export type CricketExtraType = 'wide' | 'no-ball' | 'bye' | 'leg-bye';
export type CricketWicketType =
  | 'bowled'
  | 'caught'
  | 'lbw'
  | 'run-out'
  | 'stumped'
  | 'hit-wicket';

export interface CricketBall {
  id: string;
  matchId: string;
  innings: number;
  over: number;
  ball: number;
  batsmanId: string;
  bowlerId: string;
  runs: number;
  isExtra: boolean;
  extraType?: CricketExtraType;
  isWicket: boolean;
  wicketType?: CricketWicketType;
  dismissedPlayerId?: string;
  timestamp: string;
}

export interface CricketBatsmanScore {
  playerId: string;
  playerName: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  isOnStrike: boolean;
  isOut: boolean;
}

export interface CricketBowlerScore {
  playerId: string;
  playerName: string;
  overs: number;
  maidens: number;
  runs: number;
  wickets: number;
  economy: number;
  isBowling: boolean;
}

export interface CricketPartnership {
  runs: number;
  balls: number;
  batsmanAId: string;
  batsmanAName: string;
  batsmanBId: string;
  batsmanBName: string;
}

export interface CricketInnings {
  inningsNumber: number;
  battingTeamId: string;
  battingTeamName: string;
  bowlingTeamId: string;
  bowlingTeamName: string;
  runs: number;
  wickets: number;
  overs: number;
  balls: CricketBall[];
  batsmen: CricketBatsmanScore[];
  bowlers: CricketBowlerScore[];
  currentStrikerId: string;
  currentNonStrikerId: string;
  currentBowlerId: string;
  partnership?: CricketPartnership;
  isComplete: boolean;
}

export interface CricketScore {
  matchId: string;
  innings: CricketInnings[];
  currentInningsIndex: number;
  lastBalls: CricketBall[];
}

// ==================== FOOTBALL TYPES ====================

export type FootballPeriod =
  | 'first_half'
  | 'second_half'
  | 'extra_time_first'
  | 'extra_time_second'
  | 'penalties';

export type FootballEventType =
  | 'goal'
  | 'own_goal'
  | 'yellow_card'
  | 'red_card'
  | 'second_yellow'
  | 'substitution'
  | 'var_review'
  | 'penalty_awarded'
  | 'penalty_scored'
  | 'penalty_missed'
  | 'free_kick'
  | 'corner'
  | 'offside'
  | 'foul'
  | 'shot_on_target'
  | 'shot_off_target'
  | 'save';

export interface FootballEvent {
  id: string;
  matchId: string;
  minute: number;
  extraMinute?: number;
  period: FootballPeriod;
  type: FootballEventType;
  teamId: string;
  teamName: string;
  playerId: string;
  playerName: string;
  assistPlayerId?: string;
  assistPlayerName?: string;
  substitutedOutPlayerId?: string;
  substitutedOutPlayerName?: string;
  substitutedInPlayerId?: string;
  substitutedInPlayerName?: string;
  description?: string;
  timestamp: string;
}

export interface FootballTeamStats {
  teamId: string;
  teamName: string;
  goals: number;
  shots: number;
  shotsOnTarget: number;
  corners: number;
  fouls: number;
  yellowCards: number;
  redCards: number;
  possession: number;
  offsides: number;
  saves: number;
}

export interface PenaltyShootout {
  teamAPenalties: { playerId: string; playerName: string; scored: boolean }[];
  teamBPenalties: { playerId: string; playerName: string; scored: boolean }[];
}

export interface FootballScore {
  matchId: string;
  teamA: FootballTeamStats;
  teamB: FootballTeamStats;
  currentPeriod: FootballPeriod;
  currentMinute: number;
  isRunning: boolean;
  events: FootballEvent[];
  penalties?: PenaltyShootout;
}

// ==================== VOLLEYBALL TYPES ====================

export type VolleyballEventType =
  | 'point'
  | 'ace'
  | 'block'
  | 'attack'
  | 'error'
  | 'fault'
  | 'rotation'
  | 'timeout'
  | 'substitution';

export interface VolleyballSet {
  setNumber: number;
  teamAPoints: number;
  teamBPoints: number;
  winner: 'teamA' | 'teamB' | null;
  events: VolleyballEvent[];
}

export interface VolleyballEvent {
  id: string;
  matchId: string;
  setNumber: number;
  pointNumber: number;
  type: VolleyballEventType;
  teamId: string;
  teamName: string;
  playerId?: string;
  playerName?: string;
  timestamp: string;
}

export interface VolleyballScore {
  matchId: string;
  teamAName: string;
  teamBName: string;
  currentSet: number;
  sets: VolleyballSet[];
  teamASetsWon: number;
  teamBSetsWon: number;
  currentPoint: { teamA: number; teamB: number };
  servingTeam: 'teamA' | 'teamB';
  timeoutsUsed: { teamA: number; teamB: number };
  substitutionsUsed: { teamA: number; teamB: number };
}

// ==================== BASKETBALL TYPES ====================

export type BasketballEventType =
  | '2pt'
  | '3pt'
  | 'free_throw'
  | 'miss'
  | 'rebound_offensive'
  | 'rebound_defensive'
  | 'assist'
  | 'steal'
  | 'block'
  | 'turnover'
  | 'foul_personal'
  | 'foul_technical'
  | 'foul_flagrant'
  | 'timeout'
  | 'substitution';

export interface BasketballQuarter {
  quarterNumber: number;
  teamAPoints: number;
  teamBPoints: number;
}

export interface BasketballEvent {
  id: string;
  matchId: string;
  quarter: number;
  minute: number;
  second: number;
  type: BasketballEventType;
  teamId: string;
  teamName: string;
  playerId: string;
  playerName: string;
  points?: number;
  description?: string;
  timestamp: string;
}

export interface BasketballTeamStats {
  teamId: string;
  teamName: string;
  points: number;
  fouls: number;
  timeoutsRemaining: number;
  rebounds: number;
  assists: number;
  turnovers: number;
  steals: number;
  blocks: number;
}

export interface BasketballScore {
  matchId: string;
  teamA: BasketballTeamStats;
  teamB: BasketballTeamStats;
  currentQuarter: number;
  quarters: BasketballQuarter[];
  events: BasketballEvent[];
  shotClock: number;
  isRunning: boolean;
}

// ==================== UNIFIED TYPES ====================

export type MatchScore =
  | CricketScore
  | FootballScore
  | VolleyballScore
  | BasketballScore;

export interface MatchConfig {
  sport: SportType;
  oversPerInnings?: number;
  inningsCount?: number;
  halfDurationMinutes?: number;
  extraTimeEnabled?: boolean;
  setsToWin?: number;
  pointsPerSet?: number;
  quarterDurationMinutes?: number;
  shotClockSeconds?: number;
}

export interface ScoreEntry {
  id: string;
  matchId: string;
  teamId: string;
  playerId: string;
  type: string;
  value: number;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface ScoreUpdate {
  matchId: string;
  sport: SportType;
  type: string;
  data: Record<string, unknown>;
  timestamp: string;
}
