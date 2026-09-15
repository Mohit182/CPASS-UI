import { useState, type FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, MessageCircle, MessageSquare, MessagesSquare, Mail, User } from 'lucide-react';
import { useAuth } from '@/app/providers';
import { Logo } from '@/components/layout';
import { cn } from '@/lib/cn';

/** One of the four channel tiles orbiting the infinity hub. */
function ChannelTile({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('absolute grid h-[104px] w-[104px] place-items-center rounded-[22px] bg-[#EEEBFA] shadow-[0_18px_40px_rgba(0,0,0,0.35)]', className)}>
      <div className="grid h-[68px] w-[68px] place-items-center rounded-full bg-white shadow-[inset_0_0_0_6px_#F5F3FC]">{children}</div>
    </div>
  );
}

/** Connector dot + arrow between a tile and the hub. */
function Connector({ className, dir }: { className?: string; dir: 'up' | 'down' | 'left' | 'right' }) {
  const rotate = { up: 'rotate-0', down: 'rotate-180', left: '-rotate-90', right: 'rotate-90' }[dir];
  return (
    <div className={cn('absolute flex flex-col items-center', rotate, className)}>
      <span className="h-1.5 w-[4px] bg-[#6C4DFF]" />
      <svg width="20" height="12" viewBox="0 0 20 12" aria-hidden>
        <path d="M10 0 L20 12 H0 Z" fill="#6C4DFF" />
      </svg>
      <span className="mt-1 grid h-7 w-7 place-items-center rounded-full bg-[#6C4DFF]">
        <span className="h-3 w-3 rounded-full bg-white" />
      </span>
    </div>
  );
}

function Illustration() {
  return (
    <div className="relative mx-auto h-[420px] w-[420px]">
      {/* hub */}
      <div className="absolute left-1/2 top-1/2 grid h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-[#0F0C2E] shadow-[0_0_60px_rgba(108,77,255,0.35)]">
        <svg viewBox="0 0 120 60" className="h-14 w-24" aria-hidden>
          <defs>
            <linearGradient id="inf" x1="0" x2="1">
              <stop offset="0" stopColor="#5EEAD4" />
              <stop offset="0.5" stopColor="#6C4DFF" />
              <stop offset="1" stopColor="#FACC15" />
            </linearGradient>
          </defs>
          <path
            d="M30 30c0-11 8-19 18-19 14 0 22 38 36 38 10 0 18-8 18-19s-8-19-18-19c-14 0-22 38-36 38-10 0-18-8-18-19z"
            fill="none"
            stroke="url(#inf)"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <ChannelTile className="left-1/2 top-0 -translate-x-1/2">
        <MessageCircle className="h-9 w-9 text-[#25D366]" strokeWidth={2.2} />
      </ChannelTile>
      <Connector dir="down" className="left-1/2 top-[104px] -translate-x-1/2" />

      <ChannelTile className="bottom-0 left-1/2 -translate-x-1/2">
        <Mail className="h-9 w-9 text-[#EA4335]" strokeWidth={2.2} />
      </ChannelTile>
      <Connector dir="up" className="bottom-[104px] left-1/2 -translate-x-1/2" />

      <ChannelTile className="left-0 top-1/2 -translate-y-1/2">
        <MessageSquare className="h-9 w-9 text-[#1A73E8]" strokeWidth={2.2} fill="#1A73E8" />
      </ChannelTile>
      <Connector dir="right" className="left-[104px] top-1/2 -translate-y-1/2" />

      <ChannelTile className="right-0 top-1/2 -translate-y-1/2">
        <MessagesSquare className="h-9 w-9 text-[#3B82F6]" strokeWidth={2.2} />
      </ChannelTile>
      <Connector dir="left" className="right-[104px] top-1/2 -translate-y-1/2" />
    </div>
  );
}

const inputCls =
  'h-12 w-full rounded-lg border border-line bg-white pl-11 pr-4 text-[15px] text-ink placeholder:text-ink-faint focus:border-brand-navy/40 focus:outline-none focus:ring-2 focus:ring-brand-navy/10';

export function LoginPage() {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accepted, setAccepted] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (user) return <Navigate to="/dashboard" replace />;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) return setError('Enter your User ID and password.');
    if (!accepted) return setError('Please accept the Terms & Condition.');
    signIn(email);
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="grid min-h-screen bg-[#0B0A1F] lg:grid-cols-[1.35fr_1fr]">
      {/* Left: dark illustration panel */}
      <section className="relative hidden overflow-hidden bg-[linear-gradient(160deg,#0D0B2A_0%,#1A123F_55%,#4A1F3E_100%)] lg:block">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.35) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
        <Logo tone="dark" size="lg" className="absolute left-14 top-12" />
        <div className="flex h-full items-center justify-center">
          <Illustration />
        </div>
      </section>

      {/* Right: form panel */}
      <section className="flex items-center bg-white px-8 py-12 sm:px-14 lg:rounded-l-[48px] lg:px-16">
        <form onSubmit={onSubmit} className="mx-auto w-full max-w-[440px]">
          <Logo className="mb-10 lg:hidden" />
          <h1 className="font-display text-[36px] font-bold text-ink">Sign in</h1>
          <p className="mt-1 text-[15px] text-ink-secondary">Use your Growtele console credentials to continue.</p>

          <div className="mt-10 space-y-6">
            <label className="block">
              <span className="mb-2 block text-[15px] font-medium text-ink">User ID</span>
              <span className="relative block">
                <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
                <input
                  type="email"
                  autoComplete="username"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputCls}
                />
              </span>
            </label>

            <label className="block">
              <span className="mb-2 block text-[15px] font-medium text-ink">Password</span>
              <span className="relative block">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
                <input
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputCls}
                />
              </span>
            </label>

            <div className="flex items-center justify-between text-[12px]">
              <label className="flex cursor-pointer items-center gap-2 text-ink">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="h-4 w-4 rounded border-line accent-brand-navy"
                />
                I accept the Terms &amp; Condition
              </label>
              <a href="#" className="text-[#3B5BDB] hover:underline">
                Forgot password?
              </a>
            </div>
          </div>

          {error && <p className="mt-4 text-[13px] text-status-danger">{error}</p>}

          <button
            type="submit"
            className="mt-12 flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-brand-gradient text-[16px] font-medium text-white shadow-card transition hover:brightness-110"
          >
            Tap to Sign in <ArrowRight className="h-5 w-5" />
          </button>
        </form>
      </section>
    </div>
  );
}

export default LoginPage;
