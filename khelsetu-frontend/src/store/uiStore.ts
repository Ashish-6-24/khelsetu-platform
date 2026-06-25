import { STORAGE_KEYS } from '@utils/constants';
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
  allowDarkMode: () => void;
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

let isAuthContext = false;

const setAuthContext = (value: boolean) => {
  isAuthContext = value;
};

const applyThemeToDOM = (theme: Theme) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = isAuthContext && (theme === 'dark' || (theme === 'system' && prefersDark));
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

      setTheme: (theme) => {
        applyThemeToDOM(theme);
        localStorage.setItem(STORAGE_KEYS.THEME, theme);
        set({ theme });
      },

      forceLightMode: () => {
        setAuthContext(false);
        if (typeof document !== 'undefined') {
          document.documentElement.classList.remove('dark');
          document.documentElement.dataset.theme = 'light';
        }
      },

      allowDarkMode: () => {
        setAuthContext(true);
        const { theme } = get();
        applyThemeToDOM(theme);
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
        if (state?.theme) applyThemeToDOM(state.theme);
      },
    },
  ),
);

export { setAuthContext, applyThemeToDOM };
