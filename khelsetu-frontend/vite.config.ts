import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@app': path.resolve(__dirname, './src/app'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@components': path.resolve(__dirname, './src/components'),
        '@features': path.resolve(__dirname, './src/features'),
        '@services': path.resolve(__dirname, './src/services'),
        '@store': path.resolve(__dirname, './src/store'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@lib': path.resolve(__dirname, './src/lib'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@types-domain': path.resolve(__dirname, './src/types-domain'),
        '@styles': path.resolve(__dirname, './src/styles'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@tests': path.resolve(__dirname, './src/tests'),
        '@workers': path.resolve(__dirname, './src/workers'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (
                id.includes('react') ||
                id.includes('react-dom') ||
                id.includes('react-router')
              ) {
                return 'vendor-react';
              }
              if (id.includes('@tanstack/react-query')) {
                return 'vendor-query';
              }
              if (id.includes('framer-motion')) {
                return 'vendor-motion';
              }
              if (
                id.includes('react-hook-form') ||
                id.includes('@hookform/resolvers') ||
                id.includes('zod')
              ) {
                return 'vendor-forms';
              }
              if (id.includes('recharts')) {
                return 'vendor-charts';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              if (
                id.includes('clsx') ||
                id.includes('tailwind-merge') ||
                id.includes('zustand')
              ) {
                return 'vendor-utils';
              }
            }
            if (id.includes('/features/scoring/')) {
              return 'features-scoring';
            }
            if (id.includes('/features/billing/')) {
              return 'features-billing';
            }
          },
        },
      },
      chunkSizeWarningLimit: 600,
      minify: 'esbuild',
      target: 'esnext',
      cssCodeSplit: true,
      sourcemap: !isProduction,
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@tanstack/react-query',
        'framer-motion',
      ],
    },
    server: {
      port: 3000,
      strictPort: true,
      host: true,
    },
  };
});
