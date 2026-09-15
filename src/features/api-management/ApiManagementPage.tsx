import { useState } from 'react';
import { CheckCircle2, Megaphone, XCircle } from 'lucide-react';
import { PageHeader } from '@/components/layout';
import { Button, DataTable, FormField, IdCardIllustration, Input, Modal, Select, StatusBadge, Toggle, type Column } from '@/components/ui';
import { ActionCell, CountCard } from '@/components/patterns';
import { apiKeys } from '@/data/fixtures';
import type { ApiKey } from '@/data/types';

const cols: Column<ApiKey>[] = [
  { key: 'keyPrefix', header: 'Key' },
  { key: 'name', header: 'Account Type' },
  { key: 'password', header: 'Password', render: () => 'jFCdNjCw' },
  { key: 'description', header: 'Description', render: () => '' },
  { key: 'matchTemplate', header: 'Match Template', render: (r) => String(r.matchTemplate) },
  { key: 'status', header: 'Status', align: 'center', render: (r) => <StatusBadge status={r.status === 'ACTIVE' ? 'Active' : 'Inactive'} /> },
  { key: 'action', header: 'Action', align: 'center', render: () => <ActionCell /> },
];

export function ApiManagementPage() {
  const [open, setOpen] = useState(false);
  const [match, setMatch] = useState(false);
  return (
    <>
      <PageHeader back title="API Management" subtitle="Manage APIs, Access, Keys, and Integrations Easily" />
      <div className="mb-5 flex items-end justify-between">
        <div className="grid w-[720px] grid-cols-3 gap-5">
          <CountCard label="Total API Keys" value={10} icon={<Megaphone />} tone="violet" />
          <CountCard label="Active API Keys" value={8} icon={<CheckCircle2 />} tone="success" />
          <CountCard label="Inactive API Keys" value={2} icon={<XCircle />} tone="danger" />
        </div>
        <Button onClick={() => setOpen(true)}>+ Generate API</Button>
      </div>
      <DataTable columns={cols} rows={apiKeys} rowKey={(r) => r.id} bordered />
      <Modal open={open} onClose={() => setOpen(false)} title="Generate API" subtitle="Create a new API key for integrations" illustration={<IdCardIllustration />}
        footer={<><Button variant="outline" size="sm" onClick={() => setOpen(false)}>Back</Button><Button size="sm" onClick={() => setOpen(false)}>Generate</Button></>}>
        <FormField label="Key Name" required><Input placeholder="e.g. otp" /></FormField>
        <FormField label="Account Type" required><Select options={['Enterprise', 'Reseller', 'Platform']} /></FormField>
        <FormField label="Description"><Input placeholder="Optional description" /></FormField>
        <Toggle checked={match} onChange={setMatch} label="Match Template" />
      </Modal>
    </>
  );
}
export default ApiManagementPage;
