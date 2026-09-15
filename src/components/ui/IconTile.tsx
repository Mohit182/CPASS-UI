import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import type { StatusTone } from '@/lib/status';

type Tone = StatusTone | 'brand' | 'orange';

const tones: Record<Tone, string> = {
  success: 'bg-status-successBg text-status-success',
  danger: 'bg-status-dangerBg text-status-danger',
  warning: 'bg-status-warningBg text-status-warning',
  info: 'bg-status-infoBg text-status-info',
  violet: 'bg-status-violetBg text-status-violet',
  cyan: 'bg-status-cyanBg text-status-cyan',
  neutral: 'bg-surface-muted text-ink-secondary',
  brand: 'bg-brand-navy/10 text-brand-navy',
  orange: 'bg-brand-cream text-brand-orange',
};

const sizes = { sm: 'h-7 w-7 rounded-md [&>svg]:h-3.5 [&>svg]:w-3.5', md: 'h-9 w-9 rounded-lg [&>svg]:h-[18px] [&>svg]:w-[18px]', lg: 'h-11 w-11 rounded-xl [&>svg]:h-5 [&>svg]:w-5' };

/** Rounded tinted square holding an icon (stat cards, hero tabs, workspace lists). */
export function IconTile({
  tone = 'brand',
  size = 'md',
  className,
  children,
  solid,
}: {
  tone?: Tone;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: ReactNode;
  /** filled circle variant (delivered / failed icons in stat cards) */
  solid?: boolean;
}) {
  return (
    <span
      className={cn(
        'grid shrink-0 place-items-center',
        sizes[size],
        solid ? 'rounded-full' : '',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
