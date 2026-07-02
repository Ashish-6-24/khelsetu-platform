import { clsx } from 'clsx';

import type { FormationType } from '../types/index';
import { FORMATION_TEMPLATES } from '../utils/formations';

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
              ? 'border-amber-400 bg-gradient-to-r from-[var(--brand-primary-bg)] to-[var(--brand-primary-bg-hover)] text-white shadow-md'
              : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface-2)] dark:text-[var(--text-secondary)] dark:hover:border-gray-600',
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
            ? 'border-amber-400 bg-gradient-to-r from-[var(--brand-accent)] to-[var(--brand-accent-hover)] text-black shadow-md'
            : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface-2)] dark:text-[var(--text-secondary)] dark:hover:border-gray-600',
        )}
      >
        Custom
      </button>
    </div>
  );
};
