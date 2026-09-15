import { CheckCircle2, Download, Megaphone, Plus, XCircle } from 'lucide-react';
import { PageHeader } from '@/components/layout';
import { Button, CellMeta, DataTable, StatusBadge, type Column } from '@/components/ui';
import { ActionCell, CountCard, ListToolbar } from '@/components/patterns';
import { campaigns } from '@/data/fixtures';
import type { Campaign } from '@/data/types';
import { formatDate, formatTime } from '@/lib/format';

const columns: Column<Campaign>[] = [
  { key: 'title', header: 'Campaign Title', align: 'center', render: (r) => r.title },
  { key: 'description', header: 'Description', align: 'center' },
  { key: 'createdAt', header: 'Created on', render: (r) => <CellMeta primary={formatDate(r.createdAt)} secondary={formatTime(r.createdAt)} /> },
  { key: 'status', header: 'Status', align: 'center', render: (r) => <StatusBadge status={r.status} /> },
  { key: 'action', header: 'Action', align: 'center', render: () => <ActionCell /> },
];

export function CampaignsPage() {
  return (
    <>
      <PageHeader back title="Campaign" subtitle="Choose a message mode, verify DLT mapping, then send or schedule." />
      <div className="mb-6 grid max-w-[760px] grid-cols-3 gap-5">
        <CountCard label="Total Campaigns Title" value={1200} icon={<Megaphone />} tone="violet" />
        <CountCard label="Active Campaigns Title" value={1000} icon={<CheckCircle2 />} tone="success" />
        <CountCard label="Inactive Campaigns Title" value={200} icon={<XCircle />} tone="danger" />
      </div>
      <ListToolbar
        searchPlaceholder="Search campaign name or description ..."
        actions={
          <>
            <Button icon={<Plus />}>Add Campaigns</Button>
            <Button>Delete All</Button>
            <Button variant="outline" size="sm" icon={<Download />}>
              Download File
            </Button>
          </>
        }
      />
      <DataTable columns={columns} rows={campaigns} rowKey={(r) => r.id} selectable bordered />
      <p className="mt-3 text-right text-[12px] text-ink-secondary">If the campaign is not run for more than 30 days, it will automatically become inactive.</p>
    </>
  );
}
export default CampaignsPage;
