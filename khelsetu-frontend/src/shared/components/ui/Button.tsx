import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { type ElementType, type ReactNode, forwardRef } from 'react';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'success'
  | 'glass'
  | 'gold'
  | 'live'
  | 'create';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ButtonOwnProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  /** Renders a perfectly square button sized to its height. */
  iconOnly?: boolean;
  /** Polymorphic render: 'button' (default), 'a', or a custom component (e.g. react-router `Link`). */
  as?: ElementType;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  /** Optional loading stage text (e.g. 'Verifying', 'Authenticating', 'Redirecting') */
  loadingStage?: string;
}

export type ButtonProps = ButtonOwnProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonOwnProps>;

const baseStyles =
  'relative inline-flex items-center justify-center font-semibold tracking-tight ' +
  'rounded-xl whitespace-nowrap select-none align-middle ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
  'focus-visible:ring-[var(--brand-primary)] dark:focus-visible:ring-[var(--brand-primary)] dark:focus-visible:ring-offset-[var(--bg-canvas)] ' +
  'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none ' +
  'transition-[transform,background-color,box-shadow,color,border-color] duration-200 ease-out ' +
  'active:translate-y-px hover:scale-[1.02] active:scale-[0.97] ' +
  'will-change-transform';

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-br from-[var(--brand-primary-hover)] via-[var(--brand-primary)] to-[var(--brand-primary-active)] text-white ' +
    'shadow-[0_4px_14px_-2px_rgb(127_29_29/0.45)] ' +
    'hover:from-[var(--brand-primary)] hover:via-[var(--brand-primary)] hover:to-[var(--brand-primary-active)] ' +
    'hover:shadow-[0_8px_24px_-4px_rgb(127_29_29/0.55)] hover:brightness-110 ' +
    'dark:bg-gradient-to-br dark:from-[#6b1515] dark:via-[#8b1c1c] dark:to-[#521010] dark:text-white ' +
    'dark:shadow-[0_4px_16px_-2px_rgb(127_29_29/0.6),inset_0_1px_0_0_rgba(255,255,255,0.08)] ' +
    'dark:hover:from-[#7f1d1d] dark:hover:via-[#991b1b] dark:hover:to-[#6b1515] ' +
    'dark:hover:shadow-[0_8px_28px_-4px_rgb(127_29_29/0.7),inset_0_1px_0_0_rgba(255,255,255,0.12)] dark:hover:brightness-110',
  secondary:
    'bg-[var(--bg-inverse)] text-white hover:bg-[var(--bg-surface-raised)] ' +
    'shadow-sm hover:shadow-md ' +
    'dark:bg-[var(--text-primary)] dark:text-[var(--bg-inverse)] dark:hover:bg-[var(--bg-surface-sunken)]',
  outline:
    'border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:bg-[var(--bg-surface-sunken)] hover:border-[var(--border-strong)] ' +
    'dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface)] dark:text-[var(--text-primary)] dark:hover:bg-[var(--bg-surface-raised)] dark:hover:border-[var(--border-strong)]',
  ghost:
    'text-[var(--text-primary)] hover:bg-[var(--bg-surface-sunken)] ' +
    'dark:text-[var(--text-primary)] dark:hover:bg-[var(--bg-surface-raised)]',
  danger:
    'bg-gradient-to-br from-[var(--color-danger)] to-[var(--brand-primary)] text-white ' +
    'shadow-[0_4px_14px_-2px_rgb(185_28_28/0.45)] ' +
    'hover:from-[var(--brand-primary)] hover:to-[var(--brand-primary-active)] ' +
    'dark:bg-gradient-to-br dark:from-[#991b1b] dark:to-[#5b1414] dark:text-white ' +
    'dark:shadow-[0_4px_16px_-2px_rgb(185_28_28/0.5),inset_0_1px_0_0_rgba(255,255,255,0.06)] ' +
    'dark:hover:from-[#b91c1c] dark:hover:to-[#7f1d1d] ' +
    'dark:hover:shadow-[0_8px_24px_-4px_rgb(185_28_28/0.6)]',
  success:
    'bg-gradient-to-br from-[var(--color-success)] to-[var(--color-success)] text-white ' +
    'shadow-[0_4px_14px_-2px_rgb(21_128_61/0.45)] ' +
    'hover:from-[var(--color-success)] hover:to-[var(--color-success)] ' +
    'dark:bg-gradient-to-br dark:from-[#166534] dark:to-[#14532d] dark:text-white ' +
    'dark:shadow-[0_4px_16px_-2px_rgb(21_128_61/0.5),inset_0_1px_0_0_rgba(255,255,255,0.06)] ' +
    'dark:hover:from-[#15803d] dark:hover:to-[#166534] ' +
    'dark:hover:shadow-[0_8px_24px_-4px_rgb(21_128_61/0.6)]',
  glass:
    'bg-[var(--bg-glass)] backdrop-blur-xl text-[var(--text-primary)] border border-[var(--border-subtle)] ' +
    'shadow-[0_4px_20px_-4px_rgb(15_23_42/0.1)] ' +
    'hover:bg-[var(--bg-glass-strong)] ' +
    'dark:bg-[var(--bg-surface)]/80 dark:text-white dark:border-white/10 dark:hover:bg-[var(--bg-surface-raised)]/95',
  gold:
    'bg-gradient-to-br from-[var(--brand-accent)] via-[var(--brand-accent-hover)] to-[var(--brand-accent-hover)] text-[var(--brand-primary-ink)] ' +
    'shadow-[0_4px_14px_-2px_rgb(184_134_11/0.45)] ' +
    'hover:from-[var(--brand-accent-hover)] hover:via-[var(--brand-accent)] hover:to-[var(--brand-accent-hover)] ' +
    'hover:shadow-[0_8px_24px_-4px_rgb(184_134_11/0.55)] ' +
    'dark:bg-gradient-to-br dark:from-[#92710a] dark:via-[#b8860b] dark:to-[#7a5f08] dark:text-white ' +
    'dark:shadow-[0_4px_16px_-2px_rgb(184_134_11/0.5),inset_0_1px_0_0_rgba(255,255,255,0.1)] ' +
    'dark:hover:from-[#a6800c] dark:hover:via-[#d4a017] dark:hover:to-[#92710a] ' +
    'dark:hover:shadow-[0_8px_28px_-4px_rgb(184_134_11/0.6)] dark:hover:brightness-110',
  live:
    'bg-gradient-to-br from-[var(--color-danger)] via-[var(--brand-primary)] to-[var(--brand-primary-hover)] text-white ' +
    'shadow-[0_4px_14px_-2px_rgb(185_28_28/0.5)] animate-glow-pulse ' +
    'hover:from-[var(--color-danger)] hover:to-[var(--brand-primary)] ' +
    'hover:shadow-[0_8px_28px_-4px_rgb(185_28_28/0.6)] ' +
    'dark:bg-gradient-to-br dark:from-[#dc2626] dark:via-[#8b1c1c] dark:to-[#6b1515] dark:text-white ' +
    'dark:shadow-[0_4px_16px_-2px_rgb(220_38_38/0.5),inset_0_1px_0_0_rgba(255,255,255,0.08)] ' +
    'dark:hover:from-[#ef4444] dark:hover:via-[#991b1b] dark:hover:to-[#7f1d1d] ' +
    'dark:hover:shadow-[0_8px_28px_-4px_rgb(220_38_38/0.6)]',
  create:
    'bg-[var(--brand-primary)] text-white ' +
    'shadow-[0_2px_8px_-2px_rgb(127_29_29/0.35)] ' +
    'hover:bg-[var(--brand-primary-hover)] ' +
    'hover:shadow-[0_4px_16px_-4px_rgb(127_29_29/0.45)] ' +
    'dark:bg-gradient-to-br dark:from-[#7f1d1d] dark:to-[#5b1414] dark:text-white ' +
    'dark:shadow-[0_4px_16px_-2px_rgb(127_29_29/0.5),inset_0_1px_0_0_rgba(255,255,255,0.06)] ' +
    'dark:hover:from-[#991b1b] dark:hover:to-[#6b1515] ' +
    'dark:hover:shadow-[0_8px_24px_-4px_rgb(127_29_29/0.6)]',
};

