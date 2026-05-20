import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export const Card = ({
  children,
  className,
  hover = false,
  glass = false,
}: CardProps) => {
  return (
    <div
      className={twMerge(
        clsx(
          'rounded-2xl',
          glass
            ? 'bg-white/10 backdrop-blur-xl border border-white/20'
            : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
          hover &&
            'transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
          className,
        ),
      )}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader = ({ children, className }: CardHeaderProps) => {
  return (
    <div
      className={clsx(
        'px-6 py-4 border-b border-gray-200 dark:border-gray-700',
        className,
      )}
    >
      {children}
    </div>
  );
};

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const CardBody = ({ children, className }: CardBodyProps) => {
  return <div className={clsx('px-6 py-4', className)}>{children}</div>;
};

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter = ({ children, className }: CardFooterProps) => {
  return (
    <div
      className={clsx(
        'px-6 py-4 border-t border-gray-200 dark:border-gray-700',
        className,
      )}
    >
      {children}
    </div>
  );
};
