import { Download as DownloadIcon, FileDown, FolderDown, Search } from 'lucide-react';
import { useCollapsedSidebar } from '@/app/providers';
import { Button, Card, DataTable, DateInput, FormField, Input, Select, type Column } from '@/components/ui';
import { DualListPicker, HeroTabs } from '@/components/patterns';
import { downloadJobs, dynamicReportColumns } from '@/data/fixtures';
import type { DownloadJob } from '@/data/types';

const TABS = [
  { to: '/download/data', title: 'Download Data', subtitle: 'Download Your Data Quickly and Easily Anytime', icon: <FolderDown />, tone: 'orange' as const },
  { to: '/download/dynamic', title: 'Dynamic Download Report', subtitle: 'Download Archived Campaign Data', icon: <FileDown />, tone: 'info' as const },
];

const cols: Column<DownloadJob>[] = [
  { key: 'requestedAt', header: 'Request Time', render: (r) => r.requestedAt.replace('T', ' ') },
  { key: 'created', header: 'File Creation Time', render: () => '' },
  { key: 'name', header: 'Report Type | DocType' },
  { key: 'file', header: 'File Name', render: () => '' },
  { key: 'range', header: 'Filters', render: (r) => <span className="whitespace-pre-line text-[11px]">{r.range}</span> },
  { key: 'status', header: 'Status', align: 'center', render: (r) => (r.status === 'Completed' ? 'Success' : 'failed') },
  { key: 'download', header: 'Download', render: () => '' },
];

export function DownloadDataPage() {
  useCollapsedSidebar();
  return (
    <>
      <HeroTabs items={TABS} className="mx-auto max-w-[900px]" />
      <DataTable columns={cols} rows={downloadJobs} rowKey={(r) => r.id} bordered />
    </>
  );
}

export function DynamicReportPage() {
  useCollapsedSidebar();
  return (
    <>
      <HeroTabs items={TABS} className="mx-auto max-w-[980px]" />
      <div className="mb-3 flex justify-end gap-2">
        <Button icon={<Search />}>Search</Button>
        <Button variant="outline" size="sm" icon={<DownloadIcon />}>Download File</Button>
      </div>
      <Card className="p-5">
        <div className="grid grid-cols-5 gap-4">
          <FormField label="User Name & ID"><Input defaultValue="Growtele(2071)" /></FormField>
          <FormField label="From"><DateInput defaultValue="10-08-2026" /></FormField>
          <FormField label="to"><DateInput defaultValue="10-08-2026" /></FormField>
          <FormField label="Msg ID"><Input placeholder="Enter Msg ID" /></FormField>
          <FormField label="Seperator"><Select options={['Comma(,)', 'Pipe(|)', 'Tab']} /></FormField>
        </div>
        <div className="mt-4 grid grid-cols-7 gap-4">
          <FormField label="Error Code Fillter"><Select options={['all', 'Delivered', 'Failed']} /></FormField>
          <FormField label="Telco/Porter Name"><Input placeholder="Search by Telco/Po....." /></FormField>
          <FormField label="Template ID"><Input placeholder="Enter Template ID" /></FormField>
          <FormField label="Campaign ID"><Input placeholder="Enter Campaign ID" /></FormField>
          <FormField label="Mobile" required><Input placeholder="Enter Mobile" /></FormField>
          <FormField label="Header ID"><Input placeholder="Enter Header ID" /></FormField>
          <FormField label="Status"><Select options={['All', 'Delivered', 'Failed', 'Pending']} /></FormField>
        </div>
      </Card>
      <Card className="mt-5 p-8">
        <DualListPicker available={dynamicReportColumns} labels={{ available: 'Available columns', selected: 'Selected columns' }} className="mx-auto max-w-[760px]" />
      </Card>
    </>
  );
}
