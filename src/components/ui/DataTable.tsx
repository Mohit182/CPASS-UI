import { useMemo, useState, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface Column<T> {
  key: string;
  header: ReactNode;
  render?: (row: T, index: number) => ReactNode;
  className?: string;
  headerClassName?: string;
  align?: 'left' | 'center' | 'right';
  width?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T, index: number) => string;
  selectable?: boolean;
  /** Vertical column dividers as in the campaign list frame. */
  bordered?: boolean;
  /** Extra row rendered in the footer (totals). */
  footer?: ReactNode;
  emptyText?: string;
  className?: string;
  dense?: boolean;
  centered?: boolean;
  onSelectionChange?: (keys: string[]) => void;
}

const aligns = { left: 'text-left', center: 'text-center', right: 'text-right' };

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  selectable,
  bordered,
  footer,
  emptyText = 'No records found.',
  className,
  dense,
  centered,
  onSelectionChange,
}: DataTableProps<T>) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const keys = useMemo(() => rows.map(rowKey), [rows, rowKey]);
  const allSelected = keys.length > 0 && keys.every((k) => selected.has(k));

  const update = (next: Set<string>) => {
    setSelected(next);
    onSelectionChange?.([...next]);
  };

  const cell = (align?: 'left' | 'center' | 'right') => aligns[align ?? (centered ? 'center' : 'left')];
  const pad = dense ? 'whitespace-nowrap px-3 py-2' : 'px-4 py-3.5';

  return (
    <div className={cn('overflow-hidden rounded-card border border-line bg-surface-card shadow-card', className)}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[12px] text-ink">
          <thead>
            <tr className="bg-brand-gradient text-white">
              {selectable && (
                <th className={cn('w-12', pad)}>
                  <input
                    type="checkbox"
                    aria-label="Select all"
                    checked={allSelected}
                    onChange={(e) => update(e.target.checked ? new Set(keys) : new Set())}
                    className="h-4 w-4 rounded accent-white"
                  />
                </th>
              )}
              {columns.map((c) => (
                <th
                  key={c.key}
                  style={{ width: c.width }}
                  className={cn('whitespace-nowrap font-semibold', pad, cell(c.align), c.headerClassName)}
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="py-12 text-center text-[13px] text-ink-faint">
                  {emptyText}
                </td>
              </tr>
            )}
            {rows.map((row, i) => {
              const k = keys[i];
              return (
                <tr key={k} className={cn('border-t border-line transition hover:bg-surface-page', selected.has(k) && 'bg-brand-cream/40')}>
                  {selectable && (
                    <td className={cn(pad, 'text-center', bordered && 'border-r border-line')}>
                      <input
                        type="checkbox"
                        aria-label={`Select row ${i + 1}`}
                        checked={selected.has(k)}
                        onChange={(e) => {
                          const next = new Set(selected);
                          if (e.target.checked) next.add(k);
                          else next.delete(k);
                          update(next);
                        }}
                        className="h-4 w-4 rounded border-line accent-brand-navy"
                      />
                    </td>
                  )}
                  {columns.map((c, ci) => (
                    <td
                      key={c.key}
                      className={cn(pad, cell(c.align), bordered && ci < columns.length - 1 && 'border-r border-line', c.className)}
                    >
                      {c.render ? c.render(row, i) : String((row as Record<string, unknown>)[c.key] ?? '')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
          {footer && <tfoot className="border-t border-line font-semibold">{footer}</tfoot>}
        </table>
      </div>
    </div>
  );
}

/** Two-line cell: value + small muted meta (e.g. date + time). */
export function CellMeta({ primary, secondary }: { primary: ReactNode; secondary?: ReactNode }) {
  return (
    <span className="block leading-tight">
      <span className="block text-[12px] font-medium text-ink">{primary}</span>
      {secondary && <span className="block text-[10px] text-ink-secondary">{secondary}</span>}
    </span>
  );
}
