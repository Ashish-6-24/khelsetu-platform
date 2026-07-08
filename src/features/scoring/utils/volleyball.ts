import type {
  VolleyballEvent,
  VolleyballEventType,
} from '@shared/types/scoring';
import { secureRandomId } from '@shared/utils/crypto-random';

export const createVolleyballEvent = (
  matchId: string,
  setNumber: number,
  pointNumber: number,
  type: VolleyballEventType,
  teamId: string,
  teamName: string,
  playerId?: string,
  playerName?: string,
): VolleyballEvent => ({
  id: `event-${Date.now()}-${secureRandomId(7)}`,
  matchId,
  setNumber,
  pointNumber,
  type,
  teamId,
  teamName,
  playerId,
  playerName,
  timestamp: new Date().toISOString(),
});

export const isSetComplete = (
  teamAPoints: number,
  teamBPoints: number,
  pointsToWin = 25,
  setsWonA = 0,
  setsWonB = 0,
  setsToWin = 3,
): { complete: boolean; winner: 'teamA' | 'teamB' | null } => {
  const isDecidingSet =
    setsWonA === setsToWin - 1 || setsWonB === setsToWin - 1;
  const targetPoints = isDecidingSet ? 15 : pointsToWin;

  if (teamAPoints >= targetPoints && teamAPoints - teamBPoints >= 2) {
    return { complete: true, winner: 'teamA' };
  }
  if (teamBPoints >= targetPoints && teamBPoints - teamAPoints >= 2) {
    return { complete: true, winner: 'teamB' };
  }
  return { complete: false, winner: null };
};

export const getEventTypeLabel = (type: VolleyballEventType): string => {
  const labels: Record<VolleyballEventType, string> = {
    point: 'Point',
    ace: 'Ace',
    block: 'Block',
    attack: 'Attack',
    error: 'Error',
    fault: 'Fault',
    rotation: 'Rotation',
    timeout: 'Timeout',
    substitution: 'Substitution',
  };
  return labels[type];
};

export const getEventTypeIcon = (type: VolleyballEventType): string => {
  const icons: Record<VolleyballEventType, string> = {
    point: '🏐',
    ace: '🎯',
    block: '🛡️',
    attack: '💥',
    error: '❌',
    fault: '⚠️',
    rotation: '🔄',
    timeout: '⏸️',
    substitution: '🔁',
  };
  return icons[type];
};

export const canCallTimeout = (
  team: 'teamA' | 'teamB',
  timeoutsUsed: { teamA: number; teamB: number },
  maxTimeouts = 2,
): boolean => {
  return timeoutsUsed[team] < maxTimeouts;
};

export const canSubstitute = (
  team: 'teamA' | 'teamB',
  substitutionsUsed: { teamA: number; teamB: number },
  maxSubstitutions = 6,
): boolean => {
  return substitutionsUsed[team] < maxSubstitutions;
};
