export type LiveEventType =
  | 'goal'
  | 'penalty_goal'
  | 'own_goal'
  | 'yellow_card'
  | 'red_card'
  | 'substitution'
  | 'corner'
  | 'free_kick'
  | 'offside'
  | 'injury'
  | 'var'
  | 'goalkeeper_save'
  | 'run'
  | 'boundary'
  | 'six'
  | 'wicket'
  | 'catch'
  | 'run_out'
  | 'wide'
  | 'no_ball'
  | 'point'
  | 'ace'
  | 'block'
  | 'timeout';

export interface LiveMatchEvent {
  id: string;
  matchId: string;
  minute: number;
  extraMinute?: number;
  period?: string;
  type: LiveEventType;
  sport: 'football' | 'cricket' | 'volleyball';
  teamId: string;
  teamName: string;
  playerId?: string;
  playerName?: string;
  description?: string;
  timestamp: string;
}

export type MatchPhase =
  | 'not_started'
  | 'first_half'
  | 'halftime'
  | 'second_half'
  | 'extra_time_first'
  | 'extra_time_second'
  | 'penalties'
  | 'completed';

export interface MatchTimerState {
  phase: MatchPhase;
  currentMinute: number;
  currentSecond: number;
  isRunning: boolean;
  startedAt: string | null;
  pausedAt: string | null;
  totalElapsedSeconds: number;
}

export type SportType = 'football' | 'cricket' | 'volleyball';

export interface LiveEventConfig {
  icon: string;
  label: string;
  color: string;
}

export interface TeamInfo {
  id: string;
  name: string;
}
