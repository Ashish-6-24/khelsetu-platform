import { Button } from '@shared/components/ui/Button';
import { Card, CardBody, CardHeader } from '@shared/components/ui/Card';
import { Input } from '@shared/components/ui/Input';
import { Select } from '@shared/components/ui/Select';
import { useState } from 'react';
import type { CreateVenueInput, Venue } from '../types';

interface VenueFormProps {
  venue?: Venue;
  onSubmit: (data: CreateVenueInput) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const FACILITY_OPTIONS = [
  'Floodlights',
  'Covered Stands',
  'Parking',
  'Changing Rooms',
  'Scoreboard',
  'First Aid',
  'Food Court',
  'VIP Box',
];

export function VenueForm({
  venue,
  onSubmit,
  onCancel,
  isLoading,
}: VenueFormProps) {
  const [formData, setFormData] = useState<CreateVenueInput>({
    name: venue?.name ?? '',
    location: venue?.location ?? '',
    capacity: venue?.capacity ?? 0,
    facilities: venue?.facilities ?? [],
    status: venue?.status ?? 'available',
    homeTeam: venue?.homeTeam ?? '',
    awayTeam: venue?.awayTeam ?? '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save venue');
    }
  };

  const toggleFacility = (facility: string) => {
    setFormData((prev) => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter((f) => f !== facility)
        : [...prev.facilities, facility],
    }));
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
          {venue ? 'Edit Venue' : 'Add New Venue'}
        </h3>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Venue Name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            required
          />

          <Input
            label="Location"
            value={formData.location}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, location: e.target.value }))
            }
            required
          />

          <Input
            label="Capacity"
            type="number"
            min={1}
            value={formData.capacity}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                capacity: Number(e.target.value),
              }))
            }
            required
          />

          <Select
            label="Status"
            value={formData.status}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                status: value as Venue['status'],
              }))
            }
            options={[
              { value: 'available', label: 'Available' },
              { value: 'occupied', label: 'Occupied' },
              { value: 'maintenance', label: 'Maintenance' },
            ]}
          />

          <Input
            label="Home Team (optional)"
            value={formData.homeTeam}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, homeTeam: e.target.value }))
            }
          />

          <Input
            label="Away Team (optional)"
            value={formData.awayTeam}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, awayTeam: e.target.value }))
            }
          />

          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Facilities
            </label>
            <div className="flex flex-wrap gap-2">
              {FACILITY_OPTIONS.map((facility) => (
                <button
                  key={facility}
                  type="button"
                  onClick={() => toggleFacility(facility)}
                  aria-pressed={formData.facilities.includes(facility)}
                  className={`min-h-[44px] px-4 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2 ${
                    formData.facilities.includes(facility)
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-subtle)]'
                  }`}
                >
                  {facility}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div role="alert" className="text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button type="submit" variant="create" disabled={isLoading}>
              {isLoading ? 'Saving...' : venue ? 'Update Venue' : 'Add Venue'}
            </Button>
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
