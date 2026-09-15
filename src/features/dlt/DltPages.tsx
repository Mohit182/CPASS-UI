import { useState, type ReactNode } from 'react';
import { CheckCircle2, Download, FileText, Globe, IdCard, LayoutList, Link as LinkIcon, Megaphone, Search, Trash2, Upload, XCircle } from 'lucide-react';
import { Button, Card, DataTable, FileDropzone, FormField, IconButton, IdCardIllustration, Input, Modal, Select, StatusBadge, Textarea, type Column } from '@/components/ui';
import { ActionCell, CountCard, HeroTabs, OptionPicker } from '@/components/patterns';
import { dltTemplateEntity, dltTemplates, entityIds, senderIds, shortUrls } from '@/data/fixtures';
import type { DltTemplate, EntityId, SenderId, ShortUrl } from '@/data/types';

const TABS = [
  { to: '/dlt/entity-ids', title: "Entity ID's", subtitle: 'Create and Send', icon: <IdCard />, tone: 'orange' as const },
  { to: '/dlt/sender-ids', title: "Sender ID's", subtitle: 'Send Unicode SMS', icon: <LayoutList />, tone: 'info' as const },
  { to: '/dlt/templates', title: 'Template', subtitle: 'Send Dynamic SMS', icon: <FileText />, tone: 'success' as const },
  { to: '/dlt/bulk-upload', title: 'Bulk Upload', subtitle: 'Send Multi Dynamic', icon: <Upload />, tone: 'danger' as const },
  { to: '/dlt/urls', title: 'URL', subtitle: 'View Template', icon: <Globe />, tone: 'info' as const },
];

function Counts({ noun, total = 10, active = 8, inactive = 2 }: { noun: string; total?: number; active?: number; inactive?: number }) {
  return (
    <div className="grid max-w-[760px] grid-cols-3 gap-5">
      <CountCard label={`Total ${noun}`} value={total} icon={<Megaphone />} tone="violet" />
      <CountCard label={`Active ${noun}`} value={active} icon={<CheckCircle2 />} tone="success" />
      <CountCard label={`Inactive ${noun}`} value={inactive} icon={<XCircle />} tone="danger" />
    </div>
  );
}

function AddModal({ open, onClose, title, subtitle, children }: { open: boolean; onClose: () => void; title: string; subtitle: string; children: ReactNode }) {
  return (
    <Modal open={open} onClose={onClose} title={title} subtitle={subtitle} illustration={<IdCardIllustration />}>
      {children}
    </Modal>
  );
}

export function DltPickerPage() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_1.2fr]">
      <OptionPicker
        items={[
          { to: '/dlt/entity-ids', title: 'Entity IDs', subtitle: 'Find Every Message in Seconds', icon: <IdCard />, tone: 'orange' },
          { to: '/dlt/sender-ids', title: 'Sender IDs', subtitle: 'Hour x Day Heatmap', icon: <LayoutList />, tone: 'info' },
          { to: '/dlt/templates', title: 'Template', subtitle: 'Consolidate Accounts in One View', icon: <FileText />, tone: 'success' },
          { to: '/dlt/bulk-upload', title: 'Bulk Upload', subtitle: 'Split Performance by Header', icon: <Upload />, tone: 'danger' },
          { to: '/dlt/urls', title: 'URL', subtitle: 'Track DLT Template Usage Easily', icon: <Globe />, tone: 'info' },
        ]}
      />
      <DltOrbit />
    </div>
  );
}

