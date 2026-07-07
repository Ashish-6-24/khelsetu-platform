import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState = ({
  title = 'Something went wrong',
  message = 'Failed to load data. Please try again.',
  onRetry,
}: ErrorStateProps) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-danger)]/10 text-[var(--color-danger)]">
      <AlertTriangle className="h-7 w-7" />
    </div>
    <p className="mt-5 text-sm font-semibold text-[var(--text-primary)]">
      {title}
    </p>
    <p className="mt-1.5 text-xs text-[var(--text-secondary)]">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[var(--brand-primary)] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[var(--brand-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2"
      >
        <RefreshCw className="h-3 w-3" />
        Retry
      </button>
    )}
  </div>
);
