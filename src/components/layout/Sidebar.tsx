import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/cn';
import { NAV_ITEMS, type NavItem } from '@/app/nav';
import { useLayout } from '@/app/providers';
import { CreditsCard } from './CreditsCard';

function SidebarItem({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  const { pathname } = useLocation();
  const active = pathname.startsWith(item.match ?? item.to);
  const [open, setOpen] = useState(active);
  const Icon = item.icon;
  const hasChildren = !!item.children?.length && !collapsed;

  return (
    <li>
      <div className="relative">
        <NavLink
          to={item.to}
          title={collapsed ? item.label : undefined}
          className={cn(
            'group flex h-10 items-center gap-3 rounded-lg px-3 text-[14px] font-medium transition-colors',
            collapsed && 'justify-center px-0',
            active ? 'bg-brand-gradient text-white shadow-card' : 'text-ink hover:bg-white/70 hover:text-brand-navy',
          )}
        >
          <Icon
            className={cn('h-[18px] w-[18px] shrink-0', active ? 'text-white' : 'text-ink-secondary group-hover:text-brand-navy')}
            strokeWidth={1.75}
          />
          {!collapsed && <span className="truncate">{item.label}</span>}
        </NavLink>
        {hasChildren && (
          <button
            type="button"
            aria-label={open ? 'Collapse section' : 'Expand section'}
            onClick={() => setOpen((o) => !o)}
            className={cn(
              'absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 transition',
              active ? 'text-white/80 hover:bg-white/10' : 'text-ink-secondary hover:bg-white',
            )}
          >
            <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} />
          </button>
        )}
      </div>
      {hasChildren && open && (
        <ul className="ml-[38px] mt-1 space-y-0.5 border-l border-line pl-3">
          {item.children!.map((c) => (
            <li key={c.to}>
              <NavLink
                to={c.to}
                className={({ isActive }) =>
                  cn(
                    'block rounded-md px-2 py-1.5 text-[13px] transition-colors',
                    isActive ? 'font-semibold text-brand-navy' : 'text-ink-secondary hover:text-brand-navy',
                  )
                }
              >
                {c.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export function Sidebar() {
  const { collapsed, toggle } = useLayout();
  return (
    <aside
      className={cn(
        'relative flex min-h-[calc(100vh-108px)] shrink-0 flex-col self-stretch rounded-card border border-white bg-sidebar-gradient shadow-soft transition-[width] duration-200',
        collapsed ? 'w-[72px]' : 'w-[250px]',
      )}
    >
      <button
        type="button"
        onClick={toggle}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className="absolute -right-3 top-5 z-10 grid h-6 w-6 place-items-center rounded-full border border-line bg-white text-ink-secondary shadow-soft hover:text-brand-navy"
      >
        <ChevronLeft className={cn('h-3.5 w-3.5 transition-transform', collapsed && 'rotate-180')} />
      </button>

      <nav className="px-3 pb-4 pt-4">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <SidebarItem key={item.to} item={item} collapsed={collapsed} />
          ))}
        </ul>
      </nav>

      {!collapsed && (
        <div className="mt-auto p-3">
          <CreditsCard left={8800} used={16200} total={25000} />
        </div>
      )}
    </aside>
  );
}
