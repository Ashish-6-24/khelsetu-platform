import { queryClient } from '@lib/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';

interface AppProviderProps {
  children: React.ReactNode;
}

export const QueryProvider = ({ children }: AppProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
