import { useState } from 'react';
import { AlertTriangle, Bell, CheckCircle2, CircleDollarSign, FileCheck2, Info } from 'lucide-react';
import { PageHeader } from '@/components/layout';
import { Button, Card, IconTile, Tabs } from '@/components/ui';
import { cn } from '@/lib/cn';

type Tone = 'success' | 'warning' | 'info' | 'danger' | 'violet';
interface Note {
  id: string;
  tone: Tone;
  title: string;
  body: string;
  time: string;
  read: boolean;
  kind: 'system' | 'campaign' | 'dlt' | 'billing';
}

const icons: Record<Tone, React.ReactNode> = {
  success: <CheckCircle2 />,
  warning: <AlertTriangle />,
  info: <Info />,
  danger: <AlertTriangle />,
  violet: <FileCheck2 />,
};

const initial: Note[] = [
  { id: 'n1', tone: 'success', title: 'Campaign completed', body: 'Diwali Offer Blast finished with 96.7% delivery.', time: '10 min ago', read: false, kind: 'campaign' },
  { id: 'n2', tone: 'violet', title: 'Template approved', body: 'DLT template 1707168447801414304 (Abr New May) was approved.', time: '1 hr ago', read: false, kind: 'dlt' },
  { id: 'n3', tone: 'warning', title: 'Credits running low', body: 'Monthly credits at 35%. Consider topping up before the next campaign.', time: '3 hr ago', read: false, kind: 'billing' },
  { id: 'n4', tone: 'info', title: 'Scrubbing sync', body: 'Scrubbing sync with TRAI portal completed today at 06:15 IST.', time: 'Today', read: true, kind: 'dlt' },
  { id: 'n5', tone: 'danger', title: 'Scheduled job failed', body: 'Schedule #6722 could not start: sender ID inactive.', time: 'Yesterday', read: true, kind: 'campaign' },
  { id: 'n6', tone: 'info', title: 'Invoice generated', body: 'Invoice GT-2091 for 10,000 credits is available to download.', time: '2 days ago', read: true, kind: 'billing' },
];

export function NotificationsPage() {
  const [notes, setNotes] = useState(initial);
  const [tab, setTab] = useState('all');
  const shown = notes.filter((n) => tab === 'all' || (tab === 'unread' ? !n.read : n.kind === tab));
  const unread = notes.filter((n) => !n.read).length;

  return (
    <>
      <PageHeader
        title="Notifications"
        subtitle={`${unread} unread`}
        actions={
          <Button variant="outline" size="sm" onClick={() => setNotes((ns) => ns.map((n) => ({ ...n, read: true })))}>
            Mark all as read
          </Button>
        }
      />
      <Card className="p-5">
        <Tabs
          className="mb-4 border-b border-line pb-3"
          value={tab}
          onChange={setTab}
          items={[
            { value: 'all', label: 'All' },
            { value: 'unread', label: 'Unread' },
            { value: 'campaign', label: 'Campaigns' },
            { value: 'dlt', label: 'DLT' },
            { value: 'billing', label: 'Billing' },
          ]}
        />
        {shown.length === 0 && (
          <div className="grid place-items-center py-16 text-ink-faint">
            <Bell className="mb-2 h-8 w-8" />
            <p className="text-[13px]">You're all caught up.</p>
          </div>
        )}
        <ul className="divide-y divide-line">
          {shown.map((n) => (
            <li key={n.id}>
              <button
                type="button"
                onClick={() => setNotes((ns) => ns.map((x) => (x.id === n.id ? { ...x, read: true } : x)))}
                className={cn('flex w-full items-start gap-4 px-2 py-4 text-left transition hover:bg-surface-page', !n.read && 'bg-brand-cream/30')}
              >
                <IconTile tone={n.tone} solid>
                  {icons[n.tone]}
                </IconTile>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="text-[14px] font-semibold text-ink">{n.title}</span>
                    {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />}
                  </span>
                  <span className="block text-[13px] text-ink-secondary">{n.body}</span>
                </span>
                <span className="shrink-0 text-[11px] text-ink-faint">{n.time}</span>
              </button>
            </li>
          ))}
        </ul>
      </Card>
      <p className="mt-3 flex items-center gap-1 text-[11px] text-ink-faint">
        <CircleDollarSign className="h-3 w-3" /> Billing alerts are also emailed to the account owner.
      </p>
    </>
  );
}
export default NotificationsPage;
