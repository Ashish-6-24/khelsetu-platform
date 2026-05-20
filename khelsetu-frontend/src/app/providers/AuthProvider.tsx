import { logger } from '@lib/logger';
import { wsService } from '@services/websocket';
import { useAuthStore } from '@store/authStore';

import { useEffect } from 'react';

import { AuthContext } from './AuthContext';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      wsService.connect().catch((error) => {
        logger.error('WebSocket connection failed:', error);
      });
    }

    return () => {
      if (isAuthenticated) {
        wsService.disconnect();
      }
    };
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
