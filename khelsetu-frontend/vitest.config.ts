import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config';

const src = path.resolve(__dirname, './src');

const aliases = {
  '@': src,
  '@app': path.resolve(src, './app'),
  '@pages': path.resolve(src, './pages'),
  '@shared': path.resolve(src, './shared'),
  '@features': path.resolve(src, './features'),
  '@store': path.resolve(src, './store'),
  '@lib': path.resolve(src, './lib'),
  '@styles': path.resolve(src, './styles'),
  '@assets': path.resolve(src, './assets'),
  '@tests': path.resolve(src, './tests'),
  '@workers': path.resolve(src, './workers'),
};

export default defineConfig({
  plugins: [react()],
  resolve: { alias: aliases },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    exclude: [
      'e2e/**',
      'node_modules/**',
      'public/**',
      'dist/**',
      '**/*.stories.*',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mocks/**',
        '**/*.stories.*',
        'e2e/**',
        'public/**',
      ],
      thresholds: {
        statements: 62,
        branches: 56,
        functions: 50,
        lines: 64,
      },
    },
  },
});
