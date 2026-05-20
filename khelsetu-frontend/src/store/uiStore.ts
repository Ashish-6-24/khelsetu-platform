import { create } from 'zustand';

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

export const useUIStore = create<UIState & UIActions>((set) => ({
  theme: 'system',
  sidebarState: 'expanded',
  isMobileMenuOpen: false,
  activeModal: null,
  notifications: [],
  isLoading: false,

  setTheme: (theme) => set({ theme }),

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
        { ...notification, id: crypto.randomUUID() },
      ],
    })),

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  clearNotifications: () => set({ notifications: [] }),

  setLoading: (isLoading) => set({ isLoading }),
}));
