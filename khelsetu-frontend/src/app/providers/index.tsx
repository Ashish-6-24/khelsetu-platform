import { ErrorBoundary, GlobalErrorHandler } from '@components/error';
import { OfflineBanner } from '@components/ui/OfflineBanner';

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
        <RouterProvider>
          <AuthProvider>
            {children}
            <OfflineBanner />
          </AuthProvider>
        </RouterProvider>
      </QueryProvider>
    </ErrorBoundary>
  );
};
