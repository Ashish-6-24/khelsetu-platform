import { logger } from '@lib/logger';
import { wsService } from '@lib/websocket-client';
import { useAuthStore } from '@state/authStore';

import { useEffect, useMemo } from 'react';

import { AuthContext } from './AuthContext';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);
  const accessToken = useAuthStore((s) => s.tokens?.accessToken);

  useEffect(() => {
    if (isAuthenticated) {
      wsService.connect(accessToken).catch((error) => {
        logger.error('WebSocket connection failed:', error);
      });
    }

    return () => {
      if (isAuthenticated) {
        wsService.disconnect();
      }
    };
  }, [isAuthenticated, accessToken]);

  const contextValue = useMemo(
    () => ({ isAuthenticated, isLoading }),
    [isAuthenticated, isLoading],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
// triggered
// test
