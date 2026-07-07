import type {
  BasketballScore,
  CricketScore,
  FootballScore,
  VolleyballScore,
} from '@shared/types/scoring';
import { useScoringStore } from '@state/scoringStore';
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockCricketScore: CricketScore = {
  matchId: 'match-1',
  innings: [
    {
      inningsNumber: 1,
      battingTeamId: 'team-a',
      battingTeamName: 'Team A',
      bowlingTeamId: 'team-b',
      bowlingTeamName: 'Team B',
      runs: 0,
      wickets: 0,
      overs: 0,
      balls: [],
      batsmen: [],
      bowlers: [],
      currentStrikerId: 'p1',
      currentNonStrikerId: 'p2',
      currentBowlerId: 'p3',
      isComplete: false,
    },
  ],
  currentInningsIndex: 0,
  lastBalls: [],
};

const mockFootballScore: FootballScore = {
  matchId: 'match-1',
  teamA: {
    teamId: 'team-a',
    teamName: 'Team A',
    goals: 0,
    shots: 0,
    shotsOnTarget: 0,
    corners: 0,
    fouls: 0,
    yellowCards: 0,
    redCards: 0,
    possession: 50,
    offsides: 0,
    saves: 0,
  },
  teamB: {
    teamId: 'team-b',
    teamName: 'Team B',
    goals: 0,
    shots: 0,
    shotsOnTarget: 0,
    corners: 0,
    fouls: 0,
    yellowCards: 0,
    redCards: 0,
    possession: 50,
    offsides: 0,
    saves: 0,
  },
  currentPeriod: 'first_half',
  currentMinute: 0,
  isRunning: false,
  events: [],
};

const mockVolleyballScore: VolleyballScore = {
  matchId: 'match-1',
  teamAName: 'Team A',
  teamBName: 'Team B',
  currentSet: 1,
  sets: [
    {
      setNumber: 1,
      teamAPoints: 0,
      teamBPoints: 0,
      winner: null,
      events: [],
    },
  ],
  teamASetsWon: 0,
  teamBSetsWon: 0,
  currentPoint: { teamA: 0, teamB: 0 },
  servingTeam: 'teamA',
  timeoutsUsed: { teamA: 0, teamB: 0 },
  substitutionsUsed: { teamA: 0, teamB: 0 },
};

const mockBasketballScore: BasketballScore = {
  matchId: 'match-1',
  teamA: {
    teamId: 'team-a',
    teamName: 'Team A',
    points: 0,
    fouls: 0,
    timeoutsRemaining: 7,
    rebounds: 0,
    assists: 0,
    turnovers: 0,
    steals: 0,
    blocks: 0,
  },
  teamB: {
    teamId: 'team-b',
    teamName: 'Team B',
    points: 0,
    fouls: 0,
    timeoutsRemaining: 7,
    rebounds: 0,
    assists: 0,
    turnovers: 0,
    steals: 0,
    blocks: 0,
  },
  currentQuarter: 1,
  quarters: [
    { quarterNumber: 1, teamAPoints: 0, teamBPoints: 0 },
    { quarterNumber: 2, teamAPoints: 0, teamBPoints: 0 },
    { quarterNumber: 3, teamAPoints: 0, teamBPoints: 0 },
    { quarterNumber: 4, teamAPoints: 0, teamBPoints: 0 },
  ],
  events: [],
  shotClock: 24,
  isRunning: false,
};

