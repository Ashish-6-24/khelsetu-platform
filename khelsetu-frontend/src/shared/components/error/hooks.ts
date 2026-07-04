import { logger } from '@lib/logger';
import { useCallback, useState } from 'react';

import { useOffline } from '@shared/hooks/useOffline';

export const useNetworkStatus = useOffline;

export const useErrorHandler = () => {
  const [error, setError] = useState<Error | null>(null);

  const handleError = useCallback((error: Error | unknown) => {
    const err = error instanceof Error ? error : new Error(String(error));
    setError(err);
    logger.error('Error handled:', err);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { error, handleError, clearError };
};
