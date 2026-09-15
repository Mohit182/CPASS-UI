import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Download, Eye, FolderSearch, Globe, Info, ListFilter, MousePointerClick, Search, SquarePen, Table2, XCircle, Code2, Radio } from 'lucide-react';
import { useCollapsedSidebar } from '@/app/providers';
import { Button, Card, CardHeader, DataTable, DateInput, FormField, IconButton, IconTile, Input, Select, type Column } from '@/components/ui';
import { HeatmapGrid, HeroTabs, OptionPicker } from '@/components/patterns';
import { ClickKpi, FROM_FILTER, LIMIT_FILTER, ReportPanel, TO_FILTER, USER_FILTER } from '@/components/patterns/ReportPanel';
import { ChartLegend, TrafficAreaChart } from '@/components/charts';
import { clickerDetailRows, clickerToday, misChannelRows, misHeatmap, searchRows } from '@/data/reports';
import { traffic } from '@/data/dashboard';
import { cn } from '@/lib/cn';
import { ReportHeroImage } from './ReportHeroImage';

const TABS = [
  { to: '/reports/detail/search', title: 'Search', subtitle: 'Search and Find Information', icon: <Search />, tone: 'orange' as const },
  { to: '/reports/detail/mis', title: 'MIS Report', subtitle: 'View & Analyze MIS Reports', icon: <Table2 />, tone: 'info' as const },
  { to: '/reports/detail/clicker', title: 'Clicker Data & Details', subtitle: 'View Clicker Data and Detailed', icon: <MousePointerClick />, tone: 'danger' as const, match: '/reports/detail/clicker' },
];

export function DetailPickerPage() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_1.1fr]">
      <OptionPicker
        items={[
          { to: '/reports/detail/search', title: 'Search', subtitle: 'Find Every Message in Seconds', icon: <Search />, tone: 'orange' },
          { to: '/reports/detail/mis', title: 'MIS Report', subtitle: 'Hour x Day Heatmap', icon: <Table2 />, tone: 'info' },
          { to: '/reports/detail/clicker', title: 'Clicker Details & Data', subtitle: 'Track Short Link Clicks Easily', icon: <MousePointerClick />, tone: 'danger' },
        ]}
      />
      <ReportHeroImage />
    </div>
  );
}

export function SearchReportPage() {
  useCollapsedSidebar();
  type Row = (typeof searchRows)[number];
  const cols: Column<Row>[] = [
    { key: 'user', header: 'User Name & ID' },
    { key: 'msgId', header: 'Msg ID' },
    { key: 'header', header: 'Header ID' },
    { key: 'mobile', header: 'Mobile' },
    { key: 'received', header: 'Recieved Time' },
    { key: 'submit', header: 'Submit Time' },
    { key: 'delivery', header: 'Delivery Time' },
    { key: 'message', header: 'Message', render: (r) => <span className="inline-flex items-center gap-1">{r.message} <Info className="h-3 w-3 text-ink-faint" /></span> },
    { key: 'channel', header: 'Platform Channel' },
    { key: 'status', header: 'Status' },
    { key: 'errorCode', header: 'Error Code' },
    { key: 'errorDesc', header: 'Error Description' },
  ];
  return (
    <>
      <HeroTabs items={TABS} className="max-w-[960px]" />
      <ReportPanel
        kpi={false}
        actions={null}
        filters={[
          { ...USER_FILTER, defaultValue: '' },
          FROM_FILTER,
          TO_FILTER,
          LIMIT_FILTER,
          { key: 'mobile', label: 'Mobile', type: 'text', placeholder: 'Enter Mobile Number' },
          { key: 'hdr', label: 'Header ID', type: 'text', placeholder: 'Enter Sender ID' },
          { key: 'msg', label: 'Msg ID', type: 'text', placeholder: 'Enter Msg ID', width: 'w-[130px]' },
        ]}
      />
      <div className="-mt-2 mb-4 flex justify-end gap-2">
        <Button icon={<Search />}>Search</Button>
        <Button variant="outline" size="sm" icon={<Download />}>Download File</Button>
      </div>
      <DataTable columns={cols} rows={searchRows} rowKey={(r) => r.id} bordered dense />
    </>
  );
}

const CHANNELS = [
  { key: 'web', label: 'Web', count: 5, icon: <Globe /> },
  { key: 'api', label: 'API', count: 0, icon: <Code2 /> },
  { key: 'smpp', label: 'SMPP', count: 0, icon: <Radio /> },
];

