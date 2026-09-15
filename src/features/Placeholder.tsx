import { useLocation } from 'react-router-dom';
import { PageHeader } from '@/components/layout';

/** Temporary page used for every route until its real screen is built. */
export function Placeholder({ title, subtitle }: { title: string; subtitle?: string }) {
  const { pathname } = useLocation();
  return (
    <>
      <PageHeader title={title} subtitle={subtitle ?? 'Coming soon.'} />
      <div className="grid h-64 place-items-center rounded-card border border-dashed border-line bg-surface-card text-[13px] text-ink-faint">
        {pathname}
      </div>
    </>
  );
}
