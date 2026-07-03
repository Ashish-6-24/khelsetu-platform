import { Button } from '@shared/components/ui/Button';
import { Card, CardBody } from '@shared/components/ui/Card';
import { Input } from '@shared/components/ui/Input';
import { Select } from '@shared/components/ui/Select';
import type { TournamentFormat } from '@shared/types/tournament';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface TournamentStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const TOURNAMENT_STEPS: TournamentStep[] = [
  {
    id: 1,
    title: 'Basic Info',
    description: 'Name, sport, and venue',
    icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    id: 2,
    title: 'Format',
    description: 'Tournament structure',
    icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
  },
  {
    id: 3,
    title: 'Schedule',
    description: 'Dates and timing',
    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  },
  {
    id: 4,
    title: 'Rules',
    description: 'Rules and pricing',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
  {
    id: 5,
    title: 'Review',
    description: 'Confirm and create',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  },
];

interface StepIndicatorProps {
  currentStep: number;
  completedSteps: number[];
}

export const TournamentStepIndicator = ({
  currentStep,
  completedSteps,
}: StepIndicatorProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {TOURNAMENT_STEPS.map((step, index) => (
          <div
            key={step.id}
            className="flex items-center flex-1 last:flex-none"
          >
            <div className="flex flex-col items-center">
              <div
                className={clsx(
                  'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300',
                  completedSteps.includes(step.id)
                    ? 'bg-green-500 text-white'
                    : currentStep === step.id
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-900'
                      : 'bg-gray-200 dark:bg-[var(--bg-surface-raised)] text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]',
                )}
              >
                {completedSteps.includes(step.id) ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-semibold">{step.id}</span>
                )}
              </div>
              <div className="mt-2 text-center hidden sm:block">
                <p
                  className={clsx(
                    'text-xs font-medium',
                    currentStep === step.id
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]',
                  )}
                >
                  {step.title}
                </p>
              </div>
            </div>
            {index < TOURNAMENT_STEPS.length - 1 && (
              <div
                className={clsx(
                  'flex-1 h-0.5 mx-2 sm:mx-4',
                  completedSteps.includes(step.id + 1)
                    ? 'bg-green-500'
                    : 'bg-gray-200 dark:bg-[var(--bg-surface-raised)]',
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

interface TournamentFormWizardProps {
  formData: Record<string, unknown>;
  errors: Record<string, string | undefined>;
  currentStep: number;
  isSubmitting: boolean;
  onStepChange: (step: number) => void;
  onFieldChange: (field: string, value: unknown) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export const TournamentFormWizard = ({
  formData,
  errors,
  currentStep,
  isSubmitting,
  onStepChange,
  onFieldChange,
  onSubmit,
  onBack,
}: TournamentFormWizardProps) => {
  const formatOptions: { value: TournamentFormat; label: string }[] = [
    { value: 'league', label: 'League (Round Robin)' },
    { value: 'knockout', label: 'Knockout (Single Elimination)' },
    { value: 'round-robin', label: 'Round Robin' },
    { value: 'swiss', label: 'Swiss System' },
  ];

  const sportOptions = [
    { value: 'Cricket', label: 'Cricket' },
    { value: 'Football', label: 'Football' },
    { value: 'Basketball', label: 'Basketball' },
    { value: 'Volleyball', label: 'Volleyball' },
    { value: 'Badminton', label: 'Badminton' },
    { value: 'Table Tennis', label: 'Table Tennis' },
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold text-[var(--text-primary)] dark:text-white">
              Tournament Basic Information
            </h2>
            <Input
              label="Tournament Name"
              value={(formData.name as string) ?? ''}
              onChange={(e) => onFieldChange('name', e.target.value)}
              placeholder="e.g., Summer Cricket League 2026"
              error={errors.name}
              required
            />
            <Input
              label="Description"
              value={(formData.description as string) ?? ''}
              onChange={(e) => onFieldChange('description', e.target.value)}
              placeholder="Brief description of the tournament"
            />
            <Select
              label="Sport"
              value={(formData.sport as string) ?? ''}
              onChange={(value) => onFieldChange('sport', value)}
              options={sportOptions}
              error={errors.sport}
              placeholder="Select a sport"
            />
            <Input
              label="Venue"
              value={(formData.venue as string) ?? ''}
              onChange={(e) => onFieldChange('venue', e.target.value)}
              placeholder="e.g., City Stadium"
              error={errors.venue}
              required
            />
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold text-[var(--text-primary)] dark:text-white">
              Tournament Format & Structure
            </h2>
            <Select
              label="Format"
              value={(formData.format as string) ?? ''}
              onChange={(value) => onFieldChange('format', value)}
              options={formatOptions}
              error={errors.format}
              placeholder="Select tournament format"
            />
            <Input
              label="Maximum Teams"
              type="number"
              value={(formData.maxTeams as number)?.toString() ?? ''}
              onChange={(e) =>
                onFieldChange('maxTeams', parseInt(e.target.value, 10))
              }
              placeholder="e.g., 16"
              error={errors.maxTeams}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Entry Fee (Optional)"
                type="number"
                value={(formData.entryFee as number)?.toString() ?? ''}
                onChange={(e) =>
                  onFieldChange('entryFee', parseFloat(e.target.value) || 0)
                }
                placeholder="0"
              />
              <Input
                label="Prize Pool (Optional)"
                type="number"
                value={(formData.prizePool as number)?.toString() ?? ''}
                onChange={(e) =>
                  onFieldChange('prizePool', parseFloat(e.target.value) || 0)
                }
                placeholder="0"
              />
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold text-[var(--text-primary)] dark:text-white">
              Schedule & Dates
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Start Date"
                type="date"
                value={(formData.startDate as string) ?? ''}
                onChange={(e) => onFieldChange('startDate', e.target.value)}
                error={errors.startDate}
                required
              />
              <Input
                label="End Date"
                type="date"
                value={(formData.endDate as string) ?? ''}
                onChange={(e) => onFieldChange('endDate', e.target.value)}
                error={errors.endDate}
                required
              />
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold text-[var(--text-primary)] dark:text-white">
              Rules & Regulations
            </h2>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] dark:text-[var(--text-secondary)] mb-1">
                Tournament Rules
              </label>
              <textarea
                value={(formData.rules as string) ?? ''}
                onChange={(e) => onFieldChange('rules', e.target.value)}
                placeholder="Enter tournament rules and regulations..."
                rows={6}
                className="w-full px-3 py-2 border border-[var(--border-strong)] dark:border-[var(--border-strong)] rounded-xl bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] text-[var(--text-primary)] dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          </motion.div>
        );
      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold text-[var(--text-primary)] dark:text-white">
              Review & Confirm
            </h2>
            <Card>
              <CardBody>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                      Tournament Name
                    </p>
                    <p className="font-medium text-[var(--text-primary)] dark:text-white">
                      {(formData.name as string) || '—'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                      Sport
                    </p>
                    <p className="font-medium text-[var(--text-primary)] dark:text-white">
                      {(formData.sport as string) || '—'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                      Format
                    </p>
                    <p className="font-medium text-[var(--text-primary)] dark:text-white capitalize">
                      {(formData.format as string) || '—'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                      Max Teams
                    </p>
                    <p className="font-medium text-[var(--text-primary)] dark:text-white">
                      {(formData.maxTeams as number) || '—'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                      Start Date
                    </p>
                    <p className="font-medium text-[var(--text-primary)] dark:text-white">
                      {(formData.startDate as string) || '—'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                      End Date
                    </p>
                    <p className="font-medium text-[var(--text-primary)] dark:text-white">
                      {(formData.endDate as string) || '—'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                      Venue
                    </p>
                    <p className="font-medium text-[var(--text-primary)] dark:text-white">
                      {(formData.venue as string) || '—'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                      Entry Fee
                    </p>
                    <p className="font-medium text-[var(--text-primary)] dark:text-white">
                      {formData.entryFee
                        ? `$${formData.entryFee as number}`
                        : 'Free'}
                    </p>
                  </div>
                </div>
                {(formData.rules as string) && (
                  <div className="mt-4 pt-4 border-t border-[var(--border-subtle)] dark:border-[var(--border-subtle)]">
                    <p className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)] text-sm">
                      Rules
                    </p>
                    <p className="text-sm text-[var(--text-primary)] dark:text-[var(--text-secondary)] mt-1 whitespace-pre-wrap">
                      {String(formData.rules)}
                    </p>
                  </div>
                )}
              </CardBody>
            </Card>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <TournamentStepIndicator
        currentStep={currentStep}
        completedSteps={TOURNAMENT_STEPS.filter((s) => s.id < currentStep).map(
          (s) => s.id,
        )}
      />

      <Card>
        <CardBody>{renderStepContent()}</CardBody>
      </Card>

      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={currentStep === 1 || isSubmitting}
        >
          Back
        </Button>
        {currentStep < 5 ? (
          <Button
            variant="secondary"
            onClick={() => onStepChange(currentStep + 1)}
          >
            Next Step
          </Button>
        ) : (
          <Button variant="create" onClick={onSubmit} isLoading={isSubmitting}>
            Create Tournament
          </Button>
        )}
      </div>
    </div>
  );
};
