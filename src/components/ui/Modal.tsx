import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Button } from './Button';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  /** Left illustration panel (SplitModal in the design). */
  illustration?: ReactNode;
  width?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const widths = { sm: 'max-w-[420px]', md: 'max-w-[560px]', lg: 'max-w-[720px]', xl: 'max-w-[960px]' };

export function Modal({ open, onClose, title, subtitle, children, footer, illustration, width = 'md', className }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#5A5A5A]/70 p-4" onMouseDown={onClose} role="dialog" aria-modal>
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className={cn(
          'w-full overflow-hidden rounded-[20px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.35)]',
          illustration ? widths[width === 'md' ? 'lg' : width] : widths[width],
          illustration && 'grid md:grid-cols-[2fr_3fr]',
          className,
        )}
      >
        {illustration && <div className="relative hidden overflow-hidden bg-brand-gradient-v md:block">{illustration}</div>}
        <div className="relative p-6">
          <button type="button" aria-label="Close" onClick={onClose} className="absolute right-4 top-4 rounded-full p-1 text-ink-faint hover:bg-surface-muted hover:text-ink">
            <X className="h-4 w-4" />
          </button>
          <h2 className="font-display text-[20px] font-bold text-ink">{title}</h2>
          {subtitle && <p className="mt-0.5 text-[12px] text-ink-secondary">{subtitle}</p>}
          <div className="mt-5 space-y-4">{children}</div>
          {footer !== null && (
            <div className="mt-6 flex items-center gap-2">
              {footer ?? (
                <>
                  <Button variant="outline" size="sm" onClick={onClose}>
                    Back
                  </Button>
                  <Button size="sm" onClick={onClose}>
                    Add
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

/** Generic illustration for split modals: hand holding an ID card, drawn in SVG. */
export function IdCardIllustration() {
  return (
    <svg viewBox="0 0 240 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="hand" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFB44D" />
          <stop offset="1" stopColor="#F58A1F" />
        </linearGradient>
      </defs>
      {/* forearm + hand */}
      <path
        d="M-20 320 C 10 250, 30 210, 60 185 C 72 175, 84 178, 84 192 L 82 205 C 96 196, 108 200, 106 212 C 118 210, 126 218, 118 228 C 128 232, 126 244, 114 248 C 104 268, 70 290, 40 320 Z"
        fill="url(#hand)"
      />
      {/* thumb */}
      <path d="M84 192 C 96 178, 116 170, 130 176 C 140 180, 138 192, 128 194 L 104 200 Z" fill="#FFC46B" />
      {/* id card */}
      <g transform="rotate(-12 150 150)">
        <rect x="95" y="105" width="130" height="82" rx="8" fill="#fff" />
        <rect x="95" y="105" width="130" height="20" rx="8" fill="#161240" />
        <rect x="95" y="115" width="130" height="10" fill="#161240" />
        <circle cx="122" cy="152" r="14" fill="#5EC8CF" />
        <circle cx="122" cy="146" r="6" fill="#F6C9A5" />
        <path d="M110 166 C 112 156, 132 156, 134 166 Z" fill="#161240" />
        <rect x="145" y="138" width="60" height="5" rx="2.5" fill="#D9D9E3" />
        <rect x="145" y="150" width="50" height="5" rx="2.5" fill="#D9D9E3" />
        <rect x="145" y="162" width="66" height="5" rx="2.5" fill="#D9D9E3" />
        <rect x="145" y="174" width="40" height="5" rx="2.5" fill="#D9D9E3" />
      </g>
    </svg>
  );
}
