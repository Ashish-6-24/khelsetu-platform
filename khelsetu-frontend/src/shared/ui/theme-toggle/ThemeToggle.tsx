import { useUIStore } from '@state/uiStore';
import { AnimatePresence, motion } from 'framer-motion';
import { Monitor, Moon, Sun } from 'lucide-react';

import { useCallback } from 'react';

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

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const next = THEMES[(activeIndex + 1) % THEMES.length];
        if (next) setTheme(next.value);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = THEMES[(activeIndex - 1 + THEMES.length) % THEMES.length];
        if (prev) setTheme(prev.value);
      }
    },
    [activeIndex, setTheme],
  );

  return (
    <div
      className={`relative flex rounded-full p-0.5 ${className ?? ''}`}
      style={{ backgroundColor: 'var(--bg-surface-sunken)' }}
      role="radiogroup"
      aria-label="Theme selection"
      onKeyDown={handleKeyDown}
    >
      <motion.div
        className="absolute inset-y-0.5 w-[32px] rounded-full shadow-sm"
        style={{ backgroundColor: 'var(--bg-surface)' }}
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
                  className="text-[var(--text-primary)]"
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
                  className="text-[var(--text-primary)]"
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
                  className="text-[var(--text-primary)]"
                >
                  <Monitor className="h-3.5 w-3.5" />
                </motion.span>
              )
            ) : (
              <Icon className="h-3.5 w-3.5 text-[var(--text-tertiary)] transition-colors duration-200 hover:text-[var(--text-primary)]" />
            )}
          </AnimatePresence>
        </button>
      ))}
    </div>
  );
};
