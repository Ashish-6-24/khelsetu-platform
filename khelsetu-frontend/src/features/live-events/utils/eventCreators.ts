import type {
  LiveEventConfig,
  LiveEventType,
  LiveMatchEvent,
  SportType,
} from '../types';

export const FOOTBALL_EVENT_CONFIG: Record<string, LiveEventConfig> = {
  goal: { icon: '⚽', label: 'Goal', color: 'bg-green-500' },
  penalty_goal: { icon: '🎯', label: 'Penalty Goal', color: 'bg-green-500' },
  own_goal: { icon: '⚽', label: 'Own Goal', color: 'bg-orange-500' },
  yellow_card: { icon: '🟨', label: 'Yellow Card', color: 'bg-yellow-400' },
  red_card: { icon: '🟥', label: 'Red Card', color: 'bg-red-500' },
  substitution: { icon: '🔄', label: 'Substitution', color: 'bg-blue-500' },
  corner: { icon: '🚩', label: 'Corner', color: 'bg-sky-500' },
  free_kick: { icon: '🦶', label: 'Free Kick', color: 'bg-sky-600' },
  offside: { icon: '🚫', label: 'Offside', color: 'bg-gray-500' },
  injury: { icon: '🏥', label: 'Injury', color: 'bg-red-400' },
  var: { icon: '📺', label: 'VAR', color: 'bg-purple-500' },
  goalkeeper_save: { icon: '🧤', label: 'Save', color: 'bg-teal-500' },
};

export const CRICKET_EVENT_CONFIG: Record<string, LiveEventConfig> = {
  run: { icon: '🏃', label: 'Run', color: 'bg-blue-500' },
  boundary: { icon: '4️⃣', label: 'Boundary', color: 'bg-green-500' },
  six: { icon: '6️⃣', label: 'Six', color: 'bg-purple-500' },
  wicket: { icon: '🎯', label: 'Wicket', color: 'bg-red-500' },
  catch: { icon: '🤲', label: 'Catch', color: 'bg-orange-500' },
  run_out: { icon: '🏃', label: 'Run Out', color: 'bg-red-600' },
  wide: { icon: '➕', label: 'Wide', color: 'bg-yellow-500' },
  no_ball: { icon: '🚫', label: 'No Ball', color: 'bg-red-400' },
};

export const VOLLEYBALL_EVENT_CONFIG: Record<string, LiveEventConfig> = {
  point: { icon: '🏐', label: 'Point', color: 'bg-blue-500' },
  ace: { icon: '⚡', label: 'Ace', color: 'bg-purple-500' },
  block: { icon: '🧱', label: 'Block', color: 'bg-green-500' },
  timeout: { icon: '⏸️', label: 'Timeout', color: 'bg-gray-500' },
};

export const getEventConfig = (
  sport: SportType,
  eventType: LiveEventType,
): LiveEventConfig => {
  const configs: Record<SportType, Record<string, LiveEventConfig>> = {
    football: FOOTBALL_EVENT_CONFIG,
    cricket: CRICKET_EVENT_CONFIG,
    volleyball: VOLLEYBALL_EVENT_CONFIG,
  };
  return (
    configs[sport][eventType] ?? {
      icon: '📝',
      label: eventType,
      color: 'bg-gray-500',
    }
  );
};

export const getSportEvents = (sport: SportType): LiveEventType[] => {
  const events: Record<SportType, LiveEventType[]> = {
    football: [
      'goal',
      'penalty_goal',
      'own_goal',
      'yellow_card',
      'red_card',
      'substitution',
      'corner',
      'free_kick',
      'offside',
      'injury',
      'var',
      'goalkeeper_save',
    ],
    cricket: [
      'run',
      'boundary',
      'six',
      'wicket',
      'catch',
      'run_out',
      'wide',
      'no_ball',
    ],
    volleyball: ['point', 'ace', 'block', 'timeout'],
  };
  return events[sport];
};

export const createLiveMatchEvent = (
  matchId: string,
  sport: SportType,
  minute: number,
  type: LiveEventType,
  teamId: string,
  teamName: string,
  extras?: {
    extraMinute?: number;
    period?: string;
    playerId?: string;
    playerName?: string;
    description?: string;
  },
): LiveMatchEvent => ({
  id: `live-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  matchId,
  minute,
  extraMinute: extras?.extraMinute,
  period: extras?.period,
  type,
  sport,
  teamId,
  teamName,
  playerId: extras?.playerId,
  playerName: extras?.playerName,
  description: extras?.description,
  timestamp: new Date().toISOString(),
});

export const formatLiveMinute = (minute: number, extraMinute?: number): string => {
  if (extraMinute && extraMinute > 0) return `${minute}+${extraMinute}'`;
  return `${minute}'`;
};
