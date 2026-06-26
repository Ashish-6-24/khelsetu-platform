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
          // Manual chunk splitting strategy:
          // - vendor-react: Core React + Router (~300KB)
          // - vendor-query: TanStack React Query (~80KB)
          // - vendor-motion: Framer Motion (~120KB)
          // - vendor-forms: react-hook-form + Zod (~60KB)
          // - vendor-charts: Recharts (~200KB, only on analytics page)
          // - vendor-pdf: html2canvas + jspdf (~150KB, only on certificates)
          // - vendor-icons: Lucide React (~100KB)
          // - vendor-utils: clsx + tailwind-merge + zustand (~30KB)
          // - features-scoring: Live scoring module (code-split)
          // - features-billing: Billing module (code-split)
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
              if (id.includes('html2canvas') || id.includes('jspdf')) {
                return 'vendor-pdf';
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
