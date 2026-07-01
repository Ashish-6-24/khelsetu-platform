import { useMemo } from 'react';
import { tokens } from './tokens';
import { useUIStore } from '@store/uiStore';

export function useTheme() {
  const theme = useUIStore((s) => s.theme);

  const isDark = useMemo(() => {
    if (typeof document === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  }, []);

  return {
    /** Current theme setting: 'light' | 'dark' | 'system' */
    theme,
    /** Whether dark mode is actively applied */
    isDark,
    /** Color tokens (reference CSS variables) */
    colors: tokens.color,
    /** Spacing scale in px */
    spacing: tokens.spacing,
    /** Typography scale in px */
    typography: tokens.typography,
    /** Border radius scale in px */
    radius: tokens.radius,
    /** Shadow tokens (reference CSS variables) */
    shadow: tokens.shadow,
  } as const;
}

export type ThemeContext = ReturnType<typeof useTheme>;
