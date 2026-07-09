import { wsService } from '@lib/websocket-client';
import type { MatchScore, SportType } from '@shared/types/scoring';
import type {
  LiveScoreUpdatePayload,
  MatchEndPayload,
  MatchStartPayload,
} from '@shared/types/websocket';
import { useScoringStore } from '@state/scoringStore';
import { useQueryClient } from '@tanstack/react-query';

import { useCallback, useEffect } from 'react';

export const useScoringWebSocket = (matchId?: string) => {
  const queryClient = useQueryClient();
  const setScoring = useScoringStore((s) => s.setScoring);
  const setCricketScore = useScoringStore((s) => s.setCricketScore);
  const setFootballScore = useScoringStore((s) => s.setFootballScore);
  const setVolleyballScore = useScoringStore((s) => s.setVolleyballScore);
  const setBasketballScore = useScoringStore((s) => s.setBasketballScore);

  const handleScoreUpdate = useCallback(
    (data: unknown) => {
      const payload = data as LiveScoreUpdatePayload;
      if (!payload?.matchId || !payload?.sport || !payload?.score) return;

      setScoring(true);

      const sport = payload.sport as SportType;
      const score = payload.score as MatchScore;

      switch (sport) {
        case 'cricket':
          setCricketScore(score as Parameters<typeof setCricketScore>[0]);
          break;
        case 'football':
          setFootballScore(score as Parameters<typeof setFootballScore>[0]);
          break;
        case 'volleyball':
          setVolleyballScore(score as Parameters<typeof setVolleyballScore>[0]);
          break;
        case 'basketball':
          setBasketballScore(score as Parameters<typeof setBasketballScore>[0]);
          break;
      }

      queryClient.setQueryData(['liveScore', payload.matchId], score);
    },
    [
      queryClient,
      setScoring,
      setCricketScore,
      setFootballScore,
      setVolleyballScore,
      setBasketballScore,
    ],
  );

  const handleMatchStart = useCallback(
    (data: unknown) => {
      const payload = data as MatchStartPayload;
      if (payload?.matchId) {
        setScoring(true);
      }
    },
    [setScoring],
  );

  const handleMatchEnd = useCallback(
    (data: unknown) => {
      const payload = data as MatchEndPayload;
      if (payload?.matchId) {
        setScoring(false);
      }
    },
    [setScoring],
  );

  useEffect(() => {
    if (!matchId) return;

    wsService.on('score_update', handleScoreUpdate);
    wsService.on('match_start', handleMatchStart);
    wsService.on('match_end', handleMatchEnd);

    return () => {
      wsService.off('score_update', handleScoreUpdate);
      wsService.off('match_start', handleMatchStart);
      wsService.off('match_end', handleMatchEnd);
    };
  }, [matchId, handleScoreUpdate, handleMatchStart, handleMatchEnd]);
};
