import { Search } from 'lucide-react';
import { useCollapsedSidebar } from '@/app/providers';
import { Button, Card, DataTable, FormField, Input, StatusBadge, type Column } from '@/components/ui';
import { ActionCell } from '@/components/patterns';
import { scheduledJobs } from '@/data/fixtures';
import type { ScheduledJob } from '@/data/types';

const cols: Column<ScheduledJob>[] = [
  { key: 'user', header: 'User Name & ID', render: () => 'Growtele(2071)' },
  { key: 'type', header: 'Type', render: () => 'Normal' },
  { key: 'smsType', header: 'SMS Type', render: () => 'Quick' },
  { key: 'campaign', header: 'Campaign Title' },
  { key: 'id', header: 'Schedule ID', render: () => '6722' },
  { key: 'senderId', header: 'Header ID' },
  { key: 'scheduledAt', header: 'Scheduled At', render: (r) => r.scheduledAt.replace('T', ' ').replace(/^(\d{4})-0?(\d+)-(\d+) (\d+:\d+):\d+$/, '$1-$2-$3 $4:0') },
  { key: 'message', header: 'Message', render: () => 'Your OTP f.......' },
  { key: 'recipients', header: 'Valid Numbers' },
  { key: 'len', header: 'Message Length', render: () => 56 },
  { key: 'credits', header: 'Credits', render: () => 6 },
  { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status === 'Scheduled' ? 'Active' : 'Inactive'} className="text-[10px]" /> },
  { key: 'action', header: 'Action', render: () => <ActionCell /> },
];

export function SchedulePage() {
  useCollapsedSidebar();
  return (
    <>
      <Card className="mb-5 flex flex-wrap items-end gap-3 p-4">
        <FormField label="User Name & ID" className="w-[190px]"><Input defaultValue="Growtele(2071)" /></FormField>
        <FormField label="Campaign Title (Optional)" className="w-[220px]"><Input placeholder="Enter Campaign Name" /></FormField>
        <Button icon={<Search />}>Search</Button>
        <div className="ml-auto flex gap-2">
          <Button variant="outline">Cancel Selected</Button>
          <Button variant="outline">Cancel All</Button>
          <Button>Delete Selected</Button>
          <Button>Delete All</Button>
        </div>
      </Card>
      <DataTable columns={cols} rows={scheduledJobs} rowKey={(r) => r.id} selectable bordered dense />
    </>
  );
}
export default SchedulePage;
