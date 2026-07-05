import { useVenues } from '@features/venues/hooks/useVenues';
import { VenueCard } from '@features/venues/components/VenueCard';
import { VenueForm } from '@features/venues/components/VenueForm';
import { Button } from '@shared/components/ui/Button';
import { Card, CardBody } from '@shared/components/ui/Card';
import { Input } from '@shared/components/ui/Input';
import { Skeleton } from '@shared/components/ui/Skeleton';
import { Tabs } from '@shared/components/ui/Tabs';
import { MapPin, Plus, Search } from 'lucide-react';
import { useState } from 'react';

const STATUS_TABS = [
  { id: 'all', label: 'All' },
  { id: 'available', label: 'Available' },
  { id: 'occupied', label: 'Occupied' },
  { id: 'maintenance', label: 'Maintenance' },
];

export const VenuesPage = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [showForm, setShowForm] = useState(false);

  const {
    venues,
    isLoading,
    isError,
    error,
    createVenue,
    isCreating,
  } = useVenues({
    search,
    status,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-10 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Venues
          </h1>
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            Failed to load venues: {error?.message ?? 'Unknown error'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Venues
          </h1>
          <p className="text-[var(--text-tertiary)] mt-1">
            {venues.length} venue{venues.length !== 1 ? 's' : ''} available
          </p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Venue
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" />
          <Input
            placeholder="Search venues..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Tabs
          tabs={STATUS_TABS}
          activeTab={status}
          onChange={setStatus}
          variant="pills"
        />
      </div>

      {showForm && (
        <VenueForm
          onSubmit={async (data) => {
            await createVenue(data);
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
          isLoading={isCreating}
        />
      )}

      {venues.length === 0 ? (
        <Card>
          <CardBody className="p-12 text-center">
            <MapPin className="w-12 h-12 mx-auto text-[var(--text-tertiary)] mb-4" />
            <p className="text-[var(--text-tertiary)]">
              {search
                ? 'No venues match your search'
                : 'No venues added yet'}
            </p>
          </CardBody>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      )}
    </div>
  );
};
