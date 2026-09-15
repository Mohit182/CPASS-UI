import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function Card({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-card border border-white bg-surface-card shadow-card', className)} {...rest} />;
}

export function CardHeader({
  title,
  subtitle,
  action,
  className,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('mb-4 flex items-start justify-between gap-4', className)}>
      <div>
        <h3 className="font-display text-[20px] font-semibold leading-tight text-ink">{title}</h3>
        {subtitle && <p className="mt-0.5 text-[13px] text-ink-secondary">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/** Dark gradient card (recipient stats, credits, etc.). */
export function DarkCard({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-card bg-brand-gradient-v p-5 text-white shadow-card', className)} {...rest} />;
}
