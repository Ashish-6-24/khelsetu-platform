import { CommandPaletteProvider } from '@shared/components/command/CommandPalette';
import { ErrorBoundary, GlobalErrorHandler } from '@shared/components/error';
import { OfflineBanner } from '@shared/components/ui/OfflineBanner';
import { ToastProvider } from '@shared/components/ui/Toast';

import { AuthProvider } from './AuthProvider';
import { QueryProvider } from './QueryProvider';
import { RouterProvider } from './RouterProvider';

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <ErrorBoundary>
      <GlobalErrorHandler />
      <QueryProvider>
        <ToastProvider>
          <CommandPaletteProvider>
            <RouterProvider>
              <AuthProvider>
                {children}
                <OfflineBanner />
              </AuthProvider>
            </RouterProvider>
          </CommandPaletteProvider>
        </ToastProvider>
      </QueryProvider>
    </ErrorBoundary>
  );
};
