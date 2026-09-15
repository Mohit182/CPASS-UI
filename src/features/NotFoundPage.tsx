import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { Button } from '@/components/ui';

export function NotFoundPage() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div className="text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-cream text-brand-orange">
          <Compass className="h-7 w-7" />
        </span>
        <h1 className="mt-4 font-display text-[28px] font-bold text-ink">Page not found</h1>
        <p className="mt-1 text-[14px] text-ink-secondary">The page you are looking for does not exist or has moved.</p>
        <Link to="/dashboard" className="mt-6 inline-block">
          <Button>Back to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
