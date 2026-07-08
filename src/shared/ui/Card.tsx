import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  elevated?: boolean;
  as?: 'div' | 'section' | 'article';
}

export const Card = ({
  children,
  className,
  hover = false,
  glass = false,
  elevated = false,
  as: Tag = 'div',
}: CardProps) => {
  let variantClass: string;
  if (glass) {
    variantClass = 'glass';
  } else if (elevated) {
    variantClass = 'surface shadow-[var(--shadow-md)]';
  } else {
    variantClass = 'surface';
  }

  return (
    <Tag
      className={twMerge(
        clsx(
          'rounded-2xl transition-all duration-300',
          variantClass,
          hover &&
            'cursor-pointer hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)] hover:border-[var(--border-strong)]',
          className,
        ),
      )}
    >
      {children}
    </Tag>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
  divided?: boolean;
}

export const CardHeader = ({
  children,
  className,
  divided = true,
}: CardHeaderProps) => {
  return (
    <div
      className={clsx(
        'px-5 sm:px-6 py-4',
        divided && 'border-b border-[var(--border-subtle)]',
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
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const bodyPadding = {
  none: '',
  sm: 'p-3 sm:p-4',
  md: 'p-5 sm:p-6',
  lg: 'p-6 sm:p-8',
};

export const CardBody = ({
  children,
  className,
  padding = 'md',
}: CardBodyProps) => {
  return (
    <div className={clsx(bodyPadding[padding], className)}>{children}</div>
  );
};

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
  divided?: boolean;
}

export const CardFooter = ({
  children,
  className,
  divided = true,
}: CardFooterProps) => {
  return (
    <div
      className={clsx(
        'px-5 sm:px-6 py-4',
        divided && 'border-t border-[var(--border-subtle)]',
        className,
      )}
    >
      {children}
    </div>
  );
};
