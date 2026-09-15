import type { ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface HeroTabItem {
  to: string;
  title: string;
  subtitle: string;
  icon: ReactNode;
  /** Icon tint (defaults to violet). */
  tone?: 'violet' | 'success' | 'danger' | 'info' | 'orange' | 'cyan';
  /** Prefix for active matching (defaults to `to`). */
  match?: string;
}

const iconTones = {
  violet: 'text-status-violet',
  success: 'text-status-success',
  danger: 'text-status-danger',
  info: 'text-status-info',
  orange: 'text-brand-orange',
  cyan: 'text-status-cyan',
};

/** Dark gradient strip of option cards; the active one becomes a cream card with an orange tick. */
export function HeroTabs({ items, className }: { items: HeroTabItem[]; className?: string }) {
  const { pathname } = useLocation();
  return (
    <div className={cn('mb-6 grid gap-2 rounded-hero bg-brand-gradient p-2', className)} style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
      {items.map((it) => {
        const active = pathname === it.to || pathname.startsWith((it.match ?? it.to) + '/');
        return (
          <NavLink
            key={it.to}
            to={it.to}
            className={cn(
              'flex items-center gap-3 rounded-xl px-4 py-2.5 transition',
              active ? 'border border-brand-creamBorder bg-brand-cream text-ink shadow-soft' : 'text-white hover:bg-white/10',
            )}
          >
            <span
              className={cn(
                'grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white [&>svg]:h-[18px] [&>svg]:w-[18px]',
                iconTones[it.tone ?? 'violet'],
              )}
            >
              {it.icon}
            </span>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block truncate text-[14px] font-semibold">{it.title}</span>
              <span className={cn('block truncate text-[11px]', active ? 'text-ink-secondary' : 'text-white/80')}>{it.subtitle}</span>
            </span>
            {active ? <Check className="h-5 w-5 shrink-0 text-brand-orange" strokeWidth={2.5} /> : <ArrowRight className="h-5 w-5 shrink-0 text-white/90" />}
          </NavLink>
        );
      })}
    </div>
  );
}
