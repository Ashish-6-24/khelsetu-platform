import { useUIStore } from '@store/uiStore';
import { Monitor, Moon, Sun } from 'lucide-react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeToggleSegmentedProps {
  className?: string;
}

const THEMES: {
  value: Theme;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}[] = [
  { value: 'light', icon: Sun, label: 'Light' },
  { value: 'dark', icon: Moon, label: 'Dark' },
  { value: 'system', icon: Monitor, label: 'System' },
];

export const ThemeToggleSegmented = ({
  className,
}: ThemeToggleSegmentedProps) => {
  const theme = useUIStore((s) => s.theme);
  const setTheme = useUIStore((s) => s.setTheme);
  const currentTheme: Theme = theme ?? 'system';

  return (
    <div
      className={`inline-flex rounded-xl p-0.5 shadow-sm ${className ?? ''}`}
      style={{ border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-surface)' }}
      role="radiogroup"
      aria-label="Theme selection"
    >
      {THEMES.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          role="radio"
          aria-checked={currentTheme === value}
          aria-label={label}
          onClick={() => setTheme(value)}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
            currentTheme === value
              ? 'shadow-sm'
              : 'hover:opacity-80'
          }`}
          style={
            currentTheme === value
              ? { backgroundColor: 'var(--brand-primary)', color: 'var(--text-on-brand)' }
              : { color: 'var(--text-secondary)' }
          }
        >
          <Icon className="h-4 w-4" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
};
