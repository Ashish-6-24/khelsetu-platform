import { AlertTriangle, RefreshCw } from 'lucide-react';

import { Component, type ErrorInfo, type ReactNode } from 'react';

interface FeatureBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  featureName?: string;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface FeatureBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class FeatureBoundary extends Component<
  FeatureBoundaryProps,
  FeatureBoundaryState
> {
  constructor(props: FeatureBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): FeatureBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.props.onError?.(error, errorInfo);
    if (!import.meta.env.PROD) {
      console.error(
        `FeatureBoundary [${this.props.featureName ?? 'unknown'}] caught:`,
        error,
        errorInfo,
      );
    }
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="rounded-xl border border-red-200 bg-red-50/50 p-4 dark:border-red-800/30 dark:bg-red-950/20">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
              <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-red-800 dark:text-red-300">
                {this.props.featureName
                  ? `${this.props.featureName} encountered an error`
                  : 'This section encountered an error'}
              </p>
              <p className="mt-1 text-xs text-red-600/80 dark:text-red-400/70">
                The rest of the page is unaffected.
              </p>
              <button
                onClick={this.handleReset}
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-red-700 hover:text-red-900 dark:text-red-300 dark:hover:text-red-100"
              >
                <RefreshCw className="h-3 w-3" />
                Try again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
