import { FileText, Rocket, ScanFace, FileSignature } from 'lucide-react';
import { useCollapsedSidebar } from '@/app/providers';
import { DataTable, type Column } from '@/components/ui';
import { HeroTabs, OptionPicker } from '@/components/patterns';
import { FROM_FILTER, LIMIT_FILTER, ReportPanel, TO_FILTER, USER_FILTER } from '@/components/patterns/ReportPanel';
import { campaignRows, headerRows, overviewRows, templateRows } from '@/data/reports';
import type { SummaryRow } from '@/data/types';
import { ReportHeroImage } from './ReportHeroImage';

const TABS = [
  { to: '/reports/summary/overview', title: 'Overview Summary', subtitle: 'View Overall Performance', icon: <FileText />, tone: 'success' as const },
  { to: '/reports/summary/header', title: 'Header Summary', subtitle: 'Header Wise Performance', icon: <ScanFace />, tone: 'danger' as const },
  { to: '/reports/summary/template', title: 'Template Wise Summary', subtitle: 'View Template Wise Report', icon: <FileSignature />, tone: 'info' as const },
  { to: '/reports/summary/campaign', title: 'Campaign Summary', subtitle: 'View Campaign Performance', icon: <Rocket />, tone: 'violet' as const },
];

export function SummaryPickerPage() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_1.1fr]">
      <OptionPicker
        items={[
          { to: '/reports/summary/overview', title: 'Overview Summary', subtitle: 'Consolidate Accounts in One View', icon: <FileText />, tone: 'success' },
          { to: '/reports/summary/header', title: 'Header ID Summary', subtitle: 'Split Performance by Header', icon: <ScanFace />, tone: 'danger' },
          { to: '/reports/summary/template', title: 'Template Wise Summary', subtitle: 'Track DLT Template Usage Easily', icon: <FileSignature />, tone: 'info' },
          { to: '/reports/summary/campaign', title: 'Campaign Summary', subtitle: 'Track Batch Performance at a Glance', icon: <Rocket />, tone: 'violet' },
        ]}
      />
      <ReportHeroImage />
    </div>
  );
}

const pct = (a: number, b: number) => `(${b ? Math.round((a / b) * 1000) / 10 : 0}%)`;

const kpiCols = <T extends SummaryRow>(): Column<T>[] => [
  { key: 'submitted', header: 'Submitted' },
  { key: 'submittedCredits', header: 'Submitted Credits' },
  { key: 'delivered', header: 'Delivered' },
  { key: 'deliveredCredits', header: 'Delivered Credits' },
  { key: 'failed', header: 'Failed' },
  { key: 'failedCredits', header: 'Failed Credits' },
  { key: 'pending', header: 'Pending' },
  { key: 'pendingCredits', header: 'Pending Credits' },
];

export function OverviewSummaryPage() {
  useCollapsedSidebar();
  const cols: Column<SummaryRow>[] = [
    { key: 'date', header: 'Date', align: 'left' },
    { key: 'channel', header: 'Platform Channel' },
    { key: 'submitted', header: 'Submit' },
    { key: 'submittedCredits', header: 'Submitted Credits' },
    { key: 'delivered', header: 'Delivered' },
    { key: 'deliveredCredits', header: 'Delivered Credits' },
    { key: 'deliverPct', header: 'Deliver %', render: (r) => pct(r.delivered, r.submitted) },
    { key: 'failed', header: 'Failed' },
    { key: 'failedCredits', header: 'Failed Credits' },
    { key: 'failedPct', header: 'Failed %', render: (r) => pct(r.failed, r.submitted) },
    { key: 'pending', header: 'Pending' },
    { key: 'pendingCredits', header: 'Pending Credits' },
    { key: 'pendingPct', header: 'Pending %', render: () => '(0.0%)' },
  ];
  const t = overviewRows.reduce((a, r) => ({ s: a.s + r.submitted, d: a.d + r.delivered, f: a.f + r.failed }), { s: 0, d: 0, f: 0 });
  return (
    <>
      <HeroTabs items={TABS} />
      <ReportPanel filters={[USER_FILTER, FROM_FILTER, TO_FILTER, { key: 'src', label: 'Data Source', type: 'select', options: ['all', 'web', 'api', 'smpp'], width: 'w-[100px]' }]} />
      <DataTable
        columns={cols}
        rows={overviewRows}
        rowKey={(r) => r.id}
        bordered
        centered
        dense
        footer={
          <tr className="text-[13px]">
            <td className="border-r border-line px-3 py-3 text-left">Total</td>
            <td className="border-r border-line" />
            <td className="border-r border-line text-center">{t.s}</td>
            <td className="border-r border-line text-center">{t.s}</td>
            <td className="border-r border-line text-center">{t.d}</td>
            <td className="border-r border-line text-center">{t.d}</td>
            <td className="border-r border-line text-center">{pct(t.d, t.s)}</td>
            <td className="border-r border-line" />
            <td className="border-r border-line text-center">{t.f}</td>
            <td className="border-r border-line text-center">{pct(t.f, t.s)}</td>
            <td className="border-r border-line text-center">0</td>
            <td className="border-r border-line text-center">0</td>
            <td className="text-center">(0.0 %)</td>
          </tr>
        }
      />
    </>
  );
}

