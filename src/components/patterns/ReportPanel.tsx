import type { ReactNode } from 'react';
import { CheckCircle2, Download, MessageSquareText, MousePointerClick, Search, XCircle } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Button, Card, DateInput, FormField, Input, Select } from '@/components/ui';
import { StatCard } from './StatCard';
import { kpis } from '@/data/dashboard';
import type { FilterDef } from './FilterBar';

/** Card holding a filter row (+ Search / Download) and the standard four KPI cards. */
export function ReportPanel({
  filters,
  kpi = true,
  extraKpi,
  actions,
  className,
  children,
  downloadLabel = 'Download File',
}: {
  filters: FilterDef[];
  kpi?: boolean;
  extraKpi?: ReactNode;
  actions?: ReactNode;
  className?: string;
  children?: ReactNode;
  downloadLabel?: string;
}) {
  return (
    <Card className={cn('mb-5 p-5', className)}>
      <div className="flex flex-wrap items-end gap-3">
        {filters.map((f) => (
          <FormField key={f.key} label={f.label} className={cn('w-[160px]', f.width)}>
            {f.type === 'text' && <Input placeholder={f.placeholder} defaultValue={f.defaultValue} />}
            {f.type === 'date' && <DateInput defaultValue={f.defaultValue} />}
            {f.type === 'select' && <Select options={f.options ?? []} defaultValue={f.defaultValue} />}
          </FormField>
        ))}
        {actions ?? (
          <>
            <Button icon={<Search />}>Search</Button>
            <Button variant="outline" size="sm" icon={<Download />}>
              {downloadLabel}
            </Button>
          </>
        )}
      </div>
      {kpi && (
        <div className={cn('mt-5 grid gap-5', extraKpi ? 'grid-cols-5' : 'grid-cols-4 pr-[200px]')}>
          <StatCard label="SMS Submitted" icon={<MessageSquareText />} tone="violet" {...kpis.submitted} />
          <StatCard label="Delivered" icon={<CheckCircle2 />} tone="success" {...kpis.delivered} />
          <StatCard label="Failed" icon={<XCircle />} tone="danger" {...kpis.failed} />
          <StatCard label="Pending" icon={<Download />} tone="info" {...kpis.pending} />
          {extraKpi}
        </div>
      )}
      {children}
    </Card>
  );
}

export function ClickKpi() {
  return <StatCard label="Click" icon={<MousePointerClick />} tone="cyan" value={100} delta={18.6} series={kpis.pending.series} />;
}

export const USER_FILTER: FilterDef = { key: 'user', label: 'Use Name & User ID', type: 'text', placeholder: 'Search User', defaultValue: 'Growtele(2071)' };
export const FROM_FILTER: FilterDef = { key: 'from', label: 'From', type: 'date', defaultValue: '10-08-2026' };
export const TO_FILTER: FilterDef = { key: 'to', label: 'to', type: 'date', defaultValue: '10-08-2026' };
export const LIMIT_FILTER: FilterDef = { key: 'limit', label: 'Limit', type: 'select', options: ['10', '20', '50', '100'], width: 'w-[100px]' };