export function MisReportPage() {
  useCollapsedSidebar();
  const [view, setView] = useState<'heatmap' | 'web' | 'api' | 'smpp'>('heatmap');
  type Row = (typeof misChannelRows)[number];
  const cols: Column<Row>[] = [
    { key: 'user', header: 'User Name & ID' },
    { key: 'smsType', header: 'SMS Type' },
    { key: 'requestTime', header: 'Request Time' },
    { key: 'scheduledTime', header: 'Scheduled Time' },
    { key: 'senderId', header: 'Sender ID' },
    { key: 'source', header: 'Source' },
    { key: 'smsSource', header: 'SMS Sourcce' },
    { key: 'credits', header: 'Credits' },
    { key: 'submitCredit', header: 'Submit Credit' },
    { key: 'templates', header: 'Templates', render: () => <Info className="mx-auto h-4 w-4 text-ink-faint" /> },
    {
      key: 'action',
      header: 'Action',
      render: () => (
        <span className="inline-flex gap-1">
          <IconButton label="Edit"><SquarePen /></IconButton>
          <IconButton label="View" tone="success"><Eye /></IconButton>
        </span>
      ),
    },
  ];

  return (
    <>
      <HeroTabs items={TABS} className="max-w-[960px]" />
      {view === 'heatmap' ? (
        <Card className="p-6">
          <div className="mb-5 flex flex-wrap items-end gap-3">
            <FormField label="Use Name & User ID" className="w-[170px]"><Input placeholder="Search User" /></FormField>
            <FormField label="Month" className="w-[110px]"><DateInput defaultValue="August" /></FormField>
            <FormField label="Year" className="w-[90px]"><DateInput defaultValue="2026" /></FormField>
            <FormField label="Limit" className="w-[90px]"><Select options={['10', '20', '50']} /></FormField>
            <Button icon={<Search />} onClick={() => setView('web')}>Search</Button>
            <Button variant="outline" size="sm" icon={<Download />}>Download File</Button>
          </div>
          <HeatmapGrid data={misHeatmap} highlightDay={10} highlightHour={10} />
        </Card>
      ) : (
        <>
          <div className="mb-5 flex items-start gap-5">
            <ReportPanel className="mb-0 flex-1 border-0 bg-transparent p-0 shadow-none [&>div:last-child]:mt-0 [&>div:last-child]:pr-0" filters={[]} actions={null} />
            <ul className="w-[130px] space-y-3 pt-1">
              {CHANNELS.map((c) => (
                <li key={c.key}>
                  <button
                    type="button"
                    onClick={() => setView(c.key as typeof view)}
                    className={cn(
                      'flex w-full items-center gap-2 rounded-full border border-line bg-white px-3 py-2 text-[12px] font-medium',
                      view === c.key ? 'text-ink' : 'text-ink-faint',
                    )}
                  >
                    <IconTile size="sm" tone={view === c.key ? 'info' : 'neutral'} className="h-6 w-6 rounded-full">{c.icon}</IconTile>
                    {c.label} ({c.count})
                    {view === c.key && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-status-success" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <ReportPanel
            kpi={false}
            filters={[
              { key: 'mobile', label: 'Mobile(Optional)', type: 'text', placeholder: 'Mobile Number' },
              { key: 'hdr', label: 'Header ID (Optional)', type: 'text', placeholder: 'Enter Sender ID' },
              { key: 'cmp', label: 'Campaign Title (Optional)', type: 'text', placeholder: 'Enter Campaign Title' },
              { key: 'tpl', label: 'Template ID(Optional)', type: 'text' },
              { ...LIMIT_FILTER, defaultValue: '20' },
            ]}
          />
          <DataTable columns={cols} rows={misChannelRows} rowKey={(r) => r.id} bordered centered dense />
          <button type="button" onClick={() => setView('heatmap')} className="mt-3 text-[12px] text-ink-secondary hover:underline">
            ← Back to heatmap
          </button>
        </>
      )}
    </>
  );
}

const CLICKER_TABS = [
  { to: '/reports/detail/clicker/details', title: 'Clicker Details', subtitle: 'Track Clicker Details Easily', icon: <FolderSearch />, tone: 'orange' as const },
  { to: '/reports/detail/clicker/data', title: 'Clicker Data', subtitle: 'View Clicker Data at a Glance', icon: <ListFilter />, tone: 'info' as const },
];

const todayTones = { violet: 'violet', success: 'success', danger: 'danger', info: 'info', cyan: 'cyan' } as const;
const todayIcons = { violet: <Search />, success: <CheckCircle2 />, danger: <XCircle />, info: <Download />, cyan: <MousePointerClick /> };

export function ClickerSummaryPage() {
  return (
    <>
      <HeroTabs items={TABS} />
      <div className="mb-3 flex justify-end gap-2">
        <Button icon={<Search />}>Search</Button>
        <Button variant="outline" size="sm" icon={<Download />}>Download File</Button>
      </div>
      <ReportPanel
        actions={null}
        extraKpi={<ClickKpi />}
        filters={[
          { key: 'cmp', label: 'Campaign Name', type: 'text', defaultValue: 'Ahmad', width: 'w-[140px]' },
          FROM_FILTER,
          TO_FILTER,
          { key: 'msg', label: 'Message', type: 'text', defaultValue: 'Your OTP for GROWTELE account log in is gwtl.in/qj0gRA Thanks', width: 'w-[390px]' },
        ]}
      />
      <div className="grid gap-5 xl:grid-cols-[2fr_1fr]">
        <Card className="p-5">
          <CardHeader
            title="SMS Traffic — Submitted vs Delivered"
            subtitle="Daily volume across all routes"
            action={<ChartLegend items={[{ label: 'Sent', color: '#60A5FA' }, { label: 'Delivered', color: '#22C55E' }]} />}
          />
          <TrafficAreaChart data={traffic} height={220} />
        </Card>
        <Card className="p-5">
          <CardHeader title="Today Summary" />
          <ul className="divide-y divide-line">
            {clickerToday.map((t) => (
              <li key={t.label} className="flex items-center justify-between py-3 text-[13px]">
                <span className="flex items-center gap-3">
                  <IconTile size="sm" tone={todayTones[t.tone]} solid>{todayIcons[t.tone]}</IconTile>
                  {t.label}
                </span>
                <span className="font-semibold text-ink">{t.value}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-end gap-2">
            <Link to="/reports/detail/clicker/details" className="rounded-full border border-brand-navy/60 px-3 py-1 text-[11px] font-medium text-brand-navy hover:bg-surface-muted">Details</Link>
            <Link to="/reports/detail/clicker/data" className="rounded-full border border-brand-navy/60 px-3 py-1 text-[11px] font-medium text-brand-navy hover:bg-surface-muted">Data</Link>
          </div>
        </Card>
      </div>
    </>
  );
}

export function ClickerDetailsPage() {
  useCollapsedSidebar();
  type Row = (typeof clickerDetailRows)[number];
  const cols: Column<Row>[] = [
    { key: 'user', header: 'User Name & ID' },
    { key: 'smsType', header: 'SMS Type' },
    { key: 'campaign', header: 'Campaign Name' },
    { key: 'requestTime', header: 'Request Time' },
    { key: 'header', header: 'Header ID' },
    { key: 'source', header: 'Source' },
    { key: 'smsCount', header: 'SMS Count' },
    { key: 'credits', header: 'Credits' },
    { key: 'length', header: 'Length' },
    { key: 'message', header: 'Message', render: (r) => <span className="inline-flex items-center gap-1">{r.message} <Info className="h-3 w-3 text-ink-faint" /></span> },
    {
      key: 'action',
      header: 'Action',
      render: () => (
        <span className="inline-flex gap-1">
          <IconButton label="Filter"><ListFilter /></IconButton>
          <IconButton label="View" tone="success"><Eye /></IconButton>
        </span>
      ),
    },
  ];
  return (
    <>
      <HeroTabs items={TABS} className="max-w-[1000px]" />
      <ReportPanel kpi={false} className="max-w-[1000px]" filters={[USER_FILTER, FROM_FILTER, TO_FILTER, { ...LIMIT_FILTER, defaultValue: '20' }]} />
      <DataTable columns={cols} rows={clickerDetailRows} rowKey={(r) => r.id} bordered dense />
    </>
  );
}

export function ClickerDataPage() {
  useCollapsedSidebar();
  return (
    <>
      <HeroTabs items={CLICKER_TABS} className="max-w-[940px]" />
      <ReportPanel kpi={false} className="max-w-[980px]" downloadLabel="Download Sample File" filters={[USER_FILTER, FROM_FILTER, TO_FILTER, { ...LIMIT_FILTER, defaultValue: '20' }]} />
    </>
  );
}
