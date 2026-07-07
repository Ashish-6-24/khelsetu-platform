import { Badge } from '@shared/ui/Badge';
import { Card, CardBody } from '@shared/ui/Card';
import { motion } from 'framer-motion';
import { MapPin, Users, Wrench } from 'lucide-react';

import type { Venue } from '../types';

interface VenueCardProps {
  venue: Venue;
  onClick?: () => void;
}

const statusConfig = {
  available: { label: 'Available', variant: 'success' as const },
  occupied: { label: 'Occupied', variant: 'warning' as const },
  maintenance: { label: 'Maintenance', variant: 'error' as const },
};

export function VenueCard({ venue, onClick }: VenueCardProps) {
  const statusInfo = statusConfig[venue.status];

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer hover:shadow-md transition-shadow min-h-[48px]"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-label={`View ${venue.name} venue details, ${venue.location}, ${statusInfo.label}`}
    >
      <Card>
        <CardBody className="p-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="font-semibold text-[var(--text-primary)]">
                {venue.name}
              </h3>
              <div className="flex items-center gap-1 text-sm text-[var(--text-tertiary)]">
                <MapPin className="w-3 h-3" aria-hidden="true" />
                {venue.location}
              </div>
            </div>
            <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
          </div>

          <div className="mt-3 flex items-center gap-4 text-sm text-[var(--text-secondary)]">
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" aria-hidden="true" />
              {venue.capacity.toLocaleString()}
            </div>
            {venue.facilities.length > 0 && (
              <div className="flex items-center gap-1">
                <Wrench className="w-3 h-3" aria-hidden="true" />
                {venue.facilities.length} facilities
              </div>
            )}
          </div>

          {(venue.homeTeam || venue.awayTeam) && (
            <div className="mt-2 text-xs text-[var(--text-tertiary)]">
              {venue.homeTeam && <span>Home: {venue.homeTeam}</span>}
              {venue.homeTeam && venue.awayTeam && <span> · </span>}
              {venue.awayTeam && <span>Away: {venue.awayTeam}</span>}
            </div>
          )}
        </CardBody>
      </Card>
    </motion.div>
  );
}
