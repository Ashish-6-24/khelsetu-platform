import { Button } from '@shared/components/ui/Button';
import { Card, CardBody, CardHeader } from '@shared/components/ui/Card';
import { Input } from '@shared/components/ui/Input';
import { Select } from '@shared/components/ui/Select';
import { useTeams } from '@features/teams/hooks/useTeams';
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

  return (
    <Card elevated>
      <CardHeader>
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
          Create New Match
        </h3>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            required
          />

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Match'}
            </Button>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
