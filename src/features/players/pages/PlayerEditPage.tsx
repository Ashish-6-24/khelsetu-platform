import { playerService } from '@features/players/services/playerService';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Player } from '@shared/types/tournament';
import { Button } from '@shared/ui/Button';
import { Card, CardBody } from '@shared/ui/Card';
import { ErrorState } from '@shared/ui/ErrorState';
import { Input } from '@shared/ui/Input';
import { Select } from '@shared/ui/Select';
import { useToast } from '@shared/ui/toast-context';
import { ROUTES } from '@shared/utils/constants';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useNavigate, useParams } from 'react-router-dom';

const playerSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  jerseyNumber: z.string().optional(),
  position: z.string().optional(),
});

type PlayerFormData = z.infer<typeof playerSchema>;

const POSITION_OPTIONS = [
  { value: '', label: 'Select position' },
  { value: 'Batsman', label: 'Batsman' },
  { value: 'Bowler', label: 'Bowler' },
  { value: 'All-Rounder', label: 'All-Rounder' },
  { value: 'Wicket-Keeper', label: 'Wicket-Keeper' },
  { value: 'Forward', label: 'Forward' },
  { value: 'Midfielder', label: 'Midfielder' },
  { value: 'Defender', label: 'Defender' },
  { value: 'Goalkeeper', label: 'Goalkeeper' },
];

export const PlayerEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const {
    data: player,
    isLoading,
    error,
    refetch,
  } = useQuery<Player | null>({
    queryKey: ['player', id],
    queryFn: () => playerService.getById(id!),
    enabled: !!id,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PlayerFormData>({
    resolver: zodResolver(playerSchema),
    defaultValues: {
      name: player?.name ?? '',
      jerseyNumber: player?.jerseyNumber?.toString() ?? '',
      position: player?.position ?? '',
    },
  });

  const updatePlayerMutation = useMutation({
    mutationFn: (data: PlayerFormData) =>
      playerService.update(id!, {
        name: data.name,
        jerseyNumber: data.jerseyNumber
          ? Number.parseInt(data.jerseyNumber, 10)
          : undefined,
        position: data.position || undefined,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['player', id] });
      queryClient.invalidateQueries({ queryKey: ['players'] });
      addToast({ type: 'success', message: 'Player updated successfully' });
      navigate(`/players/${id}`);
    },
    onError: () => {
      addToast({ type: 'error', message: 'Failed to update player' });
    },
  });

  const onSubmit = (data: PlayerFormData) => {
    updatePlayerMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-[var(--bg-surface-sunken)] rounded w-48" />
          <div className="h-4 bg-[var(--bg-surface-sunken)] rounded w-64" />
          <div className="h-64 bg-[var(--bg-surface-sunken)] rounded" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load player"
        message="Could not fetch player data. Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  if (!player) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Player Not Found
        </h1>
        <p className="text-[var(--text-secondary)]">
          The player you are looking for does not exist.
        </p>
        <Button onClick={() => navigate('/players')}>Back to Players</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => {
            if (window.history.length > 1) {
              navigate(-1);
            } else {
              navigate(ROUTES.PLAYERS);
            }
          }}
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Edit Player
          </h1>
          <p className="mt-1 text-sm text-[var(--text-tertiary)]">
            Update player details
          </p>
        </div>
      </div>

      <Card>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Player Name"
              {...register('name')}
              error={errors.name?.message}
              required
            />
            <Input
              label="Jersey Number"
              type="number"
              {...register('jerseyNumber')}
              error={errors.jerseyNumber?.message}
            />
            <Select
              label="Position"
              value={player?.position ?? ''}
              onChange={(value) => {
                const field = register('position');
                field.onChange({ target: { value } });
              }}
              options={POSITION_OPTIONS}
              error={errors.position?.message}
            />
            <div className="flex gap-2">
              <Button
                type="submit"
                variant="create"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                <Save className="w-4 h-4 mr-1" />
                Save Changes
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/players/${id}`)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
