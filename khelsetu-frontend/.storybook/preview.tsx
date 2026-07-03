import type { Preview } from '@storybook/react-vite';
import { HttpResponse, http } from 'msw';
import { initialize, mswLoader } from 'msw-storybook-addon';

initialize(
  {
    onUnhandledRequest: 'bypass',
  },
  [
    http.get('/api/auth/me', () => {
      return HttpResponse.json({ id: '1', name: 'Story User', role: 'admin' });
    }),
  ],
);

const preview: Preview = {
  loaders: [mswLoader],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'error',
    },
    test: {
      chromatic: { disable: true },
    },
    chromatic: {
      pauseAnimationAtEnd: true,
      delay: 300,
    },
  },
};

export default preview;
