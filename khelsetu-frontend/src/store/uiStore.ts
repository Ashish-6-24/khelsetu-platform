import { STORAGE_KEYS } from '@shared/utils/constants';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';
type SidebarState = 'expanded' | 'collapsed' | 'hidden';

interface UIState {
  theme: Theme;
  sidebarState: SidebarState;
  isMobileMenuOpen: boolean;
  activeModal: string | null;
  notifications: UINotification[];
  isLoading: boolean;
  isAuthContextActive: boolean;
}

interface UINotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

interface UIActions {
  setTheme: (theme: Theme) => void;
  forceLightMode: () => void;
  forceDarkMode: () => void;
  allowDarkMode: () => void;
  setAuthContext: (value: boolean) => void;
  isAuthContext: () => boolean;
  toggleSidebar: () => void;
  setSidebarState: (state: SidebarState) => void;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (isOpen: boolean) => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  addNotification: (notification: Omit<UINotification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  setLoading: (isLoading: boolean) => void;
}

const applyThemeToDOM = (theme: Theme, allowDark = false) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark =
    allowDark && (theme === 'dark' || (theme === 'system' && prefersDark));
  root.classList.toggle('dark', isDark);
  root.dataset.theme = theme;
};

export const useUIStore = create<UIState & UIActions>()(
  persist(
    (set, get) => ({
      theme: 'system',
      sidebarState: 'expanded',
      isMobileMenuOpen: false,
      activeModal: null,
      notifications: [],
      isLoading: false,
      isAuthContextActive: false,

      setTheme: (theme) => {
        applyThemeToDOM(theme, get().isAuthContextActive);
        set({ theme });
      },

      setAuthContext: (value) => {
        set({ isAuthContextActive: value });
      },

      isAuthContext: () => get().isAuthContextActive,

      forceLightMode: () => {
        set({ isAuthContextActive: false });
        if (typeof document !== 'undefined') {
          document.documentElement.classList.remove('dark');
          document.documentElement.dataset.theme = 'light';
        }
      },

      forceDarkMode: () => {
        set({ isAuthContextActive: true });
        if (typeof document !== 'undefined') {
          document.documentElement.classList.add('dark');
          document.documentElement.dataset.theme = 'dark';
        }
      },

      allowDarkMode: () => {
        set({ isAuthContextActive: true });
        const { theme } = get();
        applyThemeToDOM(theme, true);
      },

      toggleSidebar: () =>
        set((state) => ({
          sidebarState:
            state.sidebarState === 'expanded' ? 'collapsed' : 'expanded',
        })),

      setSidebarState: (sidebarState) => set({ sidebarState }),

      toggleMobileMenu: () =>
        set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

      setMobileMenuOpen: (isMobileMenuOpen) => set({ isMobileMenuOpen }),

      openModal: (modalId) => set({ activeModal: modalId }),

      closeModal: () => set({ activeModal: null }),

      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            ...state.notifications,
            {
              ...notification,
              id:
                typeof crypto !== 'undefined' && 'randomUUID' in crypto
                  ? crypto.randomUUID()
                  : `${Date.now()}-${Math.random()}`,
            },
          ],
        })),

      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),

      clearNotifications: () => set({ notifications: [] }),

      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: STORAGE_KEYS.UI_STATE,
      partialize: (state) => ({
        theme: state.theme,
        sidebarState: state.sidebarState,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.theme)
          applyThemeToDOM(state.theme, state.isAuthContextActive);
      },
    },
  ),
);

export { applyThemeToDOM };
