import { TournamentFormWizard } from '@features/tournaments/components';
import { tournamentService } from '@services/api/tournament';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

interface FormErrors {
  [key: string]: string | undefined;
  name?: string;
  sport?: string;
  venue?: string;
  format?: string;
  startDate?: string;
  endDate?: string;
  maxTeams?: string;
}

export const TournamentCreatePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, unknown>>({
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
    mutationFn: (data: Record<string, unknown>) =>
      tournamentService.create(data as never),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tournaments'] });
      navigate('/tournaments');
    },
  });

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    switch (step) {
      case 1:
        if (!formData.name || (formData.name as string).trim() === '') {
          newErrors.name = 'Tournament name is required';
        }
        if (!formData.sport || (formData.sport as string).trim() === '') {
          newErrors.sport = 'Sport is required';
        }
        if (!formData.venue || (formData.venue as string).trim() === '') {
          newErrors.venue = 'Venue is required';
        }
        break;
      case 2:
        if (!formData.format || (formData.format as string).trim() === '') {
          newErrors.format = 'Format is required';
        }
        if (!formData.maxTeams || (formData.maxTeams as number) < 2) {
          newErrors.maxTeams = 'Minimum 2 teams required';
        }
        break;
      case 3:
        if (
          !formData.startDate ||
          (formData.startDate as string).trim() === ''
        ) {
          newErrors.startDate = 'Start date is required';
        }
        if (!formData.endDate || (formData.endDate as string).trim() === '') {
          newErrors.endDate = 'End date is required';
        }
        if (
          formData.startDate &&
          formData.endDate &&
          new Date(formData.endDate as string) <
            new Date(formData.startDate as string)
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
    setFormData((prev) => ({ ...prev, [field]: value }));
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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create Tournament
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
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
