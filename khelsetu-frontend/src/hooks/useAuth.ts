import { logger } from '@lib/logger';
import { authService } from '@services/api/auth';
import { useAuthStore } from '@store/authStore';
import type { LoginCredentials, RegisterCredentials } from '@types-domain/auth';

import { useCallback } from 'react';

export const useAuth = () => {
  const {
    user,
    tokens,
    isAuthenticated,
    isLoading,
    login,
    logout,
    setLoading,
  } = useAuthStore();

  const handleLogin = useCallback(
    async (credentials: LoginCredentials) => {
      setLoading(true);
      try {
        const response = await authService.login(credentials);
        login(response.user, response.tokens);
        return { success: true };
      } catch (error) {
        logger.error('Login failed:', error);
        return { success: false, error };
      } finally {
        setLoading(false);
      }
    },
    [login, setLoading],
  );

  const handleRegister = useCallback(
    async (credentials: RegisterCredentials) => {
      setLoading(true);
      try {
        const response = await authService.register(credentials);
        login(response.user, response.tokens);
        return { success: true };
      } catch (error) {
        logger.error('Registration failed:', error);
        return { success: false, error };
      } finally {
        setLoading(false);
      }
    },
    [login, setLoading],
  );

  const handleLogout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (error) {
      logger.error('Logout error:', error);
    } finally {
      logout();
    }
  }, [logout]);

  return {
    user,
    tokens,
    isAuthenticated,
    isLoading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };
};
