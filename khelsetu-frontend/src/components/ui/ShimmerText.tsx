import { clsx } from 'clsx';
import { type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ShimmerTextProps {
  children: ReactNode;
  className?: string;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p';
}

export const ShimmerText = ({
  children,
  className,
  as: Tag = 'span',
}: ShimmerTextProps) => {
  return (
    <Tag
      className={twMerge(
        clsx(
          'relative inline-block bg-clip-text text-transparent',
          'bg-[length:200%_100%] bg-left',
          'gradient-shimmer-text',
          className,
        ),
      )}
    >
      {children}
    </Tag>
  );
};
