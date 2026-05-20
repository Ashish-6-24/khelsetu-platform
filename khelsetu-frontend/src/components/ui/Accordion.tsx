import { clsx } from 'clsx';

import { useState } from 'react';

interface AccordionProps {
  items: { id: string; title: string; content: React.ReactNode }[];
  defaultOpen?: string;
  className?: string;
}

export const Accordion = ({
  items,
  defaultOpen,
  className,
}: AccordionProps) => {
  const [openId, setOpenId] = useState<string | null>(defaultOpen ?? null);

  return (
    <div className={clsx('space-y-2', className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              {item.title}
              <svg
                className={clsx(
                  'w-5 h-5 text-gray-500 transition-transform duration-200',
                  isOpen && 'rotate-180',
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isOpen && (
              <div className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-400">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
