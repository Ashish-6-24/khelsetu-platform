import { useAuthStore } from '@store/authStore';
import { act, renderHook } from '@testing-library/react';
import type { User } from '@types-domain/auth';
import { beforeEach, describe, expect, it } from 'vitest';

describe('Auth Store', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,
    });
  });

  it('should have initial state', () => {
    const { result } = renderHook(() => useAuthStore());
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('should set loading state', () => {
    const { result } = renderHook(() => useAuthStore());
    act(() => {
      result.current.setLoading(true);
    });
    expect(result.current.isLoading).toBe(true);
  });

  it('should login user', () => {
    const { result } = renderHook(() => useAuthStore());
    const mockUser: User = {
      id: '1',
      email: 'test@test.com',
      name: 'Test',
      role: 'viewer',
      createdAt: '2026-01-01',
      updatedAt: '2026-01-01',
    };
    const mockTokens = {
      accessToken: 'token',
      refreshToken: 'refresh',
      expiresIn: 3600,
    };

    act(() => {
      result.current.login(mockUser, mockTokens);
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.tokens).toEqual(mockTokens);
  });

  it('should logout user', () => {
    const { result } = renderHook(() => useAuthStore());
    const mockUser: User = {
      id: '1',
      email: 'test@test.com',
      name: 'Test',
      role: 'viewer',
      createdAt: '2026-01-01',
      updatedAt: '2026-01-01',
    };
    const mockTokens = {
      accessToken: 'token',
      refreshToken: 'refresh',
      expiresIn: 3600,
    };

    act(() => {
      result.current.login(mockUser, mockTokens);
      result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.tokens).toBeNull();
  });
});
