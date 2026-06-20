import type { Position } from '../types/index';

export interface PitchPosition {
  position: Position;
  x: number;
  y: number;
}

export function snapToGrid(
  x: number,
  y: number,
  gridSize: number = 5,
): { x: number; y: number } {
  return {
    x: Math.round(x / gridSize) * gridSize,
    y: Math.round(y / gridSize) * gridSize,
  };
}

export function clampPosition(x: number, y: number): { x: number; y: number } {
  return {
    x: Math.max(0, Math.min(100, x)),
    y: Math.max(0, Math.min(100, y)),
  };
}

export function getPositionLabel(position: Position): string {
  const labels: Record<Position, string> = {
    GK: 'GK',
    LB: 'LB',
    RB: 'RB',
    CB: 'CB',
    LWB: 'LWB',
    RWB: 'RWB',
    CDM: 'CDM',
    CM: 'CM',
    CAM: 'CAM',
    LW: 'LW',
    RW: 'RW',
    ST: 'ST',
  };
  return labels[position] ?? position;
}
