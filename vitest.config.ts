import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vitest/config';

const src = path.resolve(__dirname, './src');

const aliases = {
  '@': src,
  '@app': path.resolve(src, './app'),
  '@shared': path.resolve(src, './shared'),
  '@features': path.resolve(src, './features'),
  '@state': path.resolve(src, './state'),
  '@lib': path.resolve(src, './shared/lib'),
  '@theme': path.resolve(src, './theme'),
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
      '.opencode/**',
      'public/**',
      'dist/**',
      '**/*.stories.*',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        '.opencode/',
        'src/tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mocks/**',
        '**/*.stories.*',
        'e2e/**',
        'public/**',
      ],
      thresholds: {
        statements: 61,
        branches: 56,
        functions: 50,
        lines: 63,
      },
    },
  },
});
