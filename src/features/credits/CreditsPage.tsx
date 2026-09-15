import { ArrowDownLeft, ArrowUpRight, CircleDollarSign } from 'lucide-react';
import { PageHeader } from '@/components/layout';
import { Button, Card, CardHeader, DarkCard, DataTable, StatusBadge, type Column } from '@/components/ui';
import { CountCard, FilterBar } from '@/components/patterns';
import { credits } from '@/data/dashboard';
import { formatNumber } from '@/lib/format';

interface LedgerRow {
  id: string;
  date: string;
  type: 'Credit' | 'Debit';
  description: string;
  amount: number;
  balance: number;
  status: 'Completed' | 'Pending';
}

const ledger: LedgerRow[] = [
  { id: 'l1', date: '2026-09-14 10:12', type: 'Debit', description: 'Campaign — Diwali Offer Blast', amount: 1200, balance: 16200, status: 'Completed' },
  { id: 'l2', date: '2026-09-12 16:40', type: 'Debit', description: 'Campaign — OTP Login Flow', amount: 800, balance: 17400, status: 'Completed' },
  { id: 'l3', date: '2026-09-10 09:05', type: 'Credit', description: 'Top-up — Invoice #GT-2091', amount: 10000, balance: 18200, status: 'Completed' },
  { id: 'l4', date: '2026-09-08 13:22', type: 'Debit', description: 'Campaign — EMI Due Reminder', amount: 1500, balance: 8200, status: 'Completed' },
  { id: 'l5', date: '2026-09-07 11:00', type: 'Credit', description: 'Top-up — Invoice #GT-2088', amount: 5000, balance: 9700, status: 'Pending' },
];

const cols: Column<LedgerRow>[] = [
  { key: 'date', header: 'Date' },
  {
    key: 'type',
    header: 'Type',
    render: (r) => (
      <span className={`inline-flex items-center gap-1 font-medium ${r.type === 'Credit' ? 'text-status-success' : 'text-status-danger'}`}>
        {r.type === 'Credit' ? <ArrowDownLeft className="h-3.5 w-3.5" /> : <ArrowUpRight className="h-3.5 w-3.5" />}
        {r.type}
      </span>
    ),
  },
  { key: 'description', header: 'Description', align: 'left' },
  { key: 'amount', header: 'Credits', render: (r) => formatNumber(r.amount) },
  { key: 'balance', header: 'Balance', render: (r) => formatNumber(r.balance) },
  { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
];

export function CreditsPage() {
  const used = credits.total - credits.remaining;
  return (
    <>
      <PageHeader title="Credits" subtitle="Balance, usage and top-up history." />
      <div className="mb-5 grid gap-5 xl:grid-cols-[1fr_2fr]">
        <DarkCard className="flex flex-col justify-between p-6">
          <div className="flex items-start justify-between">
            <p className="text-[14px] text-white/85">Available credits</p>
            <span className="grid h-8 w-8 place-items-center rounded-full border border-white/40">
              <CircleDollarSign className="h-4 w-4" />
            </span>
          </div>
          <p className="mt-2 font-display text-[40px] font-bold leading-none text-brand-orange">{formatNumber(credits.remaining)}</p>
          <div className="mt-4 h-[4px] w-full overflow-hidden rounded-full bg-white/25">
            <div className="h-full rounded-full bg-white" style={{ width: `${Math.round((used / credits.total) * 100)}%` }} />
          </div>
          <p className="mt-2 text-[12px] text-white/70">
            {formatNumber(used)} of {formatNumber(credits.total)} used this month
          </p>
          <Button variant="cta" block className="mt-5">
            Buy More Credits
          </Button>
        </DarkCard>
        <div className="grid grid-cols-3 gap-5">
          <CountCard label="Monthly quota" value={credits.total} icon={<CircleDollarSign />} tone="violet" />
          <CountCard label="Used" value={used} icon={<ArrowUpRight />} tone="danger" />
          <CountCard label="Monthly left" value={credits.monthlyLeft} icon={<ArrowDownLeft />} tone="success" />
          <Card className="col-span-3 p-5">
            <CardHeader title="Validity" subtitle="Prepaid · credits expire in" />
            <p className="font-display text-[28px] font-bold text-ink">
              142 <span className="text-[14px] font-medium text-ink-secondary">days</span>
            </p>
          </Card>
        </div>
      </div>
      <FilterBar
        className="mb-5"
        filters={[
          { key: 'from', label: 'From', type: 'date', defaultValue: '01-09-2026' },
          { key: 'to', label: 'to', type: 'date', defaultValue: '15-09-2026' },
          { key: 'type', label: 'Type', type: 'select', options: ['All', 'Credit', 'Debit'], width: 'w-[120px]' },
        ]}
        onSearch={() => {}}
        onDownload={() => {}}
      />
      <DataTable columns={cols} rows={ledger} rowKey={(r) => r.id} bordered centered dense />
    </>
  );
}
export default CreditsPage;