/** Globe with five orbiting feature bubbles (stand-in for the 3-D render). */
function DltOrbit() {
  const nodes = [
    { label: 'Entity ID', icon: <IdCard />, pos: 'left-1/2 top-2 -translate-x-1/2', tone: 'bg-brand-cream text-brand-orange' },
    { label: 'Template', icon: <FileText />, pos: 'right-6 top-[110px]', tone: 'bg-status-violetBg text-status-violet' },
    { label: 'URL', icon: <LinkIcon />, pos: 'right-10 bottom-8', tone: 'bg-status-infoBg text-status-info' },
    { label: 'Bulk Upload', icon: <Upload />, pos: 'left-10 bottom-8', tone: 'bg-status-dangerBg text-status-danger' },
    { label: 'Sender ID', icon: <LayoutList />, pos: 'left-6 top-[110px]', tone: 'bg-status-successBg text-status-success' },
  ];
  return (
    <div className="relative mx-auto h-[420px] w-full max-w-[520px]">
      <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-ink-faint/40" />
      <div className="absolute left-1/2 top-1/2 h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#8EC5FF_0%,#2F6BE0_55%,#163C8F_100%)] shadow-[0_20px_50px_rgba(47,107,224,0.35)]">
        <Globe className="absolute inset-0 m-auto h-24 w-24 text-white/70" strokeWidth={1} />
      </div>
      {nodes.map((n) => (
        <div key={n.label} className={`absolute flex flex-col items-center gap-2 ${n.pos}`}>
          <span className={`grid h-[84px] w-[84px] place-items-center rounded-full shadow-card [&>svg]:h-9 [&>svg]:w-9 ${n.tone}`}>{n.icon}</span>
          <span className="text-[13px] font-semibold text-ink">{n.label}</span>
        </div>
      ))}
    </div>
  );
}

export function EntityIdsPage() {
  const [open, setOpen] = useState(false);
  const cols: Column<EntityId>[] = [
    { key: 'entityId', header: 'Entity ID', headerClassName: 'text-[16px]' },
    { key: 'entityName', header: 'Entity Name', headerClassName: 'text-[16px]' },
    { key: 'status', header: 'Status', headerClassName: 'text-[16px]', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'action', header: 'Action', headerClassName: 'text-[16px]', render: (r) => <ActionCell toggle={r.status === 'Active'} /> },
  ];
  return (
    <>
      <HeroTabs items={TABS} />
      <div className="mb-5 flex items-end justify-between">
        <Counts noun="Entity ID's" />
        <div className="flex gap-2">
          <Button onClick={() => setOpen(true)}>+ Add Entity ID</Button>
          <Button variant="outline" size="sm" icon={<Download />}>Download File</Button>
        </div>
      </div>
      <DataTable columns={cols} rows={entityIds} rowKey={(r) => r.id} bordered centered />
      <AddModal open={open} onClose={() => setOpen(false)} title="Add Entity ID" subtitle="Add new Entity ID by filling the details below">
        <FormField label="Entity ID" required><Input placeholder="Enter Entity ID" /></FormField>
        <FormField label="Entity Name" required><Input placeholder="Enter Entity Name" /></FormField>
      </AddModal>
    </>
  );
}

export function SenderIdsPage() {
  const [open, setOpen] = useState(false);
  const cols: Column<SenderId>[] = [
    { key: 'senderId', header: 'Sender ID', headerClassName: 'text-[16px]' },
    { key: 'entityId', header: 'Entity ID', headerClassName: 'text-[16px]' },
    { key: 'approvedBy', header: 'Approved By', headerClassName: 'text-[16px]', render: (_r, i) => (i === 0 ? 'AM (1201159141994639834)' : '') },
    { key: 'approvedOn', header: 'Approved on', headerClassName: 'text-[16px]', render: () => '' },
    { key: 'status', header: 'Status', headerClassName: 'text-[16px]', render: () => 'Approved' },
    { key: 'default', header: 'Default', headerClassName: 'text-[16px]', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'action', header: 'Action', headerClassName: 'text-[16px]', render: (r) => <ActionCell toggle={r.status === 'Active'} /> },
  ];
  return (
    <>
      <HeroTabs items={TABS} />
      <div className="mb-5 flex items-end justify-between">
        <Counts noun="Headers" />
        <div className="flex gap-2">
          <Button onClick={() => setOpen(true)}>+ Add Sender ID</Button>
          <Button variant="outline" size="sm" icon={<Download />}>Download File</Button>
        </div>
      </div>
      <DataTable columns={cols} rows={senderIds} rowKey={(r) => r.id} bordered centered dense />
      <AddModal open={open} onClose={() => setOpen(false)} title="Add Sender ID" subtitle="Add new Sender ID by filling the details below">
        <FormField label="Sender ID" required><Input placeholder="Enter Sender ID" /></FormField>
        <FormField label="Entity ID" required><Select options={entityIds.map((e) => `${e.entityName} (${e.entityId})`)} placeholder="Select Entity" /></FormField>
        <FormField label="Route" required><Select options={['Promotional', 'Transactional', 'Service Implicit', 'Service Explicit']} /></FormField>
      </AddModal>
    </>
  );
}

