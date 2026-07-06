import {
  type TournamentFormData,
  TournamentFormWizard,
} from '@features/tournaments/components';
import { tournamentService } from '@features/tournaments/services/tournament';
import type { Tournament } from '@shared/types/tournament';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

interface FormErrors {
  name?: string;
  sport?: string;
  venue?: string;
  format?: string;
  startDate?: string;
  endDate?: string;
  maxTeams?: string;
}

export const TournamentEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<FormErrors>({});

  const { data: tournament, isLoading } = useQuery<Tournament | null>({
    queryKey: ['tournament', id],
    queryFn: () => tournamentService.getById(id!),
    enabled: !!id,
  });

  const [formData, setFormData] = useState<TournamentFormData>({
    name: tournament?.name ?? '',
    description: tournament?.description ?? '',
    sport: tournament?.sport ?? '',
    format: tournament?.format ?? '',
    startDate: tournament?.startDate ?? '',
    endDate: tournament?.endDate ?? '',
    venue: tournament?.venue ?? '',
    maxTeams: tournament?.maxTeams ?? 0,
    entryFee: tournament?.entryFee ?? 0,
    prizePool: tournament?.prizePool ?? 0,
    rules: tournament?.rules ?? '',
  });

  const updateTournament = useMutation({
    mutationFn: (data: TournamentFormData) =>
      tournamentService.update(id!, {
        ...data,
        format: data.format || undefined,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tournament', id] });
      queryClient.invalidateQueries({ queryKey: ['tournaments'] });
      navigate(`/tournaments/${id}`);
    },
  });

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    switch (step) {
      case 1:
        if (!formData.name || formData.name.trim() === '') {
          newErrors.name = 'Tournament name is required';
        }
        break;
      case 2:
        if (!formData.maxTeams || formData.maxTeams < 2) {
          newErrors.maxTeams = 'Minimum 2 teams required';
        }
        break;
      case 3:
        if (
          formData.startDate &&
          formData.endDate &&
          new Date(formData.endDate) < new Date(formData.startDate)
        ) {
          newErrors.endDate = 'End date must be after start date';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStepChange = (step: number) => {
    if (validateStep(currentStep)) {
      setCurrentStep(step);
    }
  };

  const handleFieldChange = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value as never }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = () => {
    updateTournament.mutate(formData);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64" />
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Tournament Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          The tournament you are looking for does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Edit Tournament
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Update tournament details
        </p>
      </div>

      <TournamentFormWizard
        formData={formData}
        errors={errors}
        currentStep={currentStep}
        isSubmitting={updateTournament.isPending}
        onStepChange={handleStepChange}
        onFieldChange={handleFieldChange}
        onSubmit={handleSubmit}
        onBack={handleBack}
      />
    </div>
  );
};
