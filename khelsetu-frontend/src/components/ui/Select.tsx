import { clsx } from 'clsx';

interface SelectProps extends Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  'onChange'
> {
  label?: string;
  options: { value: string; label: string }[];
  error?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export const Select = ({
  label,
  options,
  error,
  onChange,
  className,
  id,
  placeholder,
  ...props
}: SelectProps) => {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        onChange={(e) => onChange?.(e.target.value)}
        className={clsx(
          'w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm',
          'focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20',
          'dark:border-gray-600 dark:bg-gray-800 dark:text-white',
          'transition-all duration-200',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
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
      {error && (
        <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};
