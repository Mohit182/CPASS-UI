import type { ReactNode } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Card, IconTile } from '@/components/ui';
import { Sparkline, type SparkTone } from '@/components/charts/Sparkline';
import { formatNumber } from '@/lib/format';

export interface StatCardProps {
  label: string;
  value: number | string;
  delta?: number;
  compare?: string;
  icon: ReactNode;
  tone?: SparkTone;
  series?: number[];
  className?: string;
}

/** KPI card: icon tile, label, big number, delta, sparkline. */
export function StatCard({ label, value, delta, compare = 'vs June 01 - June 30', icon, tone = 'violet', series, className }: StatCardProps) {
  const up = (delta ?? 0) >= 0;
  return (
    <Card className={cn('p-4', className)}>
      <div className="flex items-center gap-2.5">
        <IconTile tone={tone === 'warning' ? 'warning' : tone} size="sm">
          {icon}
        </IconTile>
        <span className="text-[13px] text-ink">{label}</span>
      </div>
      <p className="mt-3 font-display text-[28px] font-bold leading-none text-ink">{typeof value === 'number' ? formatNumber(value) : value}</p>
      {delta !== undefined && (
        <p className={cn('mt-1.5 flex items-center gap-0.5 text-[11px] font-semibold', up ? 'text-status-success' : 'text-status-danger')}>
          {up ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
          {Math.abs(delta).toFixed(1)}%
          <span className="ml-1 text-[9px] font-normal text-ink-faint">{compare}</span>
        </p>
      )}
      {series && (
        <div className="mt-2">
          <Sparkline data={series} tone={tone} />
        </div>
      )}
    </Card>
  );
}

/** Simple count card: icon + label on one line, big number under. */
export function CountCard({
  label,
  value,
  icon,
  tone = 'violet',
  className,
}: {
  label: string;
  value: number | string;
  icon: ReactNode;
  tone?: 'violet' | 'success' | 'danger' | 'info' | 'warning' | 'cyan' | 'orange';
  className?: string;
}) {
  return (
    <Card className={cn('px-4 py-3.5', className)}>
      <div className="flex items-center gap-2.5">
        <IconTile tone={tone} size="sm" solid>
          {icon}
        </IconTile>
        <span className="text-[13px] text-ink">{label}</span>
      </div>
      <p className="mt-2 font-display text-[28px] font-bold leading-none text-ink">{typeof value === 'number' ? formatNumber(value) : value}</p>
    </Card>
  );
}

/** Small bordered KPI tile ("46 Approved templates") used in DLT Summary. */
export function MiniStat({ value, label, tone = 'success', className }: { value: string; label: string; tone?: 'success' | 'info' | 'orange'; className?: string }) {
  const colors = { success: 'text-status-success', info: 'text-status-info', orange: 'text-brand-orange' };
  return (
    <div className={cn('rounded-lg border border-brand-navy/40 px-3 py-2', className)}>
      <p className={cn('font-display text-[16px] font-bold leading-tight', colors[tone])}>{value}</p>
      <p className="text-[11px] text-ink-secondary">{label}</p>
    </div>
  );
}
