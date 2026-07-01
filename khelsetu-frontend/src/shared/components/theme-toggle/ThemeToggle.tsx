import { useUIStore } from '@store/uiStore';
import { AnimatePresence, motion } from 'framer-motion';
import { Monitor, Moon, Sun } from 'lucide-react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeToggleProps {
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

export const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const theme = useUIStore((s) => s.theme);
  const setTheme = useUIStore((s) => s.setTheme);
  const currentTheme: Theme = theme ?? 'system';
  const activeIndex = THEMES.findIndex((t) => t.value === currentTheme);

  return (
    <div
      className={`relative flex rounded-full bg-stone-100 p-0.5 dark:bg-slate-800 ${className ?? ''}`}
      role="radiogroup"
      aria-label="Theme selection"
    >
      <motion.div
        className="absolute inset-y-0.5 w-[32px] rounded-full bg-white shadow-sm dark:bg-slate-700"
        animate={{ x: activeIndex * 34 }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
      />
      {THEMES.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          role="radio"
          aria-checked={currentTheme === value}
          aria-label={label}
          onClick={() => setTheme(value)}
          className="relative z-10 flex h-7 w-8 items-center justify-center rounded-full transition-colors duration-200"
        >
          <AnimatePresence mode="wait">
            {currentTheme === value ? (
              value === 'light' ? (
                <motion.span
                  key="sun"
                  initial={{ rotate: -90, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  exit={{ rotate: 90, scale: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-slate-900 dark:text-white"
                >
                  <Sun className="h-3.5 w-3.5" />
                </motion.span>
              ) : value === 'dark' ? (
                <motion.span
                  key="moon"
                  initial={{ rotate: 90, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  exit={{ rotate: -90, scale: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-slate-900 dark:text-white"
                >
                  <Moon className="h-3.5 w-3.5" />
                </motion.span>
              ) : (
                <motion.span
                  key="system"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-slate-900 dark:text-white"
                >
                  <Monitor className="h-3.5 w-3.5" />
                </motion.span>
              )
            ) : (
              <Icon className="h-3.5 w-3.5 text-slate-400 transition-colors duration-200 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300" />
            )}
          </AnimatePresence>
        </button>
      ))}
    </div>
  );
};
