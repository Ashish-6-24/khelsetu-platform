import { clsx } from 'clsx';
import { CheckCircle2, Eye, EyeOff, Loader2 } from 'lucide-react';

import { forwardRef, useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  helperText?: string;
  optional?: boolean;
  /** 0–4 password strength; renders <PasswordStrength /> beneath the field. */
  strength?: 0 | 1 | 2 | 3 | 4;
  /** Show validation state: 'validating' (spinner) or 'valid' (checkmark) */
  validationState?: 'validating' | 'valid';
}

const strengthLabels = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong'] as const;
const strengthColors = [
  'bg-[var(--bg-surface-sunken)] dark:bg-[var(--bg-surface-raised)]',
  'bg-red-500',
  'bg-amber-500',
  'bg-blue-500',
  'bg-emerald-500',
] as const;
const strengthTextColors = [
  'text-[var(--text-muted)]',
  'text-red-600 dark:text-red-400',
  'text-amber-600 dark:text-amber-400',
  'text-blue-600 dark:text-blue-400',
  'text-emerald-600 dark:text-emerald-400',
] as const;

const PasswordStrength = ({ level }: { level: 0 | 1 | 2 | 3 | 4 }) => {
  return (
    <div
      className="mt-2 flex items-center gap-2"
      role="status"
      aria-live="polite"
      aria-label={`Password strength: ${strengthLabels[level]}`}
    >
      <div className="flex flex-1 gap-1" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={clsx(
              'h-1 flex-1 rounded-full transition-colors duration-300',
              i < level
                ? strengthColors[level]
                : 'bg-[var(--bg-surface-sunken)]/80 dark:bg-[var(--bg-surface-raised)]/60',
            )}
          />
        ))}
      </div>
      <span
        className={clsx(
          'min-w-[64px] text-right text-xs font-semibold tabular-nums',
          strengthTextColors[level],
        )}
      >
        {strengthLabels[level]}
      </span>
    </div>
  );
};

function RightIcon({
  isPassword,
  showPassword,
  setShowPassword,
  validationState,
  rightIcon,
}: {
  isPassword: boolean;
  showPassword: boolean;
  setShowPassword: (v: boolean | ((s: boolean) => boolean)) => void;
  validationState?: 'validating' | 'valid';
  rightIcon?: React.ReactNode;
}) {
  if (isPassword) {
    return (
      <button
        type="button"
        onClick={() => setShowPassword((s) => !s)}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
        aria-pressed={showPassword}
        className="absolute inset-y-0 right-0 flex min-h-11 min-w-11 items-center justify-center pr-3 text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-secondary)] focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </button>
    );
  }
  if (validationState === 'validating') {
    return (
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
      </div>
    );
  }
  if (validationState === 'valid') {
    return (
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
      </div>
    );
  }
  if (rightIcon) {
    return (
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-[var(--text-tertiary)]">
        {rightIcon}
      </div>
    );
  }
  return null;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      leftIcon,
      rightIcon,
      helperText,
      optional = false,
      strength,
      validationState,
      className,
      id,
      type = 'text',
      ...props
    },
    ref,
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const actualType = isPassword && showPassword ? 'text' : type;

    return (
      <div className="w-full">
        {label && (
          <div className="mb-1.5 flex items-center justify-between">
            <label
              htmlFor={inputId}
              className="text-sm font-medium text-[var(--text-secondary)]"
            >
              {label}
              {!optional && <span className="ml-0.5 text-red-500">*</span>}
            </label>
            {optional && (
              <span className="text-xs text-[var(--text-tertiary)]">
                Optional
              </span>
            )}
          </div>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[var(--text-tertiary)]">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            type={actualType}
            className={clsx(
              'block w-full rounded-xl border bg-[var(--bg-surface)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]',
              'h-11 transition-all duration-200 ease-out',
              'border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:shadow-sm',
              'focus:border-[var(--brand-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--brand-primary)]/12 focus:shadow-md',
              'disabled:cursor-not-allowed disabled:opacity-50',
              leftIcon ? 'pl-10' : 'pl-3.5',
              rightIcon || isPassword || validationState ? 'pr-12' : 'pr-3.5',
              error &&
                'border-red-400 focus:border-red-500 focus:ring-red-500/15 dark:border-red-500/60',
              className,
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                  ? `${inputId}-help`
                  : undefined
            }
            {...props}
          />
          <RightIcon
            isPassword={isPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            validationState={validationState}
            rightIcon={rightIcon}
          />
        </div>
        {strength !== undefined && isPassword && (
          <PasswordStrength level={strength} />
        )}
        {error ? (
          <p
            id={`${inputId}-error`}
            className="mt-1.5 text-sm text-red-600 dark:text-red-400"
          >
            {error}
          </p>
        ) : helperText ? (
          <p
            id={`${inputId}-help`}
            className="mt-1.5 text-sm text-[var(--text-tertiary)]"
          >
            {helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = 'Input';
