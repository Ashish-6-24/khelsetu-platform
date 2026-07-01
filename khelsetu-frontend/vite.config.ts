import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

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

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    plugins: [react(), tailwindcss()],
    resolve: { alias: aliases },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              // React core + router + UI libs that depend on React internals
              if (
                /\breact-dom\b/.test(id) ||
                /\breact-router\b/.test(id) ||
                /\breact-router-dom\b/.test(id) ||
                /\bcmdk\b/.test(id) ||
                /\b@radix-ui\b/.test(id) ||
                /\breact-remove-scroll\b/.test(id) ||
                /\breact-is\b/.test(id)
              ) {
                return 'vendor-react';
              }
              if (/\/react\//.test(id) || /\/react@/.test(id)) return 'vendor-react';
              if (id.includes('@tanstack/react-query')) return 'vendor-query';
              if (id.includes('framer-motion')) return 'vendor-motion';
              if (
                id.includes('react-hook-form') ||
                id.includes('@hookform/resolvers') ||
                id.includes('zod')
              ) {
                return 'vendor-forms';
              }
              if (id.includes('recharts')) return 'vendor-charts';
              if (id.includes('html2canvas') || id.includes('jspdf'))
                return 'vendor-pdf';
              if (id.includes('lucide-react')) return 'vendor-icons';
              if (
                id.includes('clsx') ||
                id.includes('tailwind-merge') ||
                id.includes('zustand')
              ) {
                return 'vendor-utils';
              }
            }
            if (id.includes('/features/scoring/')) return 'features-scoring';
            if (id.includes('/features/billing/')) return 'features-billing';
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
    preview: {
      port: 3000,
      strictPort: true,
      host: true,
    },
  };
});
