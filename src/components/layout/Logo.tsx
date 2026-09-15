import { cn } from '@/lib/cn';

interface LogoProps {
  className?: string;
  /** `dark` renders a white wordmark for use on gradient backgrounds. */
  tone?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

const sizes = { sm: 'text-xl', md: 'text-[26px]', lg: 'text-[32px]' };

/** Growtele wordmark — the "o" is replaced by the orange chat-bubble mark. */
export function Logo({ className, tone = 'light', size = 'md' }: LogoProps) {
  const text = tone === 'dark' ? 'text-white' : 'text-brand-navy';
  return (
    <span
      className={cn(
        'inline-flex select-none items-center font-display font-extrabold leading-none tracking-tight',
        sizes[size],
        text,
        className,
      )}
      aria-label="growtele"
    >
      gr
      <svg viewBox="0 0 24 24" className="-mx-[0.04em] inline-block h-[0.82em] w-[0.82em] -translate-y-[0.05em]" aria-hidden>
        <defs>
          <linearGradient id="gt-mark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFA43B" />
            <stop offset="1" stopColor="#F26B21" />
          </linearGradient>
        </defs>
        <path
          d="M12 2.5c5 0 9 3.6 9 8.3 0 4.7-4 8.3-9 8.3-.9 0-1.8-.1-2.6-.3L5 21.5l.9-3.8C4.1 16.2 3 13.6 3 10.8 3 6.1 7 2.5 12 2.5z"
          fill="url(#gt-mark)"
        />
        <path d="M12 6.5l3.5 5h-7l3.5-5z" fill="#fff" />
        <circle cx="12" cy="13.5" r="1.4" fill="#fff" />
      </svg>
      wtele
    </span>
  );
}
