import { Bell, LogOut, Search, SunMedium } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/providers';
import { Logo } from './Logo';

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('');
  return (
    <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#DCE7FF] to-[#F5D8E4] font-display text-[13px] font-bold text-brand-navy ring-2 ring-white">
      {initials}
    </span>
  );
}

export function Topbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  return (
    <header className="px-4 pt-4">
      <div className="flex h-[64px] items-center gap-6 rounded-card border border-white bg-topbar-gradient px-5 shadow-soft">
        <Logo className="w-[210px]" />

        <label className="relative hidden w-[340px] md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
          <input
            type="search"
            placeholder="Search Pages, Route.."
            className="h-9 w-full rounded-lg border border-line bg-white/80 pl-9 pr-3 text-[13px] text-ink placeholder:text-ink-faint focus:border-brand-navy/40 focus:outline-none focus:ring-2 focus:ring-brand-navy/10"
          />
        </label>

        <div className="ml-auto flex items-center gap-3">
          <button type="button" aria-label="Toggle theme" className="rounded-full p-2 text-ink-secondary hover:bg-white hover:text-brand-navy">
            <SunMedium className="h-[18px] w-[18px]" />
          </button>
          <button
            type="button"
            aria-label="Notifications"
            onClick={() => navigate('/notifications')}
            className="relative rounded-full p-2 text-ink-secondary hover:bg-white hover:text-brand-navy"
          >
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-brand-orange" />
          </button>
          <span className="mx-2 h-8 w-px bg-line" />
          <div className="flex items-center gap-3 rounded-full bg-white/60 py-1 pl-1 pr-4">
            <Avatar name={user?.name ?? 'Guest'} />
            <div className="leading-tight">
              <p className="text-[13px] font-semibold text-ink">{user?.name ?? 'Guest'}</p>
              <p className="text-[10px] text-ink-secondary">{user?.role ?? ''}</p>
            </div>
            <button
              type="button"
              aria-label="Sign out"
              onClick={() => {
                signOut();
                navigate('/login');
              }}
              className="ml-1 rounded-full p-1 text-ink-faint hover:text-status-danger"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
