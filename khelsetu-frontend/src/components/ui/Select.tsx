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
            className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            onChange={(e) => onChange?.(e.target.value)}
            className={clsx(
              'block h-11 w-full appearance-none rounded-xl border bg-white pl-3.5 pr-10 text-sm text-slate-900',
              'border-slate-200 transition-all duration-200',
              'hover:border-slate-300',
              'focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/15',
              'dark:border-slate-700 dark:bg-slate-900/50 dark:text-white',
              'dark:hover:border-slate-600 dark:focus:border-blue-400 dark:focus:ring-blue-400/20',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error &&
                'border-red-400 focus:border-red-500 focus:ring-red-500/15 dark:border-red-500/60',
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
            className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
        </div>
        {error ? (
          <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        ) : helperText ? (
          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

Select.displayName = 'Select';
