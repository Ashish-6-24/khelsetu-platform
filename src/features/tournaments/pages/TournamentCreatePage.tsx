import {
  type TournamentFormData,
  TournamentFormWizard,
} from '@features/tournaments/components';
import { tournamentService } from '@shared/api/tournaments';
import type { TournamentFormat } from '@shared/types/tournament';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

interface FormErrors {
  name?: string;
  sport?: string;
  venue?: string;
  format?: string;
  startDate?: string;
  endDate?: string;
  maxTeams?: string;
}

function validateStep1(data: TournamentFormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name || data.name.trim() === '')
    errors.name = 'Tournament name is required';
  if (!data.sport || data.sport.trim() === '')
    errors.sport = 'Sport is required';
  if (!data.venue || data.venue.trim() === '')
    errors.venue = 'Venue is required';
  return errors;
}

function validateStep2(data: TournamentFormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.format || data.format.trim() === '')
    errors.format = 'Format is required';
  if (!data.maxTeams || data.maxTeams < 2)
    errors.maxTeams = 'Minimum 2 teams required';
  return errors;
}

function validateStep3(data: TournamentFormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.startDate || data.startDate.trim() === '')
    errors.startDate = 'Start date is required';
  if (!data.endDate || data.endDate.trim() === '')
    errors.endDate = 'End date is required';
  if (
    data.startDate &&
    data.endDate &&
    new Date(data.endDate) < new Date(data.startDate)
  ) {
    errors.endDate = 'End date must be after start date';
  }
  return errors;
}

export const TournamentCreatePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<TournamentFormData>({
    name: '',
    description: '',
    sport: '',
    format: '',
    startDate: '',
    endDate: '',
    venue: '',
    maxTeams: 0,
    entryFee: 0,
    prizePool: 0,
    rules: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const createTournament = useMutation({
    mutationFn: (data: TournamentFormData) =>
      tournamentService.create({
        name: data.name,
        description: data.description,
        sport: data.sport,
        format: data.format as TournamentFormat,
        startDate: data.startDate,
        endDate: data.endDate,
        venue: data.venue,
        maxTeams: data.maxTeams,
        entryFee: data.entryFee,
        prizePool: data.prizePool,
        rules: data.rules,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tournaments'] });
      navigate('/tournaments');
    },
  });

  const validateStep = (step: number): boolean => {
    const validators = [validateStep1, validateStep2, validateStep3];
    const newErrors = validators[step - 1]?.(formData) ?? {};
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
    createTournament.mutate(formData);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Create Tournament
        </h1>
        <p className="mt-1 text-sm text-[var(--text-tertiary)]">
          Set up a new tournament with all the details
        </p>
      </div>

      <TournamentFormWizard
        formData={formData}
        errors={errors}
        currentStep={currentStep}
        isSubmitting={createTournament.isPending}
        onStepChange={handleStepChange}
        onFieldChange={handleFieldChange}
        onSubmit={handleSubmit}
        onBack={handleBack}
      />
    </div>
  );
};
