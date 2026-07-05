export interface Venue {
  id: string;
  name: string;
  location: string;
  capacity: number;
  facilities: string[];
  status: 'available' | 'occupied' | 'maintenance';
  homeTeam?: string;
  awayTeam?: string;
}

export interface CreateVenueInput {
  name: string;
  location: string;
  capacity: number;
  facilities: string[];
  status?: 'available' | 'occupied' | 'maintenance';
  homeTeam?: string;
  awayTeam?: string;
}
