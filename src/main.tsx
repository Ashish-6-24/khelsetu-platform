import { logger } from '@lib/logger';
import {
  STORAGE_KEYS,
  THEME_VALUES,
  type ThemeValue,
} from '@shared/utils/constants';
import { createRoot } from 'react-dom/client';

import { StrictMode } from 'react';

import './index.css';
import './theme/animations.css';
import './theme/themes.css';

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

async function bootstrap() {
  // Start MSW in development to mock API responses (no backend yet)
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser');
    await worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
    });
    logger.info('[MSW] Mock API enabled for development');
  }

  // Setup auth interceptors for token refresh
  const { setupAuthInterceptors } =
    await import('./features/auth/interceptors');
  setupAuthInterceptors();

  const { default: App } = await import('./App');

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

bootstrap();
