import { Badge } from '@shared/components/ui/Badge';
import { Button } from '@shared/components/ui/Button';
import { Card, CardBody, CardHeader } from '@shared/components/ui/Card';
import { MapPin, Plus, Users } from 'lucide-react';

import { useState } from 'react';

interface Venue {
  id: string;
  name: string;
  location: string;
  capacity: number;
  facilities: string[];
  status: 'available' | 'occupied' | 'maintenance';
}

const mockVenues: Venue[] = [
  {
    id: '1',
    name: 'Dasharath Stadium',
    location: 'Kathmandu',
    capacity: 25000,
    facilities: ['Floodlights', 'Pavilion', 'Practice Nets'],
    status: 'available',
  },
  {
    id: '2',
    name: 'Pokhara Stadium',
    location: 'Pokhara',
    capacity: 15000,
    facilities: ['Floodlights', 'Media Room'],
    status: 'occupied',
  },
  {
    id: '3',
    name: 'Bharatpur Stadium',
    location: 'Chitwan',
    capacity: 10000,
    facilities: ['Practice Nets'],
    status: 'available',
  },
];

export const VenuesPage = () => {
  const [venues] = useState<Venue[]>(mockVenues);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] dark:text-white">
            Venues
          </h1>
          <p className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)] mt-1">
            Manage grounds and facilities
          </p>
        </div>
        <Button variant="create" leftIcon={<Plus className="h-4 w-4" />}>
          Add Venue
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {venues.map((venue) => (
          <Card key={venue.id} hover>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[var(--text-primary)] dark:text-white">
                  {venue.name}
                </h3>
                <Badge
                  variant={
                    venue.status === 'available'
                      ? 'success'
                      : venue.status === 'occupied'
                        ? 'warning'
                        : 'default'
                  }
                  className="capitalize"
                >
                  {venue.status}
                </Badge>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                  <MapPin className="w-4 h-4" />
                  <span>{venue.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                  <Users className="w-4 h-4" />
                  <span>Capacity: {venue.capacity.toLocaleString()}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {venue.facilities.map((f) => (
                    <span
                      key={f}
                      className="text-xs px-2 py-1 bg-[var(--bg-surface-raised)] dark:bg-[var(--bg-surface-raised)] rounded text-[var(--text-secondary)] dark:text-[var(--text-secondary)]"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};
