import { clsx } from 'clsx';
import { ChevronDown } from 'lucide-react';

import { forwardRef } from 'react';

interface SelectProps extends Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  'onChange'
> {
  label?: string;
  options: { value: string; label: string }[];
  error?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  helperText?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options,
      error,
      onChange,
      className,
      id,
      placeholder,
      helperText,
      ...props
    },
    ref,
  ) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            onChange={(e) => onChange?.(e.target.value)}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error
                ? `${selectId}-error`
                : helperText
                  ? `${selectId}-help`
                  : undefined
            }
            className={clsx(
              'block h-11 w-full appearance-none rounded-xl border bg-[var(--bg-surface)] pl-3.5 pr-10 text-sm text-[var(--text-primary)]',
              'border-[var(--border-subtle)] transition-all duration-200',
              'hover:border-[var(--border-strong)]',
              'focus:border-[var(--brand-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--brand-primary)]/15',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error &&
                'border-[var(--color-danger)] focus:border-[var(--color-danger)] focus:ring-[var(--color-danger)]/15',
              className,
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-tertiary)]"
            aria-hidden="true"
          />
        </div>
        {error ? (
          <p
            id={`${selectId}-error`}
            className="mt-1.5 text-sm text-[var(--color-danger)]"
          >
            {error}
          </p>
        ) : helperText ? (
          <p
            id={`${selectId}-help`}
            className="mt-1.5 text-sm text-[var(--text-tertiary)]"
          >
            {helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

Select.displayName = 'Select';
