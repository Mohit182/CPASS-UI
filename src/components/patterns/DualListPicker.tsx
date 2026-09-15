import { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '@/lib/cn';

function ListBox({
  title,
  items,
  selected,
  onToggle,
}: {
  title: string;
  items: string[];
  selected: Set<string>;
  onToggle: (v: string) => void;
}) {
  return (
    <div className="flex min-h-[260px] flex-1 flex-col overflow-hidden rounded-lg border border-line bg-white">
      <div className="border-b border-line bg-surface-muted px-3 py-2 text-[12px] font-semibold text-ink">{title}</div>
      <ul className="flex-1 overflow-y-auto p-1 text-[12px]">
        {items.length === 0 && <li className="px-2 py-6 text-center text-ink-faint">Empty</li>}
        {items.map((it) => (
          <li key={it}>
            <button
              type="button"
              onClick={() => onToggle(it)}
              className={cn('w-full rounded px-2 py-1.5 text-left transition', selected.has(it) ? 'bg-brand-navy text-white' : 'hover:bg-surface-muted')}
            >
              {it}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Available ⇄ Selected columns with ›, ‹, », « controls. */
export function DualListPicker({
  available: initialAvailable,
  selected: initialSelected = [],
  labels = { available: 'Available Fields', selected: 'Selected Fields' },
  className,
  onChange,
}: {
  available: string[];
  selected?: string[];
  labels?: { available: string; selected: string };
  className?: string;
  onChange?: (selected: string[]) => void;
}) {
  const [available, setAvailable] = useState(initialAvailable.filter((a) => !initialSelected.includes(a)));
  const [selected, setSelected] = useState(initialSelected);
  const [pickA, setPickA] = useState<Set<string>>(new Set());
  const [pickS, setPickS] = useState<Set<string>>(new Set());

  const commit = (a: string[], s: string[]) => {
    setAvailable(a);
    setSelected(s);
    setPickA(new Set());
    setPickS(new Set());
    onChange?.(s);
  };
  const toggle = (set: Set<string>, setter: (s: Set<string>) => void, v: string) => {
    const next = new Set(set);
    if (next.has(v)) next.delete(v);
    else next.add(v);
    setter(next);
  };

  const btn = 'grid h-8 w-8 place-items-center rounded-md border border-line bg-white text-ink hover:bg-surface-muted disabled:opacity-40';

  return (
    <div className={cn('flex items-stretch gap-3', className)}>
      <ListBox title={labels.available} items={available} selected={pickA} onToggle={(v) => toggle(pickA, setPickA, v)} />
      <div className="flex flex-col justify-center gap-2">
        <button type="button" className={btn} disabled={!pickA.size} aria-label="Add selected" onClick={() => commit(available.filter((a) => !pickA.has(a)), [...selected, ...available.filter((a) => pickA.has(a))])}>
          <ChevronRight className="h-4 w-4" />
        </button>
        <button type="button" className={btn} disabled={!pickS.size} aria-label="Remove selected" onClick={() => commit([...available, ...selected.filter((s) => pickS.has(s))], selected.filter((s) => !pickS.has(s)))}>
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button type="button" className={btn} disabled={!available.length} aria-label="Add all" onClick={() => commit([], [...selected, ...available])}>
          <ChevronsRight className="h-4 w-4" />
        </button>
        <button type="button" className={btn} disabled={!selected.length} aria-label="Remove all" onClick={() => commit([...available, ...selected], [])}>
          <ChevronsLeft className="h-4 w-4" />
        </button>
      </div>
      <ListBox title={labels.selected} items={selected} selected={pickS} onToggle={(v) => toggle(pickS, setPickS, v)} />
    </div>
  );
}
