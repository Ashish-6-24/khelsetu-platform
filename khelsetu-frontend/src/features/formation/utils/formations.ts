import type { FormationTemplate, Position } from '../types/index';

export const FORMATION_TEMPLATES: FormationTemplate[] = [
  {
    name: '4-3-3',
    type: '4-3-3',
    positions: [
      { position: 'GK', x: 50, y: 90 },
      { position: 'LB', x: 15, y: 70 },
      { position: 'CB', x: 35, y: 72 },
      { position: 'CB', x: 65, y: 72 },
      { position: 'RB', x: 85, y: 70 },
      { position: 'CM', x: 30, y: 50 },
      { position: 'CM', x: 50, y: 48 },
      { position: 'CM', x: 70, y: 50 },
      { position: 'LW', x: 15, y: 30 },
      { position: 'ST', x: 50, y: 25 },
      { position: 'RW', x: 85, y: 30 },
    ],
  },
  {
    name: '4-4-2',
    type: '4-4-2',
    positions: [
      { position: 'GK', x: 50, y: 90 },
      { position: 'LB', x: 15, y: 70 },
      { position: 'CB', x: 35, y: 72 },
      { position: 'CB', x: 65, y: 72 },
      { position: 'RB', x: 85, y: 70 },
      { position: 'LW', x: 15, y: 50 },
      { position: 'CM', x: 38, y: 52 },
      { position: 'CM', x: 62, y: 52 },
      { position: 'RW', x: 85, y: 50 },
      { position: 'ST', x: 38, y: 28 },
      { position: 'ST', x: 62, y: 28 },
    ],
  },
  {
    name: '4-2-3-1',
    type: '4-2-3-1',
    positions: [
      { position: 'GK', x: 50, y: 90 },
      { position: 'LB', x: 15, y: 70 },
      { position: 'CB', x: 35, y: 72 },
      { position: 'CB', x: 65, y: 72 },
      { position: 'RB', x: 85, y: 70 },
      { position: 'CDM', x: 38, y: 58 },
      { position: 'CDM', x: 62, y: 58 },
      { position: 'LW', x: 18, y: 40 },
      { position: 'CAM', x: 50, y: 38 },
      { position: 'RW', x: 82, y: 40 },
      { position: 'ST', x: 50, y: 22 },
    ],
  },
  {
    name: '3-5-2',
    type: '3-5-2',
    positions: [
      { position: 'GK', x: 50, y: 90 },
      { position: 'CB', x: 25, y: 72 },
      { position: 'CB', x: 50, y: 74 },
      { position: 'CB', x: 75, y: 72 },
      { position: 'LWB', x: 10, y: 50 },
      { position: 'CM', x: 30, y: 52 },
      { position: 'CM', x: 50, y: 48 },
      { position: 'CM', x: 70, y: 52 },
      { position: 'RWB', x: 90, y: 50 },
      { position: 'ST', x: 38, y: 25 },
      { position: 'ST', x: 62, y: 25 },
    ],
  },
  {
    name: '5-3-2',
    type: '5-3-2',
    positions: [
      { position: 'GK', x: 50, y: 90 },
      { position: 'LB', x: 10, y: 68 },
      { position: 'CB', x: 28, y: 74 },
      { position: 'CB', x: 50, y: 76 },
      { position: 'CB', x: 72, y: 74 },
      { position: 'RB', x: 90, y: 68 },
      { position: 'CM', x: 32, y: 50 },
      { position: 'CM', x: 50, y: 46 },
      { position: 'CM', x: 68, y: 50 },
      { position: 'ST', x: 38, y: 25 },
      { position: 'ST', x: 62, y: 25 },
    ],
  },
];

export const POSITION_COLORS: Record<Position, string> = {
  GK: '#f59e0b',
  LB: '#3b82f6',
  RB: '#3b82f6',
  CB: '#1d4ed8',
  LWB: '#8b5cf6',
  RWB: '#8b5cf6',
  CDM: '#10b981',
  CM: '#22c55e',
  CAM: '#f97316',
  LW: '#ef4444',
  RW: '#ef4444',
  ST: '#dc2626',
};

export const POSITION_LABELS: Record<Position, string> = {
  GK: 'Goalkeeper',
  LB: 'Left Back',
  RB: 'Right Back',
  CB: 'Center Back',
  LWB: 'Left Wing Back',
  RWB: 'Right Wing Back',
  CDM: 'Defensive Midfielder',
  CM: 'Central Midfielder',
  CAM: 'Attacking Midfielder',
  LW: 'Left Winger',
  RW: 'Right Winger',
  ST: 'Striker',
};

export const TACTICAL_COLORS = [
  '#ffffff',
  '#ef4444',
  '#3b82f6',
  '#22c55e',
  '#f59e0b',
];

export const TACTICAL_TOOL_TYPES = [
  'arrow',
  'movement',
  'passing',
  'defensive',
  'attacking',
] as const;

export function getFormationByType(type: string) {
  return FORMATION_TEMPLATES.find((t) => t.type === type);
}
