import { ErrorBoundary } from '@components/error/ErrorBoundary';
import { AuthProvider } from './AuthProvider';
import { QueryProvider } from './QueryProvider';
import { RouterProvider } from './RouterProvider';

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <RouterProvider>
          <AuthProvider>{children}</AuthProvider>
        </RouterProvider>
      </QueryProvider>
    </ErrorBoundary>
  );
};
