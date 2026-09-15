import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'outline' | 'cta' | 'ghost' | 'danger' | 'soft';
type Size = 'xs' | 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconRight?: ReactNode;
  block?: boolean;
}

const variants: Record<Variant, string> = {
  primary: 'bg-brand-gradient text-white shadow-soft hover:brightness-110',
  outline: 'border border-brand-navy/60 bg-white text-brand-navy hover:bg-surface-muted',
  cta: 'bg-brand-orange text-white hover:brightness-105',
  ghost: 'text-ink-secondary hover:bg-surface-muted hover:text-ink',
  danger: 'bg-status-danger text-white hover:brightness-110',
  soft: 'bg-surface-muted text-ink-secondary hover:bg-line',
};

const sizes: Record<Size, string> = {
  xs: 'h-7 px-3 text-[11px] gap-1',
  sm: 'h-8 px-3.5 text-[12px] gap-1.5',
  md: 'h-9 px-4 text-[13px] gap-2',
  lg: 'h-11 px-6 text-[14px] gap-2',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', icon, iconRight, block, className, children, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        'inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/30 disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        sizes[size],
        block && 'w-full',
        className,
      )}
      {...rest}
    >
      {icon && <span className="[&>svg]:h-4 [&>svg]:w-4">{icon}</span>}
      {children}
      {iconRight && <span className="[&>svg]:h-4 [&>svg]:w-4">{iconRight}</span>}
    </button>
  );
});

/** Square icon-only button used in table action cells. */
export function IconButton({
  label,
  tone = 'default',
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { label: string; tone?: 'default' | 'danger' | 'success' }) {
  const tones = {
    default: 'text-brand-navy hover:bg-surface-muted',
    danger: 'text-status-danger hover:bg-status-dangerBg',
    success: 'text-status-success hover:bg-status-successBg',
  };
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn('grid h-7 w-7 place-items-center rounded-md transition [&>svg]:h-4 [&>svg]:w-4', tones[tone], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
