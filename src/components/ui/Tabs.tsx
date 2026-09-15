import { cn } from '@/lib/cn';

export interface TabItem {
  value: string;
  label: string;
}

/** Underlined text tabs — "DAILY | WEEKLY | MONTHLY" on the dashboard, channel tabs on MIS. */
export function Tabs({
  items,
  value,
  onChange,
  className,
  size = 'md',
}: {
  items: TabItem[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
  size?: 'sm' | 'md';
}) {
  return (
    <div role="tablist" className={cn('flex items-center gap-6', className)}>
      {items.map((t) => {
        const active = t.value === value;
        return (
          <button
            key={t.value}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(t.value)}
            className={cn(
              'relative pb-1 font-medium uppercase tracking-wide transition',
              size === 'sm' ? 'text-[11px]' : 'text-[12px]',
              active ? 'text-brand-orange' : 'text-ink-secondary hover:text-ink',
            )}
          >
            {t.label}
            {active && <span className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-brand-orange" />}
          </button>
        );
      })}
    </div>
  );
}

/** Pill toggle — "Quick SMS | View Schedule". */
export function PillTabs({
  items,
  value,
  onChange,
  className,
}: {
  items: TabItem[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      {items.map((t) => {
        const active = t.value === value;
        return (
          <button
            key={t.value}
            type="button"
            onClick={() => onChange(t.value)}
            className={cn(
              'h-8 rounded-full px-4 text-[12px] font-medium transition',
              active ? 'bg-brand-gradient text-white shadow-soft' : 'border border-line bg-white text-ink-faint hover:text-ink',
            )}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
