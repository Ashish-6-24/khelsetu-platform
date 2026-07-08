import type { TournamentFormat } from '@shared/types/tournament';
import { Button } from '@shared/ui/Button';
import { Card, CardBody } from '@shared/ui/Card';
import { Input } from '@shared/ui/Input';
import { Select } from '@shared/ui/Select';
import { formatCurrency } from '@shared/utils/formatting';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = ({ label, error, id, className, ...props }: TextareaProps) => {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label && (
        <div className="mb-1.5">
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-[var(--text-secondary)] dark:text-[var(--text-secondary)]"
          >
            {label}
          </label>
        </div>
      )}
      <textarea
        id={textareaId}
        className={clsx(
          'block w-full rounded-xl border bg-[var(--bg-surface)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]',
          'px-3.5 py-2.5 transition-all duration-200 ease-out',
          'border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:shadow-sm',
          'focus:border-[var(--brand-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--brand-primary)]/12 focus:shadow-md',
          'dark:border-[var(--border-subtle)] dark:bg-[var(--bg-surface-sunken)] dark:text-white dark:placeholder:text-[var(--text-muted)]',
          'dark:hover:border-[var(--border-strong)] dark:hover:shadow-sm dark:focus:border-[var(--brand-primary)] dark:focus:ring-[var(--brand-primary)]/15 dark:focus:shadow-md',
          'disabled:cursor-not-allowed disabled:opacity-50 resize-none',
          error &&
            'border-red-400 focus:border-red-500 focus:ring-red-500/15 dark:border-red-500/60',
          className,
        )}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        {...props}
      />
      {error && (
        <p
          id={`${textareaId}-error`}
          className="mt-1.5 text-sm text-red-600 dark:text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export interface TournamentFormData {
  name: string;
  description: string;
  sport: string;
  venue: string;
  format: TournamentFormat | '';
  maxTeams: number;
  entryFee: number;
  prizePool: number;
  startDate: string;
  endDate: string;
  rules: string;
}

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
    <nav aria-label="Tournament setup steps" className="mb-8">
      <ol className="flex items-center justify-between list-none">
        {TOURNAMENT_STEPS.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = currentStep === step.id;
          let stepDotClass: string;
          if (isCompleted) {
            stepDotClass = 'bg-[var(--brand-primary)] text-white';
          } else if (isCurrent) {
            stepDotClass =
              'bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-900';
          } else {
            stepDotClass =
              'bg-[var(--bg-surface-sunken)] dark:bg-[var(--bg-surface-raised)] text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]';
          }
          let stepAriaLabel: string;
          if (isCompleted) {
            stepAriaLabel = `${step.title}, completed`;
          } else if (isCurrent) {
            stepAriaLabel = `${step.title}, current`;
          } else {
            stepAriaLabel = step.title;
          }
          return (
            <li
              key={step.id}
              className="flex items-center flex-1 last:flex-none"
              aria-current={isCurrent ? 'step' : undefined}
            >
              <div className="flex flex-col items-center">
                <div
                  className={clsx(
                    'w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300',
                    stepDotClass,
                  )}
                  aria-label={`Step ${index + 1}: ${stepAriaLabel}`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <span className="text-sm font-semibold">{step.id}</span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p
                    className={clsx(
                      'text-[10px] sm:text-xs font-medium',
                      isCurrent
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
                      ? 'bg-[var(--brand-primary)]'
                      : 'bg-[var(--bg-surface-sunken)] dark:bg-[var(--bg-surface-raised)]',
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

interface TournamentFormWizardProps {
  formData: TournamentFormData;
  errors: Partial<Record<keyof TournamentFormData, string>>;
  currentStep: number;
  isSubmitting: boolean;
  onStepChange: (step: number) => void;
  onFieldChange: (
    field: keyof TournamentFormData,
    value: string | number,
  ) => void;
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
              value={formData.name}
              onChange={(e) => onFieldChange('name', e.target.value)}
              placeholder="e.g., Summer Cricket League 2026"
              error={errors.name}
              required
            />
            <Input
              label="Description"
              value={formData.description}
              onChange={(e) => onFieldChange('description', e.target.value)}
              placeholder="Brief description of the tournament"
            />
            <Select
              label="Sport"
              value={formData.sport}
              onChange={(value) => onFieldChange('sport', value)}
              options={sportOptions}
              error={errors.sport}
              placeholder="Select a sport"
            />
            <Input
              label="Venue"
              value={formData.venue}
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
              value={formData.format}
              onChange={(value) => onFieldChange('format', value)}
              options={formatOptions}
              error={errors.format}
              placeholder="Select tournament format"
            />
            <Input
              label="Maximum Teams"
              type="number"
              value={formData.maxTeams?.toString() ?? ''}
              onChange={(e) =>
                onFieldChange('maxTeams', Number.parseInt(e.target.value, 10))
              }
              placeholder="e.g., 16"
              error={errors.maxTeams}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Entry Fee (Optional)"
                type="number"
                value={formData.entryFee?.toString() ?? ''}
                onChange={(e) =>
                  onFieldChange(
                    'entryFee',
                    Number.parseFloat(e.target.value) || 0,
                  )
                }
                placeholder="0"
              />
              <Input
                label="Prize Pool (Optional)"
                type="number"
                value={formData.prizePool?.toString() ?? ''}
                onChange={(e) =>
                  onFieldChange(
                    'prizePool',
                    Number.parseFloat(e.target.value) || 0,
                  )
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
                value={formData.startDate}
                onChange={(e) => onFieldChange('startDate', e.target.value)}
                error={errors.startDate}
                required
              />
              <Input
                label="End Date"
                type="date"
                value={formData.endDate}
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
            <Textarea
              label="Tournament Rules"
              value={formData.rules}
              onChange={(e) => onFieldChange('rules', e.target.value)}
              placeholder="Enter tournament rules and regulations..."
              rows={6}
            />
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
                      {formData.name || '—'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                      Sport
                    </p>
                    <p className="font-medium text-[var(--text-primary)] dark:text-white">
                      {formData.sport || '—'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                      Format
                    </p>
                    <p className="font-medium text-[var(--text-primary)] dark:text-white capitalize">
                      {formData.format || '—'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                      Max Teams
                    </p>
                    <p className="font-medium text-[var(--text-primary)] dark:text-white">
                      {formData.maxTeams || '—'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                      Start Date
                    </p>
                    <p className="font-medium text-[var(--text-primary)] dark:text-white">
                      {formData.startDate || '—'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                      End Date
                    </p>
                    <p className="font-medium text-[var(--text-primary)] dark:text-white">
                      {formData.endDate || '—'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                      Venue
                    </p>
                    <p className="font-medium text-[var(--text-primary)] dark:text-white">
                      {formData.venue || '—'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                      Entry Fee
                    </p>
                    <p className="font-medium text-[var(--text-primary)] dark:text-white">
                      {formData.entryFee
                        ? formatCurrency(formData.entryFee)
                        : 'Free'}
                    </p>
                  </div>
                </div>
                {formData.rules && (
                  <div className="mt-4 pt-4 border-t border-[var(--border-subtle)] dark:border-[var(--border-subtle)]">
                    <p className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)] text-sm">
                      Rules
                    </p>
                    <p className="text-sm text-[var(--text-primary)] dark:text-[var(--text-secondary)] mt-1 whitespace-pre-wrap">
                      {formData.rules}
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
          aria-label="Go back to previous step"
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
