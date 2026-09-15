import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';

export function Pagination({
  page,
  pages,
  onChange,
  className,
}: {
  page: number;
  pages: number;
  onChange: (p: number) => void;
  className?: string;
}) {
  if (pages <= 1) return null;
  const items = Array.from({ length: pages }, (_, i) => i + 1).filter((p) => p === 1 || p === pages || Math.abs(p - page) <= 1);
  return (
    <nav className={cn('flex items-center justify-end gap-1 text-[12px]', className)} aria-label="Pagination">
      <button type="button" disabled={page === 1} onClick={() => onChange(page - 1)} className="grid h-8 w-8 place-items-center rounded-md text-ink-secondary hover:bg-surface-muted disabled:opacity-40">
        <ChevronLeft className="h-4 w-4" />
      </button>
      {items.map((p, i) => (
        <span key={p} className="contents">
          {i > 0 && items[i - 1] !== p - 1 && <span className="px-1 text-ink-faint">…</span>}
          <button
            type="button"
            onClick={() => onChange(p)}
            className={cn('h-8 min-w-8 rounded-md px-2 font-medium', p === page ? 'bg-brand-gradient text-white' : 'text-ink-secondary hover:bg-surface-muted')}
          >
            {p}
          </button>
        </span>
      ))}
      <button type="button" disabled={page === pages} onClick={() => onChange(page + 1)} className="grid h-8 w-8 place-items-center rounded-md text-ink-secondary hover:bg-surface-muted disabled:opacity-40">
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
