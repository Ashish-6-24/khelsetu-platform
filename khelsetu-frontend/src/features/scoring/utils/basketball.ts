import type { BasketballEvent, BasketballEventType } from '@types-domain/scoring';

export const createBasketballEvent = (
  matchId: string,
  quarter: number,
  minute: number,
  second: number,
  type: BasketballEventType,
  teamId: string,
  teamName: string,
  playerId: string,
  playerName: string,
  points?: number,
  description?: string,
): BasketballEvent => ({
  id: `event-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  matchId,
  quarter,
  minute,
  second,
  type,
  teamId,
  teamName,
  playerId,
  playerName,
  points,
  description,
  timestamp: new Date().toISOString(),
});

export const getQuarterLabel = (quarter: number): string => {
  const labels: Record<number, string> = {
    1: 'Q1',
    2: 'Q2',
    3: 'Q3',
    4: 'Q4',
    5: 'OT',
  };
  return labels[quarter] ?? `Q${quarter}`;
};

export const getEventTypeLabel = (type: BasketballEventType): string => {
  const labels: Record<BasketballEventType, string> = {
    '2pt': '2PT',
    '3pt': '3PT',
    free_throw: 'FT',
    miss: 'Miss',
    rebound_offensive: 'OReb',
    rebound_defensive: 'DReb',
    assist: 'AST',
    steal: 'STL',
    block: 'BLK',
    turnover: 'TO',
    foul_personal: 'PF',
    foul_technical: 'TF',
    foul_flagrant: 'FF',
    timeout: 'Timeout',
    substitution: 'Sub',
  };
  return labels[type];
};

export const getPointsForEventType = (type: BasketballEventType): number => {
  switch (type) {
    case '2pt':
      return 2;
    case '3pt':
      return 3;
    case 'free_throw':
      return 1;
    default:
      return 0;
  }
};

export const isFoulEvent = (type: BasketballEventType): boolean =>
  type === 'foul_personal' || type === 'foul_technical' || type === 'foul_flagrant';

export const isScoringEvent = (type: BasketballEventType): boolean =>
  type === '2pt' || type === '3pt' || type === 'free_throw';

export const formatGameTime = (minute: number, second: number): string => {
  return `${minute}:${second.toString().padStart(2, '0')}`;
};

export const isInBonus = (teamFouls: number, foulsForBonus = 5): boolean => {
  return teamFouls >= foulsForBonus;
};

export const hasFouledOut = (playerFouls: number, maxFouls = 5): boolean => {
  return playerFouls >= maxFouls;
};
