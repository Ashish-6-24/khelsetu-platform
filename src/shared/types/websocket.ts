export type WebSocketEvent =
  | 'connect'
  | 'disconnect'
  | 'score_update'
  | 'match_start'
  | 'match_end'
  | 'tournament_update'
  | 'standings_update'
  | 'notification'
  | 'user_join'
  | 'user_leave'
  | 'error';

export interface WebSocketMessage<T = unknown> {
  event: WebSocketEvent;
  data: T;
  timestamp: string;
  matchId?: string;
  tournamentId?: string;
}

export interface WebSocketState {
  isConnected: boolean;
  isConnecting: boolean;
  lastConnected: string | null;
  reconnectAttempts: number;
  maxReconnectAttempts: number;
}

export interface ScoreUpdatePayload {
  matchId: string;
  teamId: string;
  runs: number;
  wickets: number;
  overs: number;
  runRate: number;
}

export interface LiveScoreUpdatePayload {
  matchId: string;
  sport: import('./scoring').SportType;
  score: import('./scoring').MatchScore;
}

export interface MatchStartPayload {
  matchId: string;
  startedAt: string;
}

export interface MatchEndPayload {
  matchId: string;
  endedAt: string;
  result?: Record<string, unknown>;
}

export interface MatchStatusPayload {
  matchId: string;
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
  startedAt?: string;
  endedAt?: string;
}

export interface NotificationPayload {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface StandingsUpdatePayload {
  tournamentId: string;
  standings: Array<{
    teamId: string;
    teamName: string;
    played: number;
    won: number;
    lost: number;
    drawn: number;
    points: number;
    nrr?: number;
  }>;
}
