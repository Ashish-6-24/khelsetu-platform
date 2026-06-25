import { logger } from '@lib/logger';
import { authService } from '@services/api/auth';
import { matchService, tournamentService } from '@services/api/tournament';
import { useAuthStore } from '@store/authStore';
import { useQueryClient } from '@tanstack/react-query';
import type { LoginCredentials, RegisterCredentials } from '@types-domain/auth';

import { useCallback } from 'react';

export const useAuth = () => {
  const queryClient = useQueryClient();
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

        // Prefetch dashboard data in parallel so it's cached before navigation
        await Promise.allSettled([
          queryClient.prefetchQuery({
            queryKey: ['tournaments'],
            queryFn: () => tournamentService.getAll(),
            staleTime: 2 * 60 * 1000,
          }),
          queryClient.prefetchQuery({
            queryKey: ['matches'],
            queryFn: () => matchService.getAll(),
            staleTime: 2 * 60 * 1000,
          }),
        ]);

        return { success: true };
      } catch (error) {
        logger.error('Login failed:', error);
        return { success: false, error };
      } finally {
        setLoading(false);
      }
    },
    [login, setLoading, queryClient],
  );

  const handleRegister = useCallback(
    async (credentials: RegisterCredentials) => {
      setLoading(true);
      try {
        const response = await authService.register(credentials);
        login(response.user, response.tokens);

        // Prefetch dashboard data after registration too
        await Promise.allSettled([
          queryClient.prefetchQuery({
            queryKey: ['tournaments'],
            queryFn: () => tournamentService.getAll(),
            staleTime: 2 * 60 * 1000,
          }),
          queryClient.prefetchQuery({
            queryKey: ['matches'],
            queryFn: () => matchService.getAll(),
            staleTime: 2 * 60 * 1000,
          }),
        ]);

        return { success: true };
      } catch (error) {
        logger.error('Registration failed:', error);
        return { success: false, error };
      } finally {
        setLoading(false);
      }
    },
    [login, setLoading, queryClient],
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
