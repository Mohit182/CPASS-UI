import { useState, type ReactNode } from 'react';
import { ChevronLeft, Info, UserRound } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Button, Checkbox, DarkCard } from '@/components/ui';

/** Dark stats card: Invalid / Blacklist / Duplicate / Valid / Total credits. */
export function RecipientStats({
  rows = [
    ['Invalid Number', 1],
    ['Blacklist Number', 0],
    ['Duplicate Number', 0],
    ['Valid Number', 2],
    ['Total Required SMS Credits', 2],
  ],
  className,
}: {
  rows?: [string, number][];
  className?: string;
}) {
  return (
    <DarkCard className={cn('p-5', className)}>
      <dl className="divide-y divide-white/10">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between py-2.5 text-[15px]">
            <dt className="text-white/90">{k}</dt>
            <dd className="font-semibold">{v}</dd>
          </div>
        ))}
      </dl>
    </DarkCard>
  );
}

/** iPhone mock showing the SMS preview bubble. */
export function PhonePreview({ sender = 'GRWTEL', message, time = '11:20 AM', className }: { sender?: string; message: string; time?: string; className?: string }) {
  return (
    <div className={cn('mx-auto w-[250px] overflow-hidden rounded-[36px] border-[8px] border-[#111] bg-[#F5F5F7] shadow-card', className)}>
      <div className="flex items-center justify-between px-4 pt-2 text-[10px] font-semibold text-ink">
        <span>11:20</span>
        <span className="h-4 w-14 rounded-full bg-[#111]" />
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-3 rounded-sm bg-ink" />
          <span className="inline-block h-2 w-4 rounded-sm bg-ink" />
        </span>
      </div>
      <div className="mt-1 flex flex-col items-center border-b border-line pb-2">
        <ChevronLeft className="absolute left-5 mt-3 h-4 w-4 text-[#1A73E8]" />
        <span className="grid h-9 w-9 place-items-center rounded-full bg-ink-faint text-white">
          <UserRound className="h-5 w-5" />
        </span>
        <span className="mt-1 text-[10px] font-semibold text-ink">{sender} ›</span>
      </div>
      <div className="px-3 pb-6 pt-3">
        <p className="text-center text-[8px] text-ink-secondary">
          Text Message
          <br />
          Today, {time}
        </p>
        <div className="mt-2 rounded-2xl rounded-bl-sm bg-[#E9E9EB] px-3 py-2 text-[11px] leading-snug text-ink">
          {message || 'Your message preview will appear here.'}
        </div>
        <p className="mt-1 text-right text-[8px] text-ink-secondary">{time}</p>
      </div>
    </div>
  );
}

export interface SendOption {
  key: string;
  label: string;
  info?: boolean;
  defaultChecked?: boolean;
}

/** Bottom checkbox strip on compose pages. */
export function SendOptionsBar({
  options,
  actions,
  className,
}: {
  options: SendOption[];
  actions?: ReactNode;
  className?: string;
}) {
  const [state, setState] = useState<Record<string, boolean>>(() => Object.fromEntries(options.map((o) => [o.key, !!o.defaultChecked])));
  return (
    <div className={cn('flex flex-wrap items-center gap-x-6 gap-y-3 rounded-card border border-white bg-surface-card px-5 py-4 shadow-card', className)}>
      {options.map((o) => (
        <Checkbox
          key={o.key}
          checked={state[o.key]}
          onChange={(e) => setState((s) => ({ ...s, [o.key]: e.target.checked }))}
          className="[&>input]:accent-brand-navy"
          label={
            <span className="inline-flex items-center gap-1 text-[11px]">
              {o.label}
              {o.info && <Info className="h-3 w-3 text-ink-faint" />}
            </span>
          }
        />
      ))}
      {actions && <div className="ml-auto flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export const DEFAULT_SEND_OPTIONS: SendOption[] = [
  { key: 'dedupe', label: 'Remove Duplicate Numbers', info: true, defaultChecked: true },
  { key: 'invalid', label: 'Remove Invalid Numbers', info: true, defaultChecked: true },
  { key: 'multipart', label: 'Allow Multi Part SMS', info: true },
  { key: 'flash', label: 'Send as Flash SMS', info: true },
  { key: 'schedule', label: 'Schedule SMS' },
  { key: 'dnd', label: 'Scrub DND' },
  { key: 'recurrence', label: 'Recurrence' },
];

export function SendActions() {
  return (
    <>
      <Button variant="outline" size="sm">
        Cancel
      </Button>
      <Button size="sm">Send</Button>
    </>
  );
}
