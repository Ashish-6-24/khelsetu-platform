import { generateMatchReport } from '@features/match-reports/utils/reportGenerator';
import type { LiveMatchEvent } from '@features/live-events/types';
import { describe, expect, it } from 'vitest';

describe('Report Generator', () => {
  const createEvent = (overrides: Partial<LiveMatchEvent>): LiveMatchEvent => ({
    id: 'event-1',
    matchId: 'match-1',
    minute: 45,
    type: 'goal',
    sport: 'football',
    teamId: 'team-1',
    teamName: 'Team A',
    timestamp: new Date().toISOString(),
    ...overrides,
  });

  describe('generateMatchReport', () => {
    it('should generate a match report', () => {
      const events: LiveMatchEvent[] = [
        createEvent({ type: 'goal', teamName: 'Team A', playerName: 'Player 1' }),
        createEvent({ type: 'goal', teamName: 'Team B', playerName: 'Player 2' }),
      ];
      
      const report = generateMatchReport(
        'match-1',
        'Team A',
        'Team B',
        events,
        { 
          possession: { teamA: 55, teamB: 45 },
          shots: { teamA: 10, teamB: 8 },
          corners: { teamA: 5, teamB: 3 },
          fouls: { teamA: 12, teamB: 15 }
        }
      );
      
      expect(report).toBeDefined();
      expect(report.matchId).toBe('match-1');
      expect(report.title).toBe('Team A vs Team B');
      expect(report.finalScore.teamA).toBe(1);
      expect(report.finalScore.teamB).toBe(1);
    });

    it('should count goals correctly', () => {
      const events: LiveMatchEvent[] = [
        createEvent({ type: 'goal', teamName: 'Team A' }),
        createEvent({ type: 'goal', teamName: 'Team A' }),
        createEvent({ type: 'penalty_goal', teamName: 'Team B' }),
      ];
      
      const report = generateMatchReport(
        'match-1',
        'Team A',
        'Team B',
        events,
        { 
          possession: { teamA: 50, teamB: 50 },
          shots: { teamA: 0, teamB: 0 },
          corners: { teamA: 0, teamB: 0 },
          fouls: { teamA: 0, teamB: 0 }
        }
      );
      
      expect(report.finalScore.teamA).toBe(2);
      expect(report.finalScore.teamB).toBe(1);
    });

    it('should handle own goals correctly', () => {
      const events: LiveMatchEvent[] = [
        createEvent({ type: 'own_goal', teamName: 'Team B', playerName: 'Player 1' }),
      ];
      
      const report = generateMatchReport(
        'match-1',
        'Team A',
        'Team B',
        events,
        { 
          possession: { teamA: 50, teamB: 50 },
          shots: { teamA: 0, teamB: 0 },
          corners: { teamA: 0, teamB: 0 },
          fouls: { teamA: 0, teamB: 0 }
        }
      );
      
      // Own goal by Team B counts for Team A
      expect(report.finalScore.teamA).toBe(1);
      expect(report.finalScore.teamB).toBe(0);
    });

    it('should separate cards and substitutions', () => {
      const events: LiveMatchEvent[] = [
        createEvent({ type: 'yellow_card', teamName: 'Team A' }),
        createEvent({ type: 'red_card', teamName: 'Team B' }),
        createEvent({ type: 'substitution', teamName: 'Team A' }),
      ];
      
      const report = generateMatchReport(
        'match-1',
        'Team A',
        'Team B',
        events,
        { 
          possession: { teamA: 50, teamB: 50 },
          shots: { teamA: 0, teamB: 0 },
          corners: { teamA: 0, teamB: 0 },
          fouls: { teamA: 0, teamB: 0 }
        }
      );
      
      expect(report.cards).toHaveLength(2);
      expect(report.substitutions).toHaveLength(1);
    });

    it('should generate summary', () => {
      const events: LiveMatchEvent[] = [
        createEvent({ type: 'goal', teamName: 'Team A' }),
      ];
      
      const report = generateMatchReport(
        'match-1',
        'Team A',
        'Team B',
        events,
        { 
          possession: { teamA: 50, teamB: 50 },
          shots: { teamA: 0, teamB: 0 },
          corners: { teamA: 0, teamB: 0 },
          fouls: { teamA: 0, teamB: 0 }
        }
      );
      
      expect(report.summary).toContain('Team A');
      expect(report.summary).toContain('Team B');
    });

    it('should generate highlights', () => {
      const events: LiveMatchEvent[] = [
        createEvent({ type: 'goal', teamName: 'Team A', minute: 45, playerName: 'Player 1' }),
        createEvent({ type: 'yellow_card', teamName: 'Team B', minute: 30, playerName: 'Player 2' }),
      ];
      
      const report = generateMatchReport(
        'match-1',
        'Team A',
        'Team B',
        events,
        { 
          possession: { teamA: 50, teamB: 50 },
          shots: { teamA: 0, teamB: 0 },
          corners: { teamA: 0, teamB: 0 },
          fouls: { teamA: 0, teamB: 0 }
        }
      );
      
      expect(report.highlights).toHaveLength(2);
      expect(report.highlights[0]).toContain("30'");
      expect(report.highlights[1]).toContain("45'");
    });
  });
});