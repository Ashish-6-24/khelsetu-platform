import { useTeams } from '@features/teams/hooks/useTeams';
import { Button } from '@shared/ui/Button';
import { Input } from '@shared/ui/Input';
import { Select } from '@shared/ui/Select';
import { CalendarDays, MapPin, Trophy } from 'lucide-react';

import { useState } from 'react';

interface CreateMatchModalProps {
  tournamentId?: string;
  onSubmit: (data: {
    teamAId: string;
    teamBId: string;
    scheduledAt: string;
    venue: string;
  }) => Promise<void>;
  onClose: () => void;
  isLoading?: boolean;
}

export function CreateMatchModal({
  tournamentId,
  onSubmit,
  onClose,
  isLoading,
}: CreateMatchModalProps) {
  const { teams } = useTeams({ tournamentId });
  const [formData, setFormData] = useState({
    teamAId: '',
    teamBId: '',
    scheduledAt: '',
    venue: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    onClose();
  };

  const teamOptions = teams.map((t) => ({ value: t.id, label: t.name }));
  const isFormValid =
    formData.teamAId &&
    formData.teamBId &&
    formData.scheduledAt &&
    formData.venue;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-sunken)]/50 p-4 space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)]">
          <Trophy className="h-4 w-4 text-[var(--brand-primary)]" />
          Match Setup
        </div>
        <Select
          label="Home Team"
          value={formData.teamAId}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, teamAId: value }))
          }
          options={teamOptions}
          required
        />
        <Select
          label="Away Team"
          value={formData.teamBId}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, teamBId: value }))
          }
          options={teamOptions.filter((o) => o.value !== formData.teamAId)}
          required
        />
      </div>

      <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-sunken)]/50 p-4 space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)]">
          <CalendarDays className="h-4 w-4 text-[var(--brand-primary)]" />
          Schedule
        </div>
        <Input
          label="Date & Time"
          type="datetime-local"
          value={formData.scheduledAt}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              scheduledAt: e.target.value,
            }))
          }
          required
        />
        <Input
          label="Venue"
          value={formData.venue}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, venue: e.target.value }))
          }
          placeholder="e.g. Dasharath Stadium"
          leftIcon={<MapPin className="h-4 w-4" />}
          required
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isLoading || !isFormValid}
          isLoading={isLoading}
          leftIcon={!isLoading ? <Trophy className="h-4 w-4" /> : undefined}
          className="flex-1"
        >
          {isLoading ? 'Creating Match...' : 'Create Match'}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="lg"
          onClick={onClose}
          className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
