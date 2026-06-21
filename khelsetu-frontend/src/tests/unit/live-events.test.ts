import {
  CRICKET_EVENT_CONFIG,
  FOOTBALL_EVENT_CONFIG,
  VOLLEYBALL_EVENT_CONFIG,
  createLiveMatchEvent,
  formatLiveMinute,
  getEventConfig,
  getSportEvents,
} from '@features/live-events/utils/eventCreators';
import { describe, expect, it } from 'vitest';

describe('Live Events Utils', () => {
  describe('Event Configs', () => {
    it('should have football event config', () => {
      expect(FOOTBALL_EVENT_CONFIG).toBeDefined();
      expect(FOOTBALL_EVENT_CONFIG.goal).toBeDefined();
      expect(FOOTBALL_EVENT_CONFIG.goal?.icon).toBe('⚽');
    });

    it('should have cricket event config', () => {
      expect(CRICKET_EVENT_CONFIG).toBeDefined();
      expect(CRICKET_EVENT_CONFIG.run).toBeDefined();
    });

    it('should have volleyball event config', () => {
      expect(VOLLEYBALL_EVENT_CONFIG).toBeDefined();
      expect(VOLLEYBALL_EVENT_CONFIG.point).toBeDefined();
    });
  });

  describe('getEventConfig', () => {
    it('should return correct config for football goal', () => {
      const config = getEventConfig('football', 'goal');
      expect(config.icon).toBe('⚽');
      expect(config.label).toBe('Goal');
    });

    it('should return default config for unknown event', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const config = getEventConfig('football', 'unknown_event' as any);
      expect(config.icon).toBe('📝');
    });
  });

  describe('getSportEvents', () => {
    it('should return football events', () => {
      const events = getSportEvents('football');
      expect(events).toContain('goal');
      expect(events).toContain('yellow_card');
    });

    it('should return cricket events', () => {
      const events = getSportEvents('cricket');
      expect(events).toContain('run');
      expect(events).toContain('wicket');
    });

    it('should return volleyball events', () => {
      const events = getSportEvents('volleyball');
      expect(events).toContain('point');
      expect(events).toContain('ace');
    });
  });

  describe('createLiveMatchEvent', () => {
    it('should create a live match event', () => {
      const event = createLiveMatchEvent(
        'match-1',
        'football',
        45,
        'goal',
        'team-1',
        'Team A',
        { playerName: 'Player 1' },
      );

      expect(event).toBeDefined();
      expect(event.matchId).toBe('match-1');
      expect(event.minute).toBe(45);
      expect(event.type).toBe('goal');
      expect(event.teamName).toBe('Team A');
      expect(event.playerName).toBe('Player 1');
    });

    it('should generate unique IDs', () => {
      const event1 = createLiveMatchEvent(
        'match-1',
        'football',
        10,
        'goal',
        'team-1',
        'Team A',
      );
      const event2 = createLiveMatchEvent(
        'match-1',
        'football',
        20,
        'goal',
        'team-1',
        'Team A',
      );
      expect(event1.id).not.toBe(event2.id);
    });
  });

  describe('formatLiveMinute', () => {
    it('should format regular minute', () => {
      expect(formatLiveMinute(45)).toBe("45'");
    });

    it('should format minute with extra time', () => {
      expect(formatLiveMinute(45, 3)).toBe("45+3'");
    });

    it('should handle zero extra minute', () => {
      expect(formatLiveMinute(45, 0)).toBe("45'");
    });
  });
});
