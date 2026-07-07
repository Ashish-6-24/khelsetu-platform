import type { Standing } from '@shared/types/tournament';

export type { Standing };

export interface StandingUpdate {
  tournamentId: string;
  standings: Standing[];
}