export function HeaderSummaryPage() {
  useCollapsedSidebar();
  const cols: Column<SummaryRow>[] = [
    { key: 'user', header: 'User Name & ID', align: 'left', render: () => 'Growtele (2071)' },
    { key: 'date', header: 'Date' },
    { key: 'header', header: 'Header ID' },
    ...kpiCols<SummaryRow>(),
  ];
  return (
    <>
      <HeroTabs items={TABS} />
      <ReportPanel filters={[USER_FILTER, FROM_FILTER, TO_FILTER, { key: 'hdr', label: 'Header ID', type: 'text', placeholder: 'Enter Header ID' }, { ...LIMIT_FILTER, defaultValue: '100' }]} />
      <DataTable columns={cols} rows={headerRows} rowKey={(r) => r.id} bordered centered dense />
    </>
  );
}

export function TemplateSummaryPage() {
  useCollapsedSidebar();
  const cols: Column<SummaryRow>[] = [
    { key: 'user', header: 'User Name & ID', align: 'left', render: () => 'Growtele (2071)' },
    { key: 'date', header: 'Date' },
    { key: 'header', header: 'Header ID' },
    { key: 'template', header: 'Template ID' },
    ...kpiCols<SummaryRow>(),
  ];
  return (
    <>
      <HeroTabs items={TABS} />
      <ReportPanel filters={[USER_FILTER, FROM_FILTER, TO_FILTER, { key: 'tpl', label: 'Template ID', type: 'text', placeholder: 'Enter Template ID' }, { ...LIMIT_FILTER, defaultValue: '100' }]} />
      <DataTable columns={cols} rows={templateRows} rowKey={(r) => r.id} bordered centered dense />
    </>
  );
}

export function CampaignSummaryPage() {
  useCollapsedSidebar();
  type Row = (typeof campaignRows)[number];
  const cols: Column<Row>[] = [
    { key: 'user', header: 'User Name & ID', align: 'left', render: () => 'Growtele (2071)' },
    { key: 'messageType', header: 'Message Type' },
    { key: 'campaign', header: 'Campaign Title' },
    { key: 'date', header: 'Submit Time', render: (r) => r.date.replace('T', ' ') },
    { key: 'header', header: 'Header ID' },
    { key: 'message', header: 'Message' },
    ...kpiCols<Row>(),
  ];
  return (
    <>
      <HeroTabs items={TABS} />
      <ReportPanel filters={[USER_FILTER, FROM_FILTER, TO_FILTER, { key: 'cmp', label: 'Campaign Name', type: 'text', placeholder: 'Search by Campaign Name/ID' }, { ...LIMIT_FILTER, defaultValue: '100' }]} />
      <DataTable columns={cols} rows={campaignRows} rowKey={(r) => r.id} bordered centered dense />
    </>
  );
}
