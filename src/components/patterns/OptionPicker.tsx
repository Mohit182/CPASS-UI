import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface OptionItem {
  to: string;
  title: string;
  subtitle: string;
  icon: ReactNode;
  tone?: 'violet' | 'success' | 'danger' | 'info' | 'orange' | 'cyan';
}

const iconTones = {
  violet: 'text-status-violet',
  success: 'text-status-success',
  danger: 'text-status-danger',
  info: 'text-status-info',
  orange: 'text-brand-orange',
  cyan: 'text-status-cyan',
};

/** Vertical list of option cards on a dark gradient panel (Send Now, Summary, Detail, DLT pickers). */
export function OptionPicker({ items, className, defaultActive = 0 }: { items: OptionItem[]; className?: string; defaultActive?: number }) {
  const [active, setActive] = useState(defaultActive);
  return (
    <div className={cn('space-y-3 rounded-hero bg-brand-gradient-v p-5', className)}>
      {items.map((it, i) => {
        const isActive = i === active;
        return (
          <Link
            key={it.to}
            to={it.to}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            className={cn(
              'flex items-center gap-4 rounded-xl px-4 py-3.5 transition',
              isActive ? 'border border-brand-creamBorder bg-brand-cream text-ink shadow-soft' : 'text-white hover:bg-white/10',
            )}
          >
            <span className={cn('grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white [&>svg]:h-5 [&>svg]:w-5', iconTones[it.tone ?? 'violet'])}>
              {it.icon}
            </span>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block text-[15px] font-semibold">{it.title}</span>
              <span className={cn('block text-[12px]', isActive ? 'text-ink-secondary' : 'text-white/80')}>{it.subtitle}</span>
            </span>
            {isActive ? <Check className="h-5 w-5 text-brand-orange" strokeWidth={2.5} /> : <ArrowRight className="h-5 w-5 text-white/90" />}
          </Link>
        );
      })}
    </div>
  );
}

/** Warm gradient panel with floating stat chips, standing in for the hero photo. */
export function HeroIllustration({
  chips = [
    { label: 'Delivery Status', value: '99.6%', sub: 'Delivered' },
    { label: 'Messages Sent', value: '12.88+', sub: 'Total Delivered' },
    { label: 'Instant Delivery', value: '', sub: 'Messages delivered in seconds' },
  ],
  className,
}: {
  chips?: { label: string; value: string; sub: string }[];
  className?: string;
}) {
  return (
    <div className={cn('relative min-h-[380px] overflow-hidden rounded-hero bg-[linear-gradient(180deg,#FFFFFF_0%,#FFF1E3_100%)]', className)}>
      <div className="absolute left-1/2 top-10 h-[260px] w-[260px] -translate-x-1/2 rotate-45 rounded-[48px] bg-brand-cream" />
      <div className="absolute left-1/2 top-[110px] h-[300px] w-[300px] -translate-x-1/2 rounded-t-[150px] bg-[#1D3E7A]/90" />
      <div className="absolute left-1/2 top-[120px] h-[90px] w-[90px] -translate-x-1/2 rounded-full bg-[#F1C7A5]" />
      <div className="absolute left-1/2 top-[290px] h-[70px] w-[36px] -translate-x-1/2 rounded-lg border-4 border-[#111] bg-[#222]" />
      <div className="absolute left-6 top-24 w-[150px] rounded-lg bg-white p-3 text-[10px] shadow-card">
        <p className="flex items-center gap-1 font-semibold text-ink">
          <span className="h-2.5 w-2.5 rounded-sm bg-status-success" /> GROWTELE
        </p>
        <p className="mt-1 text-ink">Your OTP for verification is <b>672341.</b></p>
        <p className="text-ink-secondary">Do not share it with anyone.</p>
      </div>
      {chips.map((c, i) => (
        <div
          key={c.label}
          className={cn('absolute rounded-lg bg-white p-3 shadow-card', i === 0 && 'right-6 top-14', i === 1 && 'right-6 top-[190px]', i === 2 && 'left-8 top-[230px]')}
        >
          <p className="text-[10px] font-semibold text-ink">{c.label}</p>
          {c.value && <p className="font-display text-[18px] font-bold text-ink">{c.value}</p>}
          <p className="text-[9px] text-ink-secondary">{c.sub}</p>
        </div>
      ))}
    </div>
  );
}
