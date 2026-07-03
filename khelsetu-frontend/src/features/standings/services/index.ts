import type { Standing } from '@features/standings/types';
import { tournamentService } from '@features/tournaments/services/tournament';

export const standingsService = {
  getStandings: async (tournamentId: string): Promise<Standing[]> => {
    const data = await tournamentService.getStandings(tournamentId);
    return data as Standing[];
  },
};
