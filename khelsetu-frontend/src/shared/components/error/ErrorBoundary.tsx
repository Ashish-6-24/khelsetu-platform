import { ROUTES } from '@shared/utils/constants';
import { AlertTriangle, ArrowLeft, Home, RefreshCw } from 'lucide-react';

import { Component, type ErrorInfo, type ReactNode } from 'react';

import { Link } from 'react-router-dom';

const isProd = import.meta.env.PROD;

const sanitizeErrorMessage = (error: Error): string => {
  if (isProd) {
    return 'An unexpected error occurred. Please try refreshing the page.';
  }
  return error.message;
};

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ error, errorInfo });
    this.props.onError?.(error, errorInfo);
    if (!isProd) {
      console.error('ErrorBoundary caught:', error, errorInfo);
    }
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-surface-sunken)] dark:bg-[var(--bg-canvas)] p-4">
          <div className="text-center max-w-md">
            <div className="mx-auto w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-6">
              <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)] dark:text-white mb-2">
              Something went wrong
            </h1>
            <p className="text-[var(--text-secondary)] dark:text-[var(--text-tertiary)] mb-6">
              An unexpected error occurred. Please try refreshing the page.
            </p>
            {this.state.error && (
              <details className="mb-6 text-left bg-[var(--bg-surface-sunken)] dark:bg-[var(--bg-surface)] rounded-lg p-4">
                <summary className="cursor-pointer text-sm font-medium text-[var(--text-secondary)] dark:text-[var(--text-secondary)]">
                  Error details
                </summary>
                <pre className="mt-2 text-xs text-red-600 dark:text-red-400 overflow-auto">
                  {sanitizeErrorMessage(this.state.error)}
                </pre>
              </details>
            )}
            <div className="flex gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-[var(--border-subtle)] dark:border-[var(--border-subtle)] text-[var(--text-secondary)] dark:text-[var(--text-secondary)] hover:bg-[var(--bg-surface-sunken)] dark:hover:bg-[var(--bg-surface-raised)]"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
              <Link
                to={ROUTES.HOME}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-[var(--brand-primary)] text-[var(--brand-primary-ink)] hover:bg-[var(--brand-primary-hover)]"
              >
                <Home className="w-4 h-4" />
                Go Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export const ServerErrorPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-[var(--bg-surface-sunken)] dark:bg-[var(--bg-canvas)] p-4">
    <div className="text-center max-w-md">
      <div className="mx-auto w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-6">
        <span className="text-3xl font-bold text-red-600 dark:text-red-400">
          500
        </span>
      </div>
      <h1 className="text-2xl font-bold text-[var(--text-primary)] dark:text-white mb-2">
        Server Error
      </h1>
      <p className="text-[var(--text-secondary)] dark:text-[var(--text-tertiary)] mb-6">
        The server encountered an error. Please try again later.
      </p>
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-[var(--border-subtle)] dark:border-[var(--border-subtle)] text-[var(--text-secondary)] dark:text-[var(--text-secondary)] hover:bg-[var(--bg-surface-sunken)] dark:hover:bg-[var(--bg-surface-raised)]"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
        <Link
          to={ROUTES.HOME}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-[var(--brand-primary)] text-[var(--brand-primary-ink)] hover:bg-[var(--brand-primary-hover)]"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Home
        </Link>
      </div>
    </div>
  </div>
);

export const OfflinePage = () => (
  <div className="min-h-screen flex items-center justify-center bg-[var(--bg-surface-sunken)] dark:bg-[var(--bg-canvas)] p-4">
    <div className="text-center max-w-md">
      <div className="mx-auto w-16 h-16 rounded-full bg-[var(--bg-surface-sunken)] dark:bg-[var(--bg-surface)] flex items-center justify-center mb-6">
        <svg
          className="w-8 h-8 text-[var(--text-tertiary)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
          />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-[var(--text-primary)] dark:text-white mb-2">
        You're Offline
      </h1>
      <p className="text-[var(--text-secondary)] dark:text-[var(--text-tertiary)] mb-6">
        Check your internet connection and try again. Some features may still
        work offline.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-[var(--brand-primary)] text-[var(--brand-primary-ink)] hover:bg-[var(--brand-primary-hover)]"
      >
        <RefreshCw className="w-4 h-4" />
        Retry Connection
      </button>
    </div>
  </div>
);

export const CrashRecoveryPage = ({
  onRecovery,
}: {
  onRecovery?: () => void;
}) => (
  <div className="min-h-screen flex items-center justify-center bg-[var(--bg-surface-sunken)] dark:bg-[var(--bg-canvas)] p-4">
    <div className="text-center max-w-md">
      <div className="mx-auto w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
      </div>
      <h1 className="text-2xl font-bold text-[var(--text-primary)] dark:text-white mb-2">
        Application Recovered
      </h1>
      <p className="text-[var(--text-secondary)] dark:text-[var(--text-tertiary)] mb-6">
        The application encountered a critical error and has been reset. Your
        data should be safe.
      </p>
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => {
            const keysToPreserve = ['auth_token', 'auth-storage', 'ui-storage'];
            const preserved: Record<string, string> = {};
            keysToPreserve.forEach((k) => {
              const v = localStorage.getItem(k);
              if (v !== null) preserved[k] = v;
            });
            localStorage.clear();
            Object.entries(preserved).forEach(([k, v]) =>
              localStorage.setItem(k, v),
            );
            window.location.reload();
          }}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-red-300 dark:border-red-600 text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          Clear Cache & Reload
        </button>
        <button
          onClick={onRecovery}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-[var(--brand-primary)] text-[var(--brand-primary-ink)] hover:bg-[var(--brand-primary-hover)]"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
);
