import { ErrorBoundary, GlobalErrorHandler } from '@components/error';

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
          <AuthProvider>{children}</AuthProvider>
        </RouterProvider>
      </QueryProvider>
    </ErrorBoundary>
  );
};