export function TemplatesPage() {
  const [open, setOpen] = useState(false);
  const cols: Column<DltTemplate>[] = [
    { key: 'name', header: 'Template Name' },
    { key: 'senderId', header: 'Sender ID' },
    { key: 'entity', header: 'Entity ID', render: () => <span className="whitespace-pre-line">{dltTemplateEntity.replace(' (', '\n(')}</span> },
    { key: 'templateId', header: 'Template ID' },
    { key: 'content', header: 'Content' },
    { key: 'createdAt', header: 'Added On' },
    { key: 'type', header: 'Type' },
    { key: 'action', header: 'Action', align: 'center', render: () => <IconButton label="Delete" tone="danger"><Trash2 className="h-5 w-5" /></IconButton> },
  ];
  return (
    <>
      <HeroTabs items={TABS} />
      <Counts noun="Templates" total={1230} active={1180} inactive={50} />
      <Card className="my-5 flex flex-wrap items-end gap-3 p-4">
        <FormField label="Limit" className="w-[120px]"><Select options={['20', '50', '100']} /></FormField>
        <FormField label="Search Type" className="w-[120px]"><Select options={['all', 'Template ID', 'Name']} /></FormField>
        <Input placeholder="Search By Temlate ID" className="w-[180px] self-end" />
        <Button icon={<Search />}>Search</Button>
        <Button className="bg-[#B9AEC4] bg-none" onClick={() => setOpen(true)}>+Add Template</Button>
        <Button>Delete Selected</Button>
        <Button>Delete All</Button>
        <Button variant="outline" size="sm" icon={<Download />}>Download File</Button>
      </Card>
      <DataTable columns={cols} rows={dltTemplates} rowKey={(r) => r.id} selectable bordered />
      <AddModal open={open} onClose={() => setOpen(false)} title="Add Template" subtitle="Register a DLT approved template">
        <FormField label="Template Name" required><Input placeholder="Enter Template Name" /></FormField>
        <FormField label="Template ID" required><Input placeholder="Enter DLT Template ID" /></FormField>
        <FormField label="Sender ID" required><Select options={senderIds.map((s) => s.senderId)} /></FormField>
        <FormField label="Content" required><Textarea placeholder="Dear {#var#}, ..." className="min-h-[90px]" /></FormField>
      </AddModal>
    </>
  );
}

export function BulkUploadPage() {
  return (
    <>
      <HeroTabs items={TABS} />
      <Card className="max-w-[1000px] p-8">
        <div className="flex items-end gap-4">
          <FormField label="Entity ID" required className="w-[250px]"><Select options={entityIds.map((e) => e.entityName)} placeholder=" " /></FormField>
          <FormField label="Operator" required className="w-[250px]"><Select options={['JIO', 'Airtel', 'VI', 'BSNL']} placeholder=" " /></FormField>
          <div className="ml-auto flex gap-2">
            <Button size="lg">Save Template</Button>
            <Button variant="outline" icon={<Download />}>Download Sample File</Button>
          </div>
        </div>
        <FileDropzone className="mt-8" sample={false} />
      </Card>
    </>
  );
}

export function UrlsPage() {
  const [open, setOpen] = useState(false);
  const cols: Column<ShortUrl>[] = [
    { key: 'shortUrl', header: 'URL' },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'action', header: 'Action', render: () => <ActionCell /> },
  ];
  return (
    <>
      <HeroTabs items={TABS} />
      <div className="flex items-start gap-5">
        <DataTable className="flex-1 [&_thead_tr]:bg-none [&_thead_tr]:bg-white [&_thead_tr]:text-ink" columns={cols} rows={shortUrls} rowKey={(r) => r.id} selectable bordered centered emptyText="No short URLs yet." />
        <Button onClick={() => setOpen(true)}>+ Add Short URL</Button>
      </div>
      <AddModal open={open} onClose={() => setOpen(false)} title="Add Short URL" subtitle="Create a trackable short link">
        <FormField label="Name" required><Input placeholder="Enter Name" /></FormField>
        <FormField label="Long URL" required><Input placeholder="https://" /></FormField>
      </AddModal>
    </>
  );
}

