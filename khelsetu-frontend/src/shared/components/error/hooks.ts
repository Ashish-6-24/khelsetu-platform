import { useEffect, useState } from 'react';

interface NetworkStatus {
  isOnline: boolean;
  wasOffline: boolean;
}

export const useNetworkStatus = (): NetworkStatus => {
  const [status, setStatus] = useState<NetworkStatus>({
    isOnline: navigator.onLine,
    wasOffline: false,
  });

  useEffect(() => {
    const handleOnline = () => {
      setStatus((prev) => ({ isOnline: true, wasOffline: !prev.isOnline }));
    };
    const handleOffline = () => {
      setStatus((prev) => ({ isOnline: false, wasOffline: prev.wasOffline }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return status;
};

export const useErrorHandler = () => {
  const [error, setError] = useState<Error | null>(null);

  const handleError = (error: Error | unknown) => {
    const err = error instanceof Error ? error : new Error(String(error));
    setError(err);
    console.error('Error handled:', err);
  };

  const clearError = () => setError(null);

  return { error, handleError, clearError };
};
