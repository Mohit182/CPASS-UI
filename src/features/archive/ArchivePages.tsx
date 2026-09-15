import { CheckCircle2, Download as DownloadIcon, FolderOpen, FileDown, Info, MessageSquareText, Search, XCircle } from 'lucide-react';
import { useCollapsedSidebar } from '@/app/providers';
import { Button, Card, DataTable, DateInput, FormField, Input, Select, type Column } from '@/components/ui';
import { HeroTabs, StatCard } from '@/components/patterns';
import { archiveRows } from '@/data/fixtures';
import { kpis } from '@/data/dashboard';
import type { ArchiveRow } from '@/data/types';

const TABS = [
  { to: '/archive/view', title: 'View Archive', subtitle: 'Manage Archived Campaigns in One Place', icon: <FolderOpen />, tone: 'orange' as const },
  { to: '/archive/download', title: 'Download Archive', subtitle: 'Download Archived Campaign Data', icon: <FileDown />, tone: 'info' as const },
];

const ts = (iso: string) => iso.replace('T', ' ');

const viewCols: Column<ArchiveRow>[] = [
  { key: 'user', header: 'User Name & ID', render: () => 'Growtele (2071)' },
  { key: 'msg', header: 'Msg ID', render: () => '3HwjPFfSuqicYcBJINdL7RmW2vN' },
  { key: 'header', header: 'Header', render: () => 'GRWTEL' },
  { key: 'api', header: 'API Key', render: (_r, i) => (i === 0 ? '' : '-') },
  { key: 'mobile', header: 'Mobile', render: () => '8826896286' },
  { key: 'received', header: 'Recieved Time', render: (r) => ts(r.archivedAt) },
  { key: 'submit', header: 'Submit Time', render: (r) => ts(r.archivedAt) },
  { key: 'delivery', header: 'Delivery Time', render: (r) => ts(r.archivedAt).replace(':29', ':31') },
  { key: 'message', header: 'Message', render: () => <span className="inline-flex items-center gap-1">Your OTP f... <Info className="h-3 w-3 text-ink-faint" /></span> },
  { key: 'type', header: 'Type', render: () => 'Normal' },
  { key: 'credit', header: 'Credit', render: (r) => r.records },
  { key: 'status', header: 'Status', render: () => 'Delivered' },
  { key: 'error', header: 'Error Code', render: () => '000' },
];

export function ViewArchivePage() {
  useCollapsedSidebar();
  return (
    <>
      <HeroTabs items={TABS} className="mx-auto max-w-[900px]" />
      <Card className="mb-5 p-5">
        <div className="flex flex-wrap items-end gap-3">
          <FormField label="User Name & ID" className="w-[220px]"><Input defaultValue="Growtele(2071)" /></FormField>
          <FormField label="From" className="w-[200px]"><DateInput defaultValue="10-08-2026" /></FormField>
          <FormField label="to" className="w-[200px]"><DateInput defaultValue="10-08-2026" /></FormField>
          <Button icon={<Search />}>Search</Button>
          <Button variant="outline" size="sm" icon={<DownloadIcon />}>Download File</Button>
        </div>
        <div className="mt-4 flex flex-wrap items-end gap-3">
          <FormField label="Msg ID" className="w-[220px]"><Input placeholder="Enter Msg ID" /></FormField>
          <FormField label="Header ID" className="w-[200px]"><Input placeholder="Enter Header ID" /></FormField>
          <FormField label="Channel" className="w-[160px]"><Select options={['all', 'web', 'api', 'smpp']} /></FormField>
          <FormField label="Limit" className="w-[160px]"><Select options={['5', '20', '50']} /></FormField>
          <FormField label="Page No" required className="w-[160px]"><Select options={['1', '2', '3']} /></FormField>
        </div>
        <div className="mt-5 grid grid-cols-4 gap-5 pr-[200px]">
          <StatCard label="SMS Submitted" icon={<MessageSquareText />} tone="violet" {...kpis.submitted} />
          <StatCard label="Delivered" icon={<CheckCircle2 />} tone="success" {...kpis.delivered} />
          <StatCard label="Failed" icon={<XCircle />} tone="danger" {...kpis.failed} />
          <StatCard label="Pending" icon={<DownloadIcon />} tone="info" {...kpis.pending} />
        </div>
      </Card>
      <DataTable columns={viewCols} rows={archiveRows} rowKey={(r) => r.id} bordered dense />
    </>
  );
}

export const downloadCols: Column<{ id: string }>[] = [
  { key: 'req', header: 'Request Time' },
  { key: 'created', header: 'File Creation Time' },
  { key: 'type', header: 'Report Type | DocType' },
  { key: 'file', header: 'File Name' },
  { key: 'filters', header: 'Filters' },
  { key: 'status', header: 'Status' },
  { key: 'download', header: 'Download' },
];

export function DownloadArchivePage() {
  useCollapsedSidebar();
  const blank = Array.from({ length: 5 }, (_, i) => ({ id: String(i) }));
  return (
    <>
      <HeroTabs items={TABS} className="mx-auto max-w-[980px]" />
      <DataTable columns={downloadCols.map((c) => ({ ...c, render: () => ' ' }))} rows={blank} rowKey={(r) => r.id} bordered centered />
    </>
  );
}
