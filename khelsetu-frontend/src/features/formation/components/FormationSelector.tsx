import type { FormationType } from '../types/index';
import { FORMATION_TEMPLATES } from '../utils/formations';

import { clsx } from 'clsx';

interface FormationSelectorProps {
  value: FormationType;
  onChange: (type: FormationType) => void;
}

export const FormationSelector = ({
  value,
  onChange,
}: FormationSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {FORMATION_TEMPLATES.map((template) => (
        <button
          key={template.type}
          onClick={() => onChange(template.type)}
          aria-pressed={value === template.type}
          className={clsx(
            'rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200',
            'border',
            value === template.type
              ? 'border-amber-400 bg-gradient-to-r from-[#7f1d1d] to-[#991b1b] text-white shadow-md'
              : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-gray-700 hover:border-gray-300 hover:bg-[var(--bg-surface-2)] dark:text-gray-300 dark:hover:border-gray-600',
          )}
        >
          {template.name}
        </button>
      ))}
      <button
        onClick={() => onChange('custom')}
        aria-pressed={value === 'custom'}
        className={clsx(
          'rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200',
          'border',
          value === 'custom'
            ? 'border-amber-400 bg-gradient-to-r from-[#b8860b] to-[#d4a017] text-black shadow-md'
            : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-gray-700 hover:border-gray-300 hover:bg-[var(--bg-surface-2)] dark:text-gray-300 dark:hover:border-gray-600',
        )}
      >
        Custom
      </button>
    </div>
  );
};
