import { OfflineBanner } from '@shared/ui/OfflineBanner';
import { ToastProvider } from '@shared/ui/Toast';
import { CommandPaletteProvider } from '@shared/ui/command/CommandPalette';
import { ErrorBoundary, GlobalErrorHandler } from '@shared/ui/error';

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
          <RouterProvider>
            <CommandPaletteProvider>
              <AuthProvider>
                {children}
                <OfflineBanner />
              </AuthProvider>
            </CommandPaletteProvider>
          </RouterProvider>
        </ToastProvider>
      </QueryProvider>
    </ErrorBoundary>
  );
};
