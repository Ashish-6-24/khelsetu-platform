import { clsx } from 'clsx';

interface TabsProps {
  tabs: { id: string; label: string; icon?: React.ReactNode; count?: number }[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
  variant?: 'default' | 'pills' | 'underline';
  fullWidth?: boolean;
}

export const Tabs = ({
  tabs,
  activeTab,
  onChange,
  className,
  variant = 'default',
  fullWidth = false,
}: TabsProps) => {
  return (
    <div
      role="tablist"
      className={clsx(
        'inline-flex',
        variant === 'pills' &&
          'rounded-xl bg-slate-100/80 p-1 dark:bg-slate-800/60',
        variant === 'underline' && 'border-b border-[var(--border-subtle)]',
        className,
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={clsx(
              'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all duration-200',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
              fullWidth && 'flex-1',
              variant === 'pills' && 'h-9 px-3.5',
              variant === 'default' && 'h-9 px-3.5',
              variant === 'underline' &&
                'h-10 px-3 border-b-2 -mb-px rounded-none',
              variant === 'pills' && isActive
                ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white'
                : variant === 'pills'
                  ? 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  : variant === 'underline'
                    ? isActive
                      ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                      : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                    : isActive
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300'
                      : 'text-slate-600 hover:bg-slate-100/60 dark:text-slate-300 dark:hover:bg-slate-800/50',
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={clsx(
                  'ml-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold tabular-nums',
                  isActive
                    ? 'bg-blue-600/10 text-blue-700 dark:bg-blue-400/20 dark:text-blue-300'
                    : 'bg-slate-200/70 text-slate-600 dark:bg-slate-700/60 dark:text-slate-300',
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
