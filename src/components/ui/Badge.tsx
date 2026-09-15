import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { statusMeta, type StatusTone } from '@/lib/status';

const tones: Record<StatusTone, string> = {
  success: 'bg-status-successBg text-status-success',
  danger: 'bg-status-dangerBg text-status-danger',
  warning: 'bg-status-warningBg text-status-warning',
  info: 'bg-status-infoBg text-status-info',
  violet: 'bg-status-violetBg text-status-violet',
  cyan: 'bg-status-cyanBg text-status-cyan',
  neutral: 'bg-surface-muted text-ink-secondary',
};

export function Badge({
  tone = 'neutral',
  dot,
  className,
  children,
}: {
  tone?: StatusTone;
  dot?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium leading-none', tones[tone], className)}>
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

/** Maps any status string (Active, Delivered, Failed, Running…) to a coloured pill. */
export function StatusBadge({ status, dot = true, className }: { status: string; dot?: boolean; className?: string }) {
  const meta = statusMeta(status);
  return (
    <Badge tone={meta.tone} dot={dot} className={className}>
      {meta.label}
    </Badge>
  );
}
