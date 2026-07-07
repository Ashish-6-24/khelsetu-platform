import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { type Plugin, defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// ponytail: meta CSP can't use env vars, so we replace a placeholder at build time
function cspPlugin(): Plugin {
  return {
    name: 'csp-replace',
    transformIndexHtml(html) {
      const apiUrl = process.env.VITE_API_URL || 'http://localhost:8080';
      const wsUrl = process.env.VITE_WS_URL || 'ws://localhost:8080';
      return html.replace('__CSP_CONNECT_SRC__', `${wsUrl} ${apiUrl}`);
    },
  };
}

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

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    plugins: [
      cspPlugin(),
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'icons/*.svg', 'icons/*.png'],
        manifest: false,
        workbox: {
          globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
              },
            },
            {
              urlPattern: /\/api\/.*/i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'api-cache',
                networkTimeoutSeconds: 5,
                expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 },
              },
            },
          ],
        },
      }),
    ],
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
              if (/\/react\//.test(id) || /\/react@/.test(id))
                return 'vendor-react';
              if (id.includes('@tanstack/react-query')) return 'vendor-query';
              if (id.includes('framer-motion') || id.includes('motion'))
                return 'vendor-motion';
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
      chunkSizeWarningLimit: 800,
      minify: 'esbuild',
      ...(isProduction ? { esbuild: { drop: ['console'] } } : {}),
      target: ['es2022', 'chrome85', 'firefox79', 'safari15.4'],
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
