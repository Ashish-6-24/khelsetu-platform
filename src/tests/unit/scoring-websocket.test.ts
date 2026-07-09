import { useScoringWebSocket } from '@features/scoring/hooks/useScoringWebSocket';
import { wsService } from '@lib/websocket-client';
import type { FootballScore } from '@shared/types/scoring';
import { useScoringStore } from '@state/scoringStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { type ReactNode, createElement } from 'react';

vi.mock('@lib/websocket-client', () => ({
  wsService: {
    on: vi.fn(),
    off: vi.fn(),
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);
};

const mockFootballScore: FootballScore = {
  matchId: 'match-1',
  teamA: {
    teamId: 'team-a',
    teamName: 'Team A',
    goals: 2,
    shots: 10,
    shotsOnTarget: 5,
    corners: 4,
    fouls: 3,
    yellowCards: 1,
    redCards: 0,
    possession: 55,
    offsides: 1,
    saves: 2,
  },
  teamB: {
    teamId: 'team-b',
    teamName: 'Team B',
    goals: 1,
    shots: 8,
    shotsOnTarget: 3,
    corners: 3,
    fouls: 5,
    yellowCards: 2,
    redCards: 0,
    possession: 45,
    offsides: 0,
    saves: 4,
  },
  currentPeriod: 'first_half',
  currentMinute: 45,
  isRunning: true,
  events: [],
};

describe('useScoringWebSocket', () => {
  beforeEach(() => {
    useScoringStore.setState({
      activeMatchId: null,
      activeSport: null,
      isScoring: false,
      football: { score: null },
      cricket: { score: null },
      volleyball: { score: null },
      basketball: { score: null },
    });
    vi.clearAllMocks();
  });

  it('subscribes to score_update, match_start, and match_end events', () => {
    renderHook(() => useScoringWebSocket('match-1'), {
      wrapper: createWrapper(),
    });

    expect(wsService.on).toHaveBeenCalledWith(
      'score_update',
      expect.any(Function),
    );
    expect(wsService.on).toHaveBeenCalledWith(
      'match_start',
      expect.any(Function),
    );
    expect(wsService.on).toHaveBeenCalledWith(
      'match_end',
      expect.any(Function),
    );
  });

  it('updates football score in store on score_update', () => {
    renderHook(() => useScoringWebSocket('match-1'), {
      wrapper: createWrapper(),
    });

    const scoreUpdateCall = vi
      .mocked(wsService.on)
      .mock.calls.find((call: unknown[]) => call[0] === 'score_update');
    const handler = scoreUpdateCall?.[1] as (data: unknown) => void;

    act(() => {
      handler({
        matchId: 'match-1',
        sport: 'football',
        score: mockFootballScore,
      });
    });

    const state = useScoringStore.getState();
    expect(state.isScoring).toBe(true);
    expect(state.football.score).toEqual(mockFootballScore);
  });

  it('sets isScoring to true on match_start', () => {
    renderHook(() => useScoringWebSocket('match-1'), {
      wrapper: createWrapper(),
    });

    const matchStartCall = vi
      .mocked(wsService.on)
      .mock.calls.find((call: unknown[]) => call[0] === 'match_start');
    const handler = matchStartCall?.[1] as (data: unknown) => void;

    act(() => {
      handler({ matchId: 'match-1', startedAt: '2026-07-09T00:00:00Z' });
    });

    expect(useScoringStore.getState().isScoring).toBe(true);
  });

  it('sets isScoring to false on match_end', () => {
    useScoringStore.setState({ isScoring: true });

    renderHook(() => useScoringWebSocket('match-1'), {
      wrapper: createWrapper(),
    });

    const matchEndCall = vi
      .mocked(wsService.on)
      .mock.calls.find((call: unknown[]) => call[0] === 'match_end');
    const handler = matchEndCall?.[1] as (data: unknown) => void;

    act(() => {
      handler({ matchId: 'match-1', endedAt: '2026-07-09T01:00:00Z' });
    });

    expect(useScoringStore.getState().isScoring).toBe(false);
  });

  it('ignores score_update with missing fields', () => {
    renderHook(() => useScoringWebSocket('match-1'), {
      wrapper: createWrapper(),
    });

    const scoreUpdateCall = vi
      .mocked(wsService.on)
      .mock.calls.find((call: unknown[]) => call[0] === 'score_update');
    const handler = scoreUpdateCall?.[1] as (data: unknown) => void;

    act(() => {
      handler({ matchId: 'match-1' }); // missing sport and score
    });

    expect(useScoringStore.getState().isScoring).toBe(false);
    expect(useScoringStore.getState().football.score).toBeNull();
  });

  it('unsubscribes on unmount', () => {
    const { unmount } = renderHook(() => useScoringWebSocket('match-1'), {
      wrapper: createWrapper(),
    });

    unmount();

    expect(wsService.off).toHaveBeenCalledWith(
      'score_update',
      expect.any(Function),
    );
    expect(wsService.off).toHaveBeenCalledWith(
      'match_start',
      expect.any(Function),
    );
    expect(wsService.off).toHaveBeenCalledWith(
      'match_end',
      expect.any(Function),
    );
  });

  it('does not subscribe when matchId is undefined', () => {
    renderHook(() => useScoringWebSocket(), {
      wrapper: createWrapper(),
    });

    expect(wsService.on).not.toHaveBeenCalled();
  });
});
