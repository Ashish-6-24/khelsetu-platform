import { useReducedMotion } from '@shared/hooks/useReducedMotion';
import { clsx } from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from 'lucide-react';

import { useCallback, useEffect, useRef, useState } from 'react';

import type { ToastType } from './ToastType';
import { type Toast, ToastContext } from './toast-context';

const MAX_VISIBLE = 3;

const typeStyles: Record<
  ToastType,
  { wrap: string; icon: string; ring: string; Icon: typeof Info }
> = {
  success: {
    wrap: 'bg-[var(--bg-surface)] text-[var(--text-primary)] dark:bg-[var(--bg-surface)] dark:text-[var(--text-primary)]',
    icon: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    ring: 'ring-emerald-500/20',
    Icon: CheckCircle2,
  },
  error: {
    wrap: 'bg-[var(--bg-surface)] text-[var(--text-primary)] dark:bg-[var(--bg-surface)] dark:text-[var(--text-primary)]',
    icon: 'bg-red-500/10 text-red-600 dark:text-red-400',
    ring: 'ring-red-500/20',
    Icon: XCircle,
  },
  warning: {
    wrap: 'bg-[var(--bg-surface)] text-[var(--text-primary)] dark:bg-[var(--bg-surface)] dark:text-[var(--text-primary)]',
    icon: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    ring: 'ring-amber-500/20',
    Icon: AlertTriangle,
  },
  info: {
    wrap: 'bg-[var(--bg-surface)] text-[var(--text-primary)] dark:bg-[var(--bg-surface)] dark:text-[var(--text-primary)]',
    icon: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    ring: 'ring-blue-500/20',
    Icon: Info,
  },
};

function ProgressBar({
  duration,
  onExpire,
  paused,
}: {
  duration: number;
  onExpire: () => void;
  paused: boolean;
}) {
  const [width, setWidth] = useState(100);
  useEffect(() => {
    if (duration <= 0 || paused) return;
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.max(0, 100 - (elapsed / duration) * 100);
      setWidth(pct);
      if (pct <= 0) {
        onExpire();
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration, onExpire, paused]);

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-[var(--bg-surface-sunken)]/60 dark:bg-[var(--bg-surface-raised)]/40"
      aria-hidden
    >
      <div
        className="h-full bg-gradient-to-r from-[var(--brand-primary-bg)] to-[var(--brand-accent)] transition-[width] ease-linear"
        style={{ width: `${width}%`, transitionDuration: '120ms' }}
      />
    </div>
  );
}

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: (id: string) => void;
}) {
  const cfg = typeStyles[toast.type];
  const Icon = cfg.Icon;
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useReducedMotion();
  const duration = toast.duration ?? 5000;

  return (
    <motion.div
      layout
      initial={
        reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }
      }
      animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      exit={
        reducedMotion
          ? { opacity: 0 }
          : { opacity: 0, x: 80, scale: 0.96, transition: { duration: 0.18 } }
      }
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={clsx(
        'pointer-events-auto relative flex w-full max-w-sm items-start gap-3 overflow-hidden rounded-2xl p-3.5 pr-2 ring-1 shadow-[var(--shadow-lg)]',
        cfg.wrap,
        cfg.ring,
      )}
    >
      <div
        className={clsx(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl',
          cfg.icon,
        )}
        aria-hidden
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0 pt-0.5">
        {toast.title && (
          <p className="text-sm font-semibold leading-5">{toast.title}</p>
        )}
        <p
          className={clsx(
            'text-sm leading-5 text-[var(--text-secondary)] dark:text-[var(--text-secondary)]',
            toast.title && 'mt-0.5',
          )}
        >
          {toast.message}
        </p>
        {toast.action && (
          <button
            type="button"
            onClick={() => {
              toast.action?.onClick();
              onDismiss(toast.id);
            }}
            className="mt-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {toast.action.label}
          </button>
        )}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        className="rounded-lg p-1.5 text-[var(--text-tertiary)] transition-colors hover:bg-[var(--bg-surface-sunken)] hover:text-[var(--text-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:bg-[var(--bg-surface-raised)] dark:hover:text-[var(--text-primary)]"
      >
        <X className="h-4 w-4" />
      </button>
      {duration > 0 && (
        <ProgressBar
          duration={duration}
          onExpire={() => onDismiss(toast.id)}
          paused={hovered}
        />
      )}
    </motion.div>
  );
}

function ToastContainer({
  toasts,
  removeToast,
}: {
  toasts: Toast[];
  removeToast: (id: string) => void;
}) {
  const visible = toasts.slice(-MAX_VISIBLE);
  const overflow = toasts.length - visible.length;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex flex-col items-center gap-2 px-4 sm:bottom-6 sm:right-6 sm:left-auto sm:items-end"
    >
      {overflow > 0 && (
        <div className="pointer-events-auto rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 py-1 text-xs font-semibold text-[var(--text-secondary)] shadow-sm dark:text-[var(--text-secondary)]">
          +{overflow} more notification{overflow === 1 ? '' : 's'}
        </div>
      )}
      <AnimatePresence mode="popLayout">
        {visible.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  );
}

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const timeoutsRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  useEffect(() => {
    return () => {
      for (const t of timeoutsRef.current.values()) clearTimeout(t);
      timeoutsRef.current.clear();
    };
  }, []);

  const addToast = useCallback(
    (toast: Omit<Toast, 'id'>) => {
      const id =
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random()}`;
      setToasts((prev) => [...prev, { ...toast, id }]);
      if (toast.duration !== 0) {
        const ms = toast.duration ?? 5000;
        const timeout = setTimeout(() => {
          timeoutsRef.current.delete(id);
          removeToast(id);
        }, ms);
        timeoutsRef.current.set(id, timeout);
      }
    },
    [removeToast],
  );

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};
