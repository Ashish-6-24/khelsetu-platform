import { useVenues } from '@features/venues/hooks/useVenues';
import { VenueCard } from '@features/venues/components/VenueCard';
import { VenueForm } from '@features/venues/components/VenueForm';
import { useReducedMotion } from '@shared/hooks/useReducedMotion';
import { Button } from '@shared/components/ui/Button';
import { Card, CardBody } from '@shared/components/ui/Card';
import { Input } from '@shared/components/ui/Input';
import { Skeleton } from '@shared/components/ui/Skeleton';
import { Tabs } from '@shared/components/ui/Tabs';
import { motion } from 'framer-motion';
import { MapPin, Plus, Search } from 'lucide-react';
import { useState } from 'react';

const STATUS_TABS = [
  { id: 'all', label: 'All' },
  { id: 'available', label: 'Available' },
  { id: 'occupied', label: 'Occupied' },
  { id: 'maintenance', label: 'Maintenance' },
];

export const VenuesPage = () => {
  const prefersReducedMotion = useReducedMotion();
  const [search, setSearch] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
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
      <div className="space-y-6" aria-busy="true" aria-live="polite" aria-label="Loading venues">
        <Skeleton className="h-8 w-40" aria-hidden="true" />
        <Skeleton className="h-10 w-full" aria-hidden="true" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32" aria-hidden="true" />
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
          <div role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">
            Failed to load venues: {error?.message ?? 'Unknown error'}
          </div>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
  } as const;

  const listVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05 } },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' as const } },
  } as const;

  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Venues
          </h1>
          <p className="text-[var(--text-tertiary)] mt-1">
            {venues.length} venue{venues.length !== 1 ? 's' : ''} available
          </p>
        </div>
        <Button variant="create" leftIcon={<Plus className="h-4 w-4" />} onClick={() => setShowForm(true)}>
          Add Venue
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <motion.div
            animate={searchFocused ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute left-3 top-1/2 -translate-y-1/2"
          >
            <Search className="w-4 h-4 text-[var(--text-tertiary)]" aria-hidden="true" />
          </motion.div>
          <Input
            placeholder="Search venues..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="pl-10"
          />
        </div>
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <Tabs
            tabs={STATUS_TABS}
            activeTab={status}
            onChange={setStatus}
            variant="pills"
          />
        </div>
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
            <MapPin className="w-12 h-12 mx-auto text-[var(--text-tertiary)] mb-4" aria-hidden="true" />
            <p className="text-[var(--text-tertiary)]">
              {search
                ? 'No venues match your search'
                : 'No venues added yet'}
            </p>
          </CardBody>
        </Card>
      ) : (
        <motion.div
          variants={prefersReducedMotion ? undefined : listVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {venues.map((venue) => (
            <motion.div key={venue.id} variants={prefersReducedMotion ? undefined : itemVariants}>
              <VenueCard venue={venue} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};