describe('Scoring Store', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-26T00:00:00.000Z'));
    useScoringStore.setState({
      activeMatchId: null,
      activeSport: null,
      isScoring: false,
      lastUpdate: null,
      history: [],
      cricket: { score: null },
      football: { score: null },
      volleyball: { score: null },
      basketball: { score: null },
    });
  });

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      const { result } = renderHook(() => useScoringStore());
      expect(result.current.activeMatchId).toBeNull();
      expect(result.current.activeSport).toBeNull();
      expect(result.current.isScoring).toBe(false);
      expect(result.current.history).toHaveLength(0);
    });
  });

  describe('setActiveMatch', () => {
    it('should set active match and reset scores', () => {
      const { result } = renderHook(() => useScoringStore());
      act(() => {
        result.current.setActiveMatch('match-1', 'cricket');
      });
      expect(result.current.activeMatchId).toBe('match-1');
      expect(result.current.activeSport).toBe('cricket');
      expect(result.current.isScoring).toBe(false);
      expect(result.current.history).toHaveLength(0);
    });

    it('should clear previous scores when setting new match', () => {
      const { result } = renderHook(() => useScoringStore());
      act(() => {
        result.current.setActiveMatch('match-1', 'cricket');
        result.current.setCricketScore(mockCricketScore);
        result.current.setActiveMatch('match-2', 'football');
      });
      expect(result.current.cricket.score).toBeNull();
      expect(result.current.activeMatchId).toBe('match-2');
    });
  });

  describe('setScoring', () => {
    it('should toggle scoring state', () => {
      const { result } = renderHook(() => useScoringStore());
      act(() => {
        result.current.setScoring(true);
      });
      expect(result.current.isScoring).toBe(true);
    });
  });

  describe('resetScoring', () => {
    it('should reset all state to initial', () => {
      const { result } = renderHook(() => useScoringStore());
      act(() => {
        result.current.setActiveMatch('match-1', 'cricket');
        result.current.setScoring(true);
        result.current.resetScoring();
      });
      expect(result.current.activeMatchId).toBeNull();
      expect(result.current.isScoring).toBe(false);
      expect(result.current.history).toHaveLength(0);
    });
  });

  describe('Cricket Scoring', () => {
    it('should set cricket score', () => {
      const { result } = renderHook(() => useScoringStore());
      act(() => {
        result.current.setCricketScore(mockCricketScore);
      });
      expect(result.current.cricket.score).toEqual(mockCricketScore);
    });

    it('should add cricket ball and update runs', () => {
      const { result } = renderHook(() => useScoringStore());
      act(() => {
        result.current.setCricketScore(mockCricketScore);
      });

      const ball = {
        id: 'ball-1',
        matchId: 'match-1',
        innings: 1,
        over: 0,
        ball: 0,
        batsmanId: 'p1',
        bowlerId: 'p3',
        runs: 4,
        isExtra: false,
        isWicket: false,
        timestamp: '2026-06-26T00:00:00.000Z',
      };

      act(() => {
        result.current.addCricketBall(ball);
      });

      expect(result.current.cricket.score?.innings[0]?.runs).toBe(4);
      expect(result.current.cricket.score?.innings[0]?.balls).toHaveLength(1);
      expect(result.current.history).toHaveLength(1);
      expect(result.current.history[0]?.type).toBe('cricket_ball');
    });

    it('should increment wickets on wicket ball', () => {
      const { result } = renderHook(() => useScoringStore());
      act(() => {
        result.current.setCricketScore(mockCricketScore);
      });

      const ball = {
        id: 'ball-1',
        matchId: 'match-1',
        innings: 1,
        over: 0,
        ball: 0,
        batsmanId: 'p1',
        bowlerId: 'p3',
        runs: 0,
        isExtra: false,
        isWicket: true,
        wicketType: 'bowled' as const,
        dismissedPlayerId: 'p1',
        timestamp: '2026-06-26T00:00:00.000Z',
      };

      act(() => {
        result.current.addCricketBall(ball);
      });

      expect(result.current.cricket.score?.innings[0]?.wickets).toBe(1);
    });

    it('should increment overs after 6th ball', () => {
      const { result } = renderHook(() => useScoringStore());
      act(() => {
        result.current.setCricketScore(mockCricketScore);
      });

      const ball = {
        id: 'ball-1',
        matchId: 'match-1',
        innings: 1,
        over: 0,
        ball: 5,
        batsmanId: 'p1',
        bowlerId: 'p3',
        runs: 1,
        isExtra: false,
        isWicket: false,
        timestamp: '2026-06-26T00:00:00.000Z',
      };

      act(() => {
        result.current.addCricketBall(ball);
      });

      expect(result.current.cricket.score?.innings[0]?.overs).toBe(1);
    });

    it('should not add ball when score is null', () => {
      const { result } = renderHook(() => useScoringStore());
      const ball = {
        id: 'ball-1',
        matchId: 'match-1',
        innings: 1,
        over: 0,
        ball: 0,
        batsmanId: 'p1',
        bowlerId: 'p3',
        runs: 4,
        isExtra: false,
        isWicket: false,
        timestamp: '2026-06-26T00:00:00.000Z',
      };

      act(() => {
        result.current.addCricketBall(ball);
      });

      expect(result.current.cricket.score).toBeNull();
    });

    it('should keep only last 12 balls in lastBalls', () => {
      const { result } = renderHook(() => useScoringStore());
      act(() => {
        result.current.setCricketScore(mockCricketScore);
      });

      for (let i = 0; i < 15; i++) {
        const ball = {
          id: `ball-${i}`,
          matchId: 'match-1',
          innings: 1,
          over: 0,
          ball: i % 6,
          batsmanId: 'p1',
          bowlerId: 'p3',
          runs: 1,
          isExtra: false,
          isWicket: false,
          timestamp: '2026-06-26T00:00:00.000Z',
        };
        act(() => {
          result.current.addCricketBall(ball);
        });
      }

      expect(result.current.cricket.score?.lastBalls.length).toBe(12);
    });
  });

  describe('Football Scoring', () => {
    it('should set football score', () => {
      const { result } = renderHook(() => useScoringStore());
      act(() => {
        result.current.setFootballScore(mockFootballScore);
      });
      expect(result.current.football.score).toEqual(mockFootballScore);
    });

    it('should add football event', () => {
      const { result } = renderHook(() => useScoringStore());
      act(() => {
        result.current.setFootballScore(mockFootballScore);
      });

      const event = {
        id: 'event-1',
        matchId: 'match-1',
        minute: 23,
        period: 'first_half' as const,
        type: 'goal' as const,
        teamId: 'team-a',
        teamName: 'Team A',
        playerId: 'p1',
        playerName: 'Player 1',
        timestamp: '2026-06-26T00:00:00.000Z',
      };

      act(() => {
        result.current.addFootballEvent(event);
      });

      expect(result.current.football.score?.events).toHaveLength(1);
      expect(result.current.history).toHaveLength(1);
      expect(result.current.history[0]?.type).toBe('football_event');
    });

    it('should update football minute', () => {
      const { result } = renderHook(() => useScoringStore());
      act(() => {
        result.current.setFootballScore(mockFootballScore);
        result.current.updateFootballMinute(45);
      });
      expect(result.current.football.score?.currentMinute).toBe(45);
    });

    it('should toggle football timer', () => {
      const { result } = renderHook(() => useScoringStore());
      act(() => {
        result.current.setFootballScore(mockFootballScore);
        result.current.toggleFootballTimer();
      });
      expect(result.current.football.score?.isRunning).toBe(true);

      act(() => {
        result.current.toggleFootballTimer();
      });
      expect(result.current.football.score?.isRunning).toBe(false);
    });

    it('should not add event when score is null', () => {
      const { result } = renderHook(() => useScoringStore());
      act(() => {
        result.current.addFootballEvent({
          id: 'event-1',
          matchId: 'match-1',
          minute: 10,
          period: 'first_half',
          type: 'goal',
          teamId: 'team-a',
          teamName: 'Team A',
          playerId: 'p1',
          playerName: 'Player 1',
          timestamp: '2026-06-26T00:00:00.000Z',
        });
      });
      expect(result.current.football.score).toBeNull();
    });
  });

  describe('Volleyball Scoring', () => {
    it('should set volleyball score', () => {
      const { result } = renderHook(() => useScoringStore());
      act(() => {
        result.current.setVolleyballScore(mockVolleyballScore);
      });
      expect(result.current.volleyball.score).toEqual(mockVolleyballScore);
    });

    it('should add point to teamA', () => {
      const { result } = renderHook(() => useScoringStore());
      act(() => {
        result.current.setVolleyballScore(mockVolleyballScore);
        result.current.addVolleyballPoint('teamA');
      });
      expect(result.current.volleyball.score?.currentPoint.teamA).toBe(1);
      expect(result.current.history).toHaveLength(1);
    });

    it('should add point to teamB', () => {
      const { result } = renderHook(() => useScoringStore());
      act(() => {
        result.current.setVolleyballScore(mockVolleyballScore);
        result.current.addVolleyballPoint('teamB');
      });
      expect(result.current.volleyball.score?.currentPoint.teamB).toBe(1);
    });

    it('should end volleyball set and determine winner', () => {
      const { result } = renderHook(() => useScoringStore());
      const scoreWithPoints: VolleyballScore = {
        ...mockVolleyballScore,
        sets: [
          {
            setNumber: 1,
            teamAPoints: 25,
            teamBPoints: 20,
            winner: null,
            events: [],
          },
        ],
        currentPoint: { teamA: 25, teamB: 20 },
      };

      act(() => {
        result.current.setVolleyballScore(scoreWithPoints);
        result.current.endVolleyballSet();
      });

      expect(result.current.volleyball.score?.sets[0]?.winner).toBe('teamA');
      expect(result.current.volleyball.score?.teamASetsWon).toBe(1);
      expect(result.current.volleyball.score?.currentSet).toBe(2);
      expect(result.current.volleyball.score?.currentPoint).toEqual({
        teamA: 0,
        teamB: 0,
      });
      expect(result.current.history).toHaveLength(1);
      expect(result.current.history[0]?.type).toBe('volleyball_set_end');
    });

    it('should switch serve', () => {
      const { result } = renderHook(() => useScoringStore());
      act(() => {
        result.current.setVolleyballScore(mockVolleyballScore);
      });
      expect(result.current.volleyball.score?.servingTeam).toBe('teamA');
      act(() => {
        result.current.switchVolleyballServe();
      });
      expect(result.current.volleyball.score?.servingTeam).toBe('teamB');
    });

    it('should not add point when score is null', () => {
      const { result } = renderHook(() => useScoringStore());
      act(() => {
        result.current.addVolleyballPoint('teamA');
      });
      expect(result.current.volleyball.score).toBeNull();
    });
  });

  describe('Basketball Scoring', () => {
    it('should set basketball score', () => {
      const { result } = renderHook(() => useScoringStore());
      act(() => {
        result.current.setBasketballScore(mockBasketballScore);
      });
      expect(result.current.basketball.score).toEqual(mockBasketballScore);
    });

    it('should add basketball event', () => {
      const { result } = renderHook(() => useScoringStore());
      act(() => {
        result.current.setBasketballScore(mockBasketballScore);
      });

      const event = {
        id: 'event-1',
        matchId: 'match-1',
        quarter: 1,
        minute: 10,
        second: 30,
        type: '2pt' as const,
        teamId: 'team-a',
        teamName: 'Team A',
        playerId: 'p1',
        playerName: 'Player 1',
        points: 2,
        timestamp: '2026-06-26T00:00:00.000Z',
      };

      act(() => {
        result.current.addBasketballEvent(event);
      });

      expect(result.current.basketball.score?.events).toHaveLength(1);
      expect(result.current.history).toHaveLength(1);
      expect(result.current.history[0]?.type).toBe('basketball_event');
    });

    it('should advance to next quarter', () => {
      const { result } = renderHook(() => useScoringStore());
      act(() => {
        result.current.setBasketballScore(mockBasketballScore);
        result.current.nextBasketballQuarter();
      });
      expect(result.current.basketball.score?.currentQuarter).toBe(2);
      expect(result.current.basketball.score?.shotClock).toBe(24);
      expect(result.current.history).toHaveLength(1);
      expect(result.current.history[0]?.type).toBe('basketball_quarter_end');
    });

    it('should update shot clock', () => {
      const { result } = renderHook(() => useScoringStore());
      act(() => {
        result.current.setBasketballScore(mockBasketballScore);
        result.current.updateBasketballShotClock(14);
      });
      expect(result.current.basketball.score?.shotClock).toBe(14);
    });

    it('should toggle basketball timer', () => {
      const { result } = renderHook(() => useScoringStore());
      act(() => {
        result.current.setBasketballScore(mockBasketballScore);
        result.current.toggleBasketballTimer();
      });
      expect(result.current.basketball.score?.isRunning).toBe(true);
    });
  });

  describe('Undo', () => {
    it('should undo last cricket action', () => {
      const { result } = renderHook(() => useScoringStore());
      act(() => {
        result.current.setCricketScore(mockCricketScore);
        result.current.addCricketBall({
          id: 'ball-1',
          matchId: 'match-1',
          innings: 1,
          over: 0,
          ball: 0,
          batsmanId: 'p1',
          bowlerId: 'p3',
          runs: 4,
          isExtra: false,
          isWicket: false,
          timestamp: '2026-06-26T00:00:00.000Z',
        });
      });

      expect(result.current.cricket.score?.innings[0]?.runs).toBe(4);

      act(() => {
        result.current.undoLastAction();
      });

      expect(result.current.cricket.score?.innings[0]?.runs).toBe(0);
      expect(result.current.history).toHaveLength(0);
    });

    it('should do nothing when history is empty', () => {
      const { result } = renderHook(() => useScoringStore());
      act(() => {
        result.current.undoLastAction();
      });
      expect(result.current.history).toHaveLength(0);
    });

    it('should undo football event', () => {
      const { result } = renderHook(() => useScoringStore());
      act(() => {
        result.current.setFootballScore(mockFootballScore);
        result.current.addFootballEvent({
          id: 'event-1',
          matchId: 'match-1',
          minute: 10,
          period: 'first_half',
          type: 'goal',
          teamId: 'team-a',
          teamName: 'Team A',
          playerId: 'p1',
          playerName: 'Player 1',
          timestamp: '2026-06-26T00:00:00.000Z',
        });
      });

      expect(result.current.football.score?.events).toHaveLength(1);

      act(() => {
        result.current.undoLastAction();
      });

      expect(result.current.football.score?.events).toHaveLength(0);
    });

    it('should undo volleyball point', () => {
      const { result } = renderHook(() => useScoringStore());
      act(() => {
        result.current.setVolleyballScore(mockVolleyballScore);
        result.current.addVolleyballPoint('teamA');
      });

      expect(result.current.volleyball.score?.currentPoint.teamA).toBe(1);

      act(() => {
        result.current.undoLastAction();
      });

      expect(result.current.volleyball.score?.currentPoint.teamA).toBe(0);
    });

    it('should undo basketball event', () => {
      const { result } = renderHook(() => useScoringStore());
      act(() => {
        result.current.setBasketballScore(mockBasketballScore);
        result.current.addBasketballEvent({
          id: 'event-1',
          matchId: 'match-1',
          quarter: 1,
          minute: 10,
          second: 0,
          type: '2pt',
          teamId: 'team-a',
          teamName: 'Team A',
          playerId: 'p1',
          playerName: 'Player 1',
          points: 2,
          timestamp: '2026-06-26T00:00:00.000Z',
        });
      });

      expect(result.current.basketball.score?.events).toHaveLength(1);

      act(() => {
        result.current.undoLastAction();
      });

      expect(result.current.basketball.score?.events).toHaveLength(0);
    });

    it('should undo multiple actions in order', () => {
      const { result } = renderHook(() => useScoringStore());
      act(() => {
        result.current.setFootballScore(mockFootballScore);
        result.current.addFootballEvent({
          id: 'event-1',
          matchId: 'match-1',
          minute: 10,
          period: 'first_half',
          type: 'goal',
          teamId: 'team-a',
          teamName: 'Team A',
          playerId: 'p1',
          playerName: 'Player 1',
          timestamp: '2026-06-26T00:00:00.000Z',
        });
        result.current.addFootballEvent({
          id: 'event-2',
          matchId: 'match-1',
          minute: 20,
          period: 'first_half',
          type: 'yellow_card',
          teamId: 'team-b',
          teamName: 'Team B',
          playerId: 'p2',
          playerName: 'Player 2',
          timestamp: '2026-06-26T00:00:00.000Z',
        });
      });

      expect(result.current.history).toHaveLength(2);

      act(() => {
        result.current.undoLastAction();
      });
      expect(result.current.football.score?.events).toHaveLength(1);

      act(() => {
        result.current.undoLastAction();
      });
      expect(result.current.football.score?.events).toHaveLength(0);
    });
  });
});
