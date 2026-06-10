import { createContext, useContext } from 'react';

import type { ToastType } from './ToastType';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  title?: string;
  duration?: number;
  /**
   * Inline action — e.g. "Undo", "View". Shown as a brand-colored button
   * in the toast body. Pairs nicely with non-blocking notifications.
   */
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    return {
      toasts: [],
      addToast: () => {},
      removeToast: () => {},
    };
  }
  return ctx;
};
