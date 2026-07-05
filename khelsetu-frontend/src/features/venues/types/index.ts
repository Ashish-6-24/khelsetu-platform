export type { Venue } from '@shared/types/tournament';

export interface CreateVenueInput {
  name: string;
  location: string;
  capacity: number;
  facilities: string[];
  status?: 'available' | 'occupied' | 'maintenance';
  homeTeam?: string;
  awayTeam?: string;
}
