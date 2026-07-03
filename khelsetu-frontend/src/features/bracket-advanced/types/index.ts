export type BracketFormat =
  | 'single-elimination'
  | 'double-elimination'
  | 'knockout'
  | 'round-robin'
  | 'group-to-knockout';

export interface BracketMatch {
  id: string;
  round: number;
  position: number;
  teamA: BracketTeam | null;
  teamB: BracketTeam | null;
  scoreA: number | null;
  scoreB: number | null;
  winner: 'teamA' | 'teamB' | null;
  status:
    'pending' | 'live' | 'completed' | 'bye' | 'walkover' | 'disqualified';
  venue?: string;
  scheduledAt?: string;
  nextMatchId?: string;
  nextSlot?: 'teamA' | 'teamB';
}

export interface BracketTeam {
  id: string;
  name: string;
  shortName: string;
  logo?: string;
  seed?: number;
}

export interface BracketRound {
  number: number;
  name: string;
  matches: BracketMatch[];
}

export interface BracketData {
  format: BracketFormat;
  rounds: BracketRound[];
  champion: BracketTeam | null;
  totalMatches: number;
  completedMatches: number;
}
