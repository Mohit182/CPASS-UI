import type { ReactNode } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/cn';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  /** Show the back chevron; `true` navigates back, a string navigates to that path. */
  back?: boolean | string;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({ title, subtitle, back, actions, className }: PageHeaderProps) {
  const navigate = useNavigate();
  return (
    <div className={cn('mb-6 flex items-start justify-between gap-4', className)}>
      <div className="flex items-start gap-2">
        {back && (
          <button
            type="button"
            aria-label="Go back"
            onClick={() => (typeof back === 'string' ? navigate(back) : navigate(-1))}
            className="mt-2 rounded-full p-1 text-ink hover:bg-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        <div>
          <h1 className="font-display text-[28px] font-bold leading-tight text-ink">{title}</h1>
          {subtitle && <p className="mt-1 text-[15px] text-ink-secondary">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="flex shrink-0 items-center gap-3">{actions}</div>}
    </div>
  );
}
