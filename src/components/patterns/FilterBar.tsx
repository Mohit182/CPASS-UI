import type { ReactNode } from 'react';
import { Download, Search } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Button, DateInput, FormField, Input, Select } from '@/components/ui';

export interface FilterDef {
  key: string;
  label?: string;
  type: 'text' | 'date' | 'select';
  placeholder?: string;
  options?: string[] | { value: string; label: string }[];
  defaultValue?: string;
  width?: string;
}

/**
 * Horizontal filter row: labelled fields + Search + Download File.
 * Purely presentational for now — fields are uncontrolled.
 */
export function FilterBar({
  filters,
  onSearch,
  onDownload,
  extra,
  className,
  searchLabel = 'Search',
  card = true,
}: {
  filters: FilterDef[];
  onSearch?: () => void;
  onDownload?: () => void;
  extra?: ReactNode;
  className?: string;
  searchLabel?: string;
  card?: boolean;
}) {
  return (
    <div className={cn('flex flex-wrap items-end gap-3', card && 'rounded-card border border-white bg-surface-card p-4 shadow-card', className)}>
      {filters.map((f) => (
        <FormField key={f.key} label={f.label} className={cn('w-[160px]', f.width)}>
          {f.type === 'text' && <Input placeholder={f.placeholder} defaultValue={f.defaultValue} />}
          {f.type === 'date' && <DateInput defaultValue={f.defaultValue} />}
          {f.type === 'select' && <Select options={f.options ?? []} defaultValue={f.defaultValue} />}
        </FormField>
      ))}
      <div className="flex items-center gap-2 pb-px">
        {onSearch !== undefined && (
          <Button icon={<Search />} onClick={onSearch}>
            {searchLabel}
          </Button>
        )}
        {onDownload !== undefined && (
          <Button variant="outline" size="sm" icon={<Download />} onClick={onDownload}>
            Download File
          </Button>
        )}
        {extra}
      </div>
    </div>
  );
}

/** Compact toolbar used on list pages: search input + status select on the left, actions on the right. */
export function ListToolbar({
  searchPlaceholder = 'Search…',
  statusOptions = ['All Status', 'Active', 'Inactive'],
  actions,
  className,
  showStatus = true,
}: {
  searchPlaceholder?: string;
  statusOptions?: string[];
  actions?: ReactNode;
  className?: string;
  showStatus?: boolean;
}) {
  return (
    <div className={cn('mb-4 flex flex-wrap items-center gap-3', className)}>
      <Input leading={<Search />} placeholder={searchPlaceholder} className="w-[300px] [&>input]:rounded-full" />
      {showStatus && <Select options={statusOptions} className="w-[160px] [&>select]:rounded-full" />}
      <div className="ml-auto flex items-center gap-2">{actions}</div>
    </div>
  );
}
