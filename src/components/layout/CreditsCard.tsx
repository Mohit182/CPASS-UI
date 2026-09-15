import { CircleDollarSign } from 'lucide-react';
import { cn } from '@/lib/cn';

interface CreditsCardProps {
  left: number;
  used: number;
  total: number;
  className?: string;
  onBuy?: () => void;
}

const fmt = (n: number) => n.toLocaleString('en-IN');

/** Dark gradient "Monthly credits" card pinned at the bottom of the sidebar. */
export function CreditsCard({ left, used, total, className, onBuy }: CreditsCardProps) {
  const pct = Math.min(100, Math.round((used / total) * 100));
  return (
    <div className={cn('rounded-card bg-brand-gradient-v p-4 text-white shadow-card', className)}>
      <div className="flex items-start justify-between">
        <p className="text-[13px] text-white/85">Monthly credits</p>
        <span className="grid h-7 w-7 place-items-center rounded-full border border-white/40">
          <CircleDollarSign className="h-3.5 w-3.5" />
        </span>
      </div>
      <p className="mt-1 font-display text-[30px] font-bold leading-none text-brand-orange">
        {fmt(left)} <span className="text-[13px] font-medium text-white/85">Left</span>
      </p>
      <div className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-white/25">
        <div className="h-full rounded-full bg-white" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-2 text-[11px] text-white/70">
        {fmt(used)} of {fmt(total)} used
      </p>
      <button
        type="button"
        onClick={onBuy}
        className="mt-3 w-full rounded-full bg-brand-orange py-1.5 text-[12px] font-semibold text-white transition hover:brightness-105"
      >
        Buy More Credits
      </button>
    </div>
  );
}

/** Compact variant used in the Dashboard header ("Credit Remaining 16,200 / 25,000"). */
export function CreditsPill({ left, total, className }: { left: number; total: number; className?: string }) {
  const pct = Math.min(100, Math.round((left / total) * 100));
  return (
    <div className={cn('min-w-[210px] rounded-xl bg-brand-gradient px-4 py-2.5 text-white shadow-card', className)}>
      <div className="flex items-start justify-between">
        <p className="text-[10px] text-white/75">Credit Remaining</p>
        <span className="grid h-5 w-5 place-items-center rounded-full border border-white/40">
          <CircleDollarSign className="h-3 w-3" />
        </span>
      </div>
      <p className="font-display text-[18px] font-bold leading-tight">
        {fmt(left)} / <span className="text-[11px] font-medium text-white/80">{fmt(total)}</span>
      </p>
      <div className="mt-1.5 h-[3px] w-full overflow-hidden rounded-full bg-white/25">
        <div className="h-full rounded-full bg-brand-orange" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
