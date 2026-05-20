import type { FootballEvent, FootballPeriod } from '@types-domain/scoring';

export const createFootballEvent = (
  matchId: string,
  minute: number,
  period: FootballPeriod,
  type: FootballEvent['type'],
  teamId: string,
  teamName: string,
  playerId: string,
  playerName: string,
  extras?: {
    assistPlayerId?: string;
    assistPlayerName?: string;
    substitutedOutPlayerId?: string;
    substitutedOutPlayerName?: string;
    substitutedInPlayerId?: string;
    substitutedInPlayerName?: string;
    description?: string;
  },
): FootballEvent => ({
  id: `event-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  matchId,
  minute,
  extraMinute: minute > 90 ? minute - 90 : undefined,
  period,
  type,
  teamId,
  teamName,
  playerId,
  playerName,
  assistPlayerId: extras?.assistPlayerId,
  assistPlayerName: extras?.assistPlayerName,
  substitutedOutPlayerId: extras?.substitutedOutPlayerId,
  substitutedOutPlayerName: extras?.substitutedOutPlayerName,
  substitutedInPlayerId: extras?.substitutedInPlayerId,
  substitutedInPlayerName: extras?.substitutedInPlayerName,
  description: extras?.description,
  timestamp: new Date().toISOString(),
});

export const getPeriodLabel = (period: FootballPeriod): string => {
  const labels: Record<FootballPeriod, string> = {
    first_half: '1st Half',
    second_half: '2nd Half',
    extra_time_first: 'ET 1st',
    extra_time_second: 'ET 2nd',
    penalties: 'Penalties',
  };
  return labels[period];
};

export const getEventIcon = (type: FootballEvent['type']): string => {
  const icons: Record<FootballEvent['type'], string> = {
    goal: '⚽',
    own_goal: '⚽',
    yellow_card: '🟨',
    red_card: '🟥',
    second_yellow: '🟥',
    substitution: '🔄',
    var_review: '📺',
    penalty_awarded: '🎯',
    penalty_scored: '⚽',
    penalty_missed: '❌',
    free_kick: '🦶',
    corner: '🚩',
    offside: '🚫',
    foul: '💥',
    shot_on_target: '🎯',
    shot_off_target: '💨',
    save: '🧤',
  };
  return icons[type];
};

export const getEventColor = (type: FootballEvent['type']): string => {
  if (type === 'goal' || type === 'penalty_scored') return 'text-green-600 dark:text-green-400';
  if (type === 'yellow_card' || type === 'second_yellow') return 'text-yellow-600 dark:text-yellow-400';
  if (type === 'red_card') return 'text-red-600 dark:text-red-400';
  if (type === 'substitution') return 'text-blue-600 dark:text-blue-400';
  return 'text-gray-600 dark:text-gray-400';
};

export const formatMinute = (minute: number, extraMinute?: number): string => {
  if (extraMinute) return `${minute}+${extraMinute}'`;
  return `${minute}'`;
};

export const isCardEvent = (type: FootballEvent['type']): boolean =>
  type === 'yellow_card' || type === 'red_card' || type === 'second_yellow';

export const isGoalEvent = (type: FootballEvent['type']): boolean =>
  type === 'goal' || type === 'own_goal' || type === 'penalty_scored';

export const getMaxSubstitutions = (teamEvents: FootballEvent[], teamId: string): number => {
  return teamEvents.filter((e) => e.type === 'substitution' && e.teamId === teamId).length;
};

export const canSubstitute = (teamEvents: FootballEvent[], teamId: string, maxSubs = 5): boolean => {
  return getMaxSubstitutions(teamEvents, teamId) < maxSubs;
};
