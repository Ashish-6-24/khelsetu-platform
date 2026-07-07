export type FormationType =
  '4-3-3' | '4-4-2' | '4-2-3-1' | '3-5-2' | '5-3-2' | 'custom';

export type Position =
  | 'GK'
  | 'LB'
  | 'RB'
  | 'CB'
  | 'LWB'
  | 'RWB'
  | 'CDM'
  | 'CM'
  | 'CAM'
  | 'LW'
  | 'RW'
  | 'ST';

export interface FormationPlayer {
  playerId: string;
  playerName: string;
  jerseyNumber: number;
  position: Position;
  x: number;
  y: number;
  isCaptain?: boolean;
}

export interface BenchPlayer {
  playerId: string;
  playerName: string;
  jerseyNumber: number;
  position: Position;
  status: 'substitute' | 'reserve' | 'injured' | 'suspended';
}

export interface Formation {
  id: string;
  matchId: string;
  teamId: string;
  formationType: FormationType;
  players: FormationPlayer[];
  bench: BenchPlayer[];
  createdAt: string;
  updatedAt: string;
}

export interface TacticalDrawing {
  id: string;
  type: 'arrow' | 'movement' | 'passing' | 'defensive' | 'attacking';
  points: Array<{ x: number; y: number }>;
  color: string;
}

export interface FormationTemplate {
  name: string;
  type: FormationType;
  positions: Array<{ position: Position; x: number; y: number }>;
}
