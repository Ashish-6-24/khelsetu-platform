import { useUIStore } from '@store/uiStore';
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

if (typeof window !== 'undefined' && !window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

describe('UI Store', () => {
  beforeEach(() => {
    useUIStore.setState({
      theme: 'system',
      sidebarState: 'expanded',
      isMobileMenuOpen: false,
      activeModal: null,
      notifications: [],
      isLoading: false,
    });
  });

  it('should have initial state', () => {
    const { result } = renderHook(() => useUIStore());
    expect(result.current.theme).toBe('system');
    expect(result.current.sidebarState).toBe('expanded');
    expect(result.current.activeModal).toBeNull();
  });

  it('should set theme', () => {
    const { result } = renderHook(() => useUIStore());
    act(() => {
      result.current.setTheme('dark');
    });
    expect(result.current.theme).toBe('dark');
  });

  it('should toggle sidebar', () => {
    const { result } = renderHook(() => useUIStore());
    act(() => {
      result.current.toggleSidebar();
    });
    expect(result.current.sidebarState).toBe('collapsed');
  });

  it('should open modal', () => {
    const { result } = renderHook(() => useUIStore());
    act(() => {
      result.current.openModal('settings');
    });
    expect(result.current.activeModal).toBe('settings');
  });

  it('should close modal', () => {
    const { result } = renderHook(() => useUIStore());
    act(() => {
      result.current.openModal('settings');
      result.current.closeModal();
    });
    expect(result.current.activeModal).toBeNull();
  });

  it('should add notification', () => {
    const { result } = renderHook(() => useUIStore());
    act(() => {
      result.current.addNotification({
        message: 'Test notification',
        type: 'info',
      });
    });
    expect(result.current.notifications).toHaveLength(1);
    expect(result.current.notifications[0]?.message).toBe('Test notification');
  });

  it('should remove notification', () => {
    const { result } = renderHook(() => useUIStore());
    act(() => {
      result.current.addNotification({
        message: 'Test notification',
        type: 'info',
      });
    });
    const notificationId = result.current.notifications[0]?.id;
    if (notificationId) {
      act(() => {
        result.current.removeNotification(notificationId);
      });
    }
    expect(result.current.notifications).toHaveLength(0);
  });
});