const sizeStyles: Record<ButtonSize, string> = {
  xs: 'h-7 px-2.5 text-xs gap-1.5 sm:h-8',
  sm: 'h-9 px-3.5 text-sm gap-1.5 sm:h-10',
  md: 'h-10 px-4 text-sm gap-2 sm:h-11',
  lg: 'h-12 px-6 text-base gap-2 sm:h-12 md:min-h-[48px]',
  xl: 'h-14 px-7 text-base gap-2.5 sm:h-14 md:min-h-[48px]',
};

/**
 * Button — the workhorse interactive primitive.
 *
 * Polymorphic: pass `as="a"` or `as={Link}` to render as a link/anchor
 * with all the same styling.
 *
 * Pure CSS animations (hover scale, active press) — no JS animation library.
 * Honors `prefers-reduced-motion` via Tailwind's built-in handling.
 */
export const Button = forwardRef<HTMLElement, ButtonProps>(
  function Button(props, ref) {
    const variant: ButtonVariant = props.variant ?? 'primary';
    const size: ButtonSize = props.size ?? 'md';
    const isLoading: boolean = props.isLoading ?? false;
    const fullWidth: boolean = props.fullWidth ?? false;
    const iconOnly: boolean = props.iconOnly ?? false;
    const Tag: ElementType = (props.as as ElementType) ?? 'button';
    const className = (props.className as string | undefined) ?? '';
    const disabled = props.disabled;
    const isDisabled = Boolean(disabled) || isLoading;

    // Buttons should not be tabbable while loading; keep aria-busy on.
    const a11y: Record<string, boolean | string> = isLoading
      ? { 'aria-busy': true, 'aria-live': 'polite' }
      : {};

    const {
      variant: _v,
      size: _s,
      isLoading: _il,
      fullWidth: _fw,
      iconOnly: _io,
      as: _as,
      leftIcon,
      rightIcon,
      children,
      className: _cn,
      disabled: _d,
      ...rest
    } = props;

    return (
      <Tag
        ref={ref}
        className={twMerge(
          clsx(
            baseStyles,
            variantStyles[variant],
            sizeStyles[size],
            iconOnly && '!p-0 aspect-square',
            fullWidth && 'w-full',
            className,
          ),
        )}
        {...(Tag === 'button' ? { disabled: isDisabled || undefined } : {})}
        aria-disabled={isDisabled || undefined}
        {...a11y}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {isLoading && (
          <span
            aria-hidden="true"
            className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          />
        )}
        {!isLoading && leftIcon && (
          <span className="inline-flex shrink-0">{leftIcon as ReactNode}</span>
        )}
        {!iconOnly && <span className="truncate">{children}</span>}
        {iconOnly && <span className="sr-only">{children}</span>}
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0">{rightIcon as ReactNode}</span>
        )}
      </Tag>
    );
  },
);

Button.displayName = 'Button';
