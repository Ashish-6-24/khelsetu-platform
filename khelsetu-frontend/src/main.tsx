import {
  STORAGE_KEYS,
  THEME_VALUES,
  type ThemeValue,
} from '@shared/utils/constants';
import { createRoot } from 'react-dom/client';

import { StrictMode } from 'react';

import App from './App';
import './index.css';
import { logger } from './lib/logger';
import './styles/animations.css';
import './styles/themes.css';

window.addEventListener('unhandledrejection', (e) => {
  logger.error('Unhandled promise rejection:', e.reason);
});

const applyTheme = (theme: ThemeValue) => {
  const root = document.documentElement;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = theme === 'dark' || (theme === 'system' && prefersDark);
  root.classList.toggle('dark', isDark);
  root.dataset.theme = theme;
  root.style.colorScheme = isDark ? 'dark' : 'light';
};

// The inline script in index.html already painted the correct theme.
// Here we just react to OS-level dark-mode changes for users on `system`.
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
mediaQuery.addEventListener('change', () => {
  const stored = localStorage.getItem(STORAGE_KEYS.THEME) as ThemeValue | null;
  if (
    !stored ||
    stored === 'system' ||
    !THEME_VALUES.includes(stored as ThemeValue)
  ) {
    applyTheme('system');
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
