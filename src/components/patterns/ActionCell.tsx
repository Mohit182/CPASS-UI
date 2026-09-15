import { useState } from 'react';
import { SquarePen, Trash2 } from 'lucide-react';
import { IconButton, Toggle } from '@/components/ui';

/** Edit / delete / (optional) status toggle trio used in every list table. */
export function ActionCell({
  onEdit,
  onDelete,
  toggle,
  onToggle,
}: {
  onEdit?: () => void;
  onDelete?: () => void;
  /** Initial toggle state; omit to hide the toggle. */
  toggle?: boolean;
  onToggle?: (v: boolean) => void;
}) {
  const [on, setOn] = useState(!!toggle);
  return (
    <span className="inline-flex items-center justify-center gap-1">
      <IconButton label="Edit" onClick={onEdit}>
        <SquarePen />
      </IconButton>
      <IconButton label="Delete" tone="danger" onClick={onDelete}>
        <Trash2 />
      </IconButton>
      {toggle !== undefined && (
        <span className={on ? '' : '[&_button]:bg-status-danger'}>
          <Toggle
            size="sm"
            checked={on}
            onChange={(v) => {
              setOn(v);
              onToggle?.(v);
            }}
          />
        </span>
      )}
    </span>
  );
}
