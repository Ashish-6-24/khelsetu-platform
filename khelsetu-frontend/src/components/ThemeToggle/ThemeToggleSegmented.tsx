import { useUIStore } from '@store/uiStore';
import { Monitor, Moon, Sun } from 'lucide-react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeToggleSegmentedProps {
  className?: string;
}

const THEMES: { value: Theme; icon: React.ComponentType<{ className?: string }>; label: string }[] = [
  { value: 'light', icon: Sun, label: 'Light' },
  { value: 'dark', icon: Moon, label: 'Dark' },
  { value: 'system', icon: Monitor, label: 'System' },
];

export const ThemeToggleSegmented = ({ className }: ThemeToggleSegmentedProps) => {
  const theme = useUIStore((s) => s.theme);
  const setTheme = useUIStore((s) => s.setTheme);
  const currentTheme: Theme = theme ?? 'system';

  return (
    <div
      className={`inline-flex rounded-xl border border-slate-200 bg-white p-0.5 shadow-sm dark:border-slate-700 dark:bg-slate-800 ${className ?? ''}`}
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
              ? 'bg-brand-maroon text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700/50'
          }`}
        >
          <Icon className="h-4 w-4" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
};
