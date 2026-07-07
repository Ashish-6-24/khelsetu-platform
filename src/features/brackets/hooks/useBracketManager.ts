import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useCallback, useMemo, useState } from 'react';

import { bracketService } from '../services/bracketService';
import type { BracketData, BracketFormat, BracketTeam } from '../types';
import { advanceWinner } from '../utils/bracketGenerator';

interface UseBracketManagerOptions {
  tournamentId: string;
  initialFormat?: BracketFormat;
  initialTeams?: BracketTeam[];
}

export function useBracketManager({
  tournamentId,
  initialFormat = 'single-elimination',
  initialTeams = [],
}: UseBracketManagerOptions) {
  const queryClient = useQueryClient();
  const [localBracket, setLocalBracket] = useState<BracketData | null>(() => {
    if (initialTeams.length > 0) {
      return bracketService.generateBracket(
        initialFormat as
          'single-elimination' | 'double-elimination' | 'round-robin',
        initialTeams,
      );
    }
    return null;
  });

  const { data: savedBracket, isLoading } = useQuery({
    queryKey: ['bracket', tournamentId],
    queryFn: () => bracketService.loadBracket(tournamentId),
    enabled: !!tournamentId,
  });

  const activeBracket = localBracket ?? savedBracket;

  const generateMutation = useMutation({
    mutationFn: ({
      format,
      teams,
    }: {
      format: BracketFormat;
      teams: BracketTeam[];
    }) => {
      const bracket = bracketService.generateBracket(
        format as 'single-elimination' | 'double-elimination' | 'round-robin',
        teams,
      );
      return bracketService.saveBracket(tournamentId, bracket);
    },
    onSuccess: (data) => {
      setLocalBracket(data);
      queryClient.setQueryData(['bracket', tournamentId], data);
    },
  });

  const updateMatchMutation = useMutation({
    mutationFn: ({
      matchId,
      winner,
      scoreA,
      scoreB,
    }: {
      matchId: string;
      winner: 'teamA' | 'teamB';
      scoreA: number | null;
      scoreB: number | null;
    }) =>
      bracketService.updateMatchResult(
        tournamentId,
        matchId,
        winner,
        scoreA,
        scoreB,
      ),
    onSuccess: (data) => {
      setLocalBracket(data);
      queryClient.setQueryData(['bracket', tournamentId], data);
    },
  });

  const advanceWinnerLocal = useCallback(
    (matchId: string, winner: 'teamA' | 'teamB') => {
      setLocalBracket((prev) => {
        const base = prev ?? savedBracket;
        if (!base) return null;
        return advanceWinner(base, matchId, winner);
      });
    },
    [savedBracket],
  );

  const generateBracket = useCallback(
    (format: BracketFormat, teams: BracketTeam[]) => {
      return generateMutation.mutateAsync({ format, teams });
    },
    [generateMutation],
  );

  const stats = useMemo(() => {
    if (!activeBracket) {
      return {
        totalMatches: 0,
        completedMatches: 0,
        completionPercent: 0,
        totalRounds: 0,
      };
    }

    return {
      totalMatches: activeBracket.totalMatches,
      completedMatches: activeBracket.completedMatches,
      completionPercent:
        activeBracket.totalMatches > 0
          ? Math.round(
              (activeBracket.completedMatches / activeBracket.totalMatches) *
                100,
            )
          : 0,
      totalRounds: activeBracket.rounds.length,
    };
  }, [activeBracket]);

  return {
    bracket: activeBracket,
    generateBracket,
    advanceWinner: advanceWinnerLocal,
    updateMatch: updateMatchMutation.mutateAsync,
    stats,
    isLoading,
    isGenerating: generateMutation.isPending,
    isUpdating: updateMatchMutation.isPending,
    generateError: generateMutation.error,
    updateError: updateMatchMutation.error,
  };
}
