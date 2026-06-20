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
}

export type ButtonProps = ButtonOwnProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonOwnProps>;

const baseStyles =
  'relative inline-flex items-center justify-center font-semibold tracking-tight ' +
  'rounded-xl whitespace-nowrap select-none align-middle ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
  'focus-visible:ring-[#7F1D1D] dark:focus-visible:ring-[#FCA5A5] dark:focus-visible:ring-offset-slate-900 ' +
  'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none ' +
  'transition-[transform,background-color,box-shadow,color,border-color] duration-200 ease-out ' +
  'active:translate-y-px hover:scale-[1.02] active:scale-[0.97] ' +
  'will-change-transform';

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-br from-[#991B1B] via-[#7F1D1D] to-[#450A0A] text-white ' +
    'shadow-[0_4px_14px_-2px_rgb(127_29_29/0.45)] ' +
    'hover:from-[#7F1D1D] hover:via-[#7F1D1D] hover:to-[#450A0A] ' +
    'hover:shadow-[0_8px_24px_-4px_rgb(127_29_29/0.55)] hover:brightness-110 ' +
    'dark:from-[#FCA5A5] dark:via-[#FCA5A5] dark:to-[#FECACA] ' +
    'dark:text-[#1A0A0A]',
  secondary:
    'bg-[#0F172A] text-white hover:bg-[#1E293B] ' +
    'shadow-sm hover:shadow-md ' +
    'dark:bg-[#F1F5F9] dark:text-[#0F172A] dark:hover:bg-white',
  outline:
    'border border-[#E7E5E4] bg-white text-[#0F172A] hover:bg-[#F5F5F4] hover:border-[#D6D3D1] ' +
    'dark:border-[#3F3F46] dark:bg-[#13131A] dark:text-[#F1F5F9] dark:hover:bg-[#1A1A23] dark:hover:border-[#52525B]',
  ghost:
    'text-[#0F172A] hover:bg-[#F5F5F4] ' +
    'dark:text-[#F1F5F9] dark:hover:bg-[#1A1A23]',
  danger:
    'bg-gradient-to-br from-[#B91C1C] to-[#7F1D1D] text-white ' +
    'shadow-[0_4px_14px_-2px_rgb(185_28_28/0.45)] ' +
    'hover:from-[#7F1D1D] hover:to-[#450A0A]',
  success:
    'bg-gradient-to-br from-[#15803D] to-[#166534] text-white ' +
    'shadow-[0_4px_14px_-2px_rgb(21_128_61/0.45)] ' +
    'hover:from-[#166534] hover:to-[#14532D]',
  glass:
    'bg-white/80 backdrop-blur-xl text-[#0F172A] border border-white/60 ' +
    'shadow-[0_4px_20px_-4px_rgb(15_23_42/0.1)] ' +
    'hover:bg-white/95 ' +
    'dark:bg-[#13131A]/80 dark:text-white dark:border-white/10 dark:hover:bg-[#1A1A23]/95',
  gold:
    'bg-gradient-to-br from-[#B8860B] via-[#A07A0A] to-[#7A5A08] text-[#1A0A0A] ' +
    'shadow-[0_4px_14px_-2px_rgb(184_134_11/0.45)] ' +
    'hover:from-[#C4930A] hover:via-[#B8860B] hover:to-[#8B6709] ' +
    'hover:shadow-[0_8px_24px_-4px_rgb(184_134_11/0.55)] ' +
    'dark:from-[#E5B547] dark:via-[#D1A73D] dark:to-[#B8860B] dark:text-[#1A0A0A]',
  live:
    'bg-gradient-to-br from-[#B91C1C] via-[#991B1B] to-[#7F1D1D] text-white ' +
    'shadow-[0_4px_14px_-2px_rgb(185_28_28/0.5)] ' +
    'hover:from-[#991B1B] hover:via-[#7F1D1D] hover:to-[#450A0A] ' +
    'hover:shadow-[0_8px_28px_-4px_rgb(185_28_28/0.6),0_0_50px_10px_rgb(185_28_28/0.2)] ' +
    'hover:brightness-110 ' +
    'dark:from-[#FCA5A5] dark:via-[#F87171] dark:to-[#FECACA] ' +
    'dark:text-[#1A0A0A]',
  create:
    'bg-gradient-to-br from-[#B91C1C] via-[#991B1B] to-[#7F1D1D] text-white ' +
    'shadow-[0_4px_14px_-2px_rgb(153_27_27/0.45)] ' +
    'hover:from-[#991B1B] hover:via-[#7F1D1D] hover:to-[#450A0A] ' +
    'hover:shadow-[0_8px_28px_-4px_rgb(153_27_27/0.55),0_0_0_2px_rgb(153_27_27/0.15)] ' +
    'hover:brightness-110 ' +
    'dark:from-[#FCA5A5] dark:via-[#F87171] dark:to-[#FECACA] ' +
    'dark:text-[#1A0A0A]',
};

const sizeStyles: Record<ButtonSize, string> = {
  xs: 'h-7 px-2.5 text-xs gap-1.5',
  sm: 'h-9 px-3.5 text-sm gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2',
  xl: 'h-14 px-7 text-base gap-2.5',
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
    const a11y: Record<string, boolean> = isLoading
      ? { 'aria-busy': true, 'aria-live': true }
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
        disabled={isDisabled || undefined}
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
