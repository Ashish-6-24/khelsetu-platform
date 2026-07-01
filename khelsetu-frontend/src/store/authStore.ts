import type { AuthState, AuthTokens, User } from '@shared/types/auth';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { useScoringStore } from './scoringStore';
import { useUIStore } from './uiStore';

interface AuthStore extends AuthState {
  setUser: (user: User | null) => void;
  setTokens: (tokens: AuthTokens | null) => void;
  login: (user: User, tokens: AuthTokens) => void;
  logout: () => void;
  setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user) => set({ user, isAuthenticated: !!user }),

      setTokens: (tokens) => set({ tokens }),

      login: (user, tokens) => {
        localStorage.setItem('auth_token', tokens.accessToken);
        useUIStore.getState().allowDarkMode();
        set({
          user,
          tokens,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: () => {
        localStorage.removeItem('auth_token');
        useScoringStore.getState().resetScoring();
        useUIStore.getState().forceLightMode();
        set({
          user: null,
          tokens: null,
          isAuthenticated: false,
        });
      },

      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
