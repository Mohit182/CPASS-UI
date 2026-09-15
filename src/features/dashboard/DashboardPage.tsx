import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronRight, FileText, MessageSquareText, ShieldCheck, Upload, Users, XCircle, Download as DownloadIcon } from 'lucide-react';
import { CreditsPill } from '@/components/layout';
import { Button, Card, CardHeader, StatusBadge, Tabs } from '@/components/ui';
import { StatCard, MiniStat } from '@/components/patterns';
import { ChartLegend, DeliveryDonut, HourlyBarChart, OperatorSplitBars, TrafficAreaChart } from '@/components/charts';
import { credits, deliverySplit, dltSummary, dltWorkspace, hourly, kpis, operatorSplit, recentCampaigns, traffic } from '@/data/dashboard';
import { cn } from '@/lib/cn';

const workspaceTones = {
  orange: 'bg-brand-cream text-brand-orange',
  success: 'bg-status-successBg text-status-success',
  violet: 'bg-status-violetBg text-status-violet',
  lime: 'bg-[#F1FBE4] text-[#65A30D]',
};
const workspaceIcons = { entity: Users, sender: CheckCircle2, template: FileText, bulk: Upload };

export function DashboardPage() {
  const [range, setRange] = useState('weekly');
  return (
    <>
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-[28px] font-bold leading-tight text-ink">Bulk SMS</h1>
          <p className="mt-1 text-[15px] text-ink-secondary">Growtele CPaaS · DLT compliant messaging.</p>
        </div>
        <div className="flex items-center gap-8">
          <Tabs
            value={range}
            onChange={setRange}
            items={[
              { value: 'daily', label: 'Daily' },
              { value: 'weekly', label: 'Weekly' },
              { value: 'monthly', label: 'Monthly' },
            ]}
          />
          <CreditsPill left={credits.remaining} total={credits.total} />
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-5 xl:grid-cols-4">
        <StatCard label="SMS Submitted" icon={<MessageSquareText />} tone="violet" {...kpis.submitted} />
        <StatCard label="Delivered" icon={<CheckCircle2 />} tone="success" {...kpis.delivered} />
        <StatCard label="Failed" icon={<XCircle />} tone="danger" {...kpis.failed} />
        <StatCard label="Pending" icon={<DownloadIcon />} tone="info" {...kpis.pending} />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[2fr_1fr]">
        {/* Left column */}
        <div className="space-y-5">
          <Card className="p-5">
            <CardHeader
              title="SMS Traffic — Submitted vs Delivered"
              subtitle="Daily volume across all routes"
              action={
                <ChartLegend
                  items={[
                    { label: 'Sent', color: '#60A5FA' },
                    { label: 'Delivered', color: '#22C55E' },
                  ]}
                />
              }
            />
            <TrafficAreaChart data={traffic} />
          </Card>

          <Card className="p-5">
            <CardHeader title="Hourly Report" subtitle="Best delivery window: 4 PM – 8 PM" />
            <HourlyBarChart data={hourly} />
          </Card>

          <Card className="p-5">
            <CardHeader
              title="Recent Campaigns"
              subtitle="Latest bulk sends and their delivery status"
              action={
                <Link to="/campaigns" className="inline-flex items-center gap-1 text-[13px] text-ink hover:text-brand-navy">
                  View All <ArrowRight className="h-4 w-4" />
                </Link>
              }
            />
            <table className="w-full text-[13px]">
              <thead>
                <tr className="rounded-lg bg-surface-page text-left text-[12px] uppercase tracking-wide text-ink-secondary">
                  <th className="rounded-l-lg px-4 py-3 font-medium">Campaign</th>
                  <th className="px-4 py-3 font-medium">Route</th>
                  <th className="px-4 py-3 font-medium">Delivery</th>
                  <th className="rounded-r-lg px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentCampaigns.map((c) => (
                  <tr key={c.id} className="border-b border-line last:border-0">
                    <td className="px-4 py-4 text-ink-secondary">{c.name}</td>
                    <td className="px-4 py-4 text-ink-secondary">{c.route}</td>
                    <td className="px-4 py-4 font-medium text-status-success">{c.delivery}%</td>
                    <td className="px-4 py-4">
                      <StatusBadge status={c.status} dot={false} className="px-4 py-1.5 text-[12px]" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          <Card className="p-5">
            <CardHeader title="Delivery Status Split" subtitle="Last 30 days DLR breakdown" />
            <DeliveryDonut data={deliverySplit} total="500 SMS" />
            <ChartLegend className="mt-4 justify-center" items={deliverySplit.map((d) => ({ label: d.name, color: d.color }))} />
          </Card>

          <Card className="p-5">
            <CardHeader title="DLT Workspace" subtitle="Manage registration, headers, templates." />
            <ul className="space-y-2.5">
              {dltWorkspace.map((w) => {
                const Icon = workspaceIcons[w.key as keyof typeof workspaceIcons];
                return (
                  <li key={w.key}>
                    <Link to={w.to} className={cn('flex items-center gap-3 rounded-lg px-3 py-2.5 transition hover:brightness-95', workspaceTones[w.tone].split(' ')[0])}>
                      <span className={cn('grid h-8 w-8 place-items-center rounded-md bg-white/70', workspaceTones[w.tone].split(' ')[1])}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="leading-tight">
                        <span className="block text-[14px] font-medium text-ink">{w.title}</span>
                        <span className="block text-[10px] text-ink-secondary">{w.sub}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Card>

          <Card className="p-5">
            <CardHeader
              title={
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-status-violet" /> DLT Summary
                </span>
              }
            />
            <div className="grid grid-cols-2 gap-2.5">
              <MiniStat value={String(dltSummary.approvedTemplates)} label="Approved templates" tone="success" />
              <MiniStat value={String(dltSummary.entityIds)} label="Entity IDs" tone="info" />
              <MiniStat value={`${dltSummary.ctr} CTR`} label="URL" tone="orange" />
              <MiniStat value={String(dltSummary.activeSenderIds)} label="Active sender IDs" tone="info" />
            </div>
            <p className="mt-3 text-[10px] text-ink-secondary">{dltSummary.syncNote}</p>
            <div className="mt-3 flex justify-end">
              <Button variant="outline" size="xs" className="rounded-md" iconRight={<ChevronRight />}>
                Open DLT Panel
              </Button>
            </div>
          </Card>

          <Card className="p-5">
            <CardHeader title="Operator split" subtitle="Share of delivered traffic" />
            <OperatorSplitBars data={operatorSplit} />
            <Button variant="soft" size="sm" block className="mt-5 rounded-lg bg-status-violetBg/60 text-ink">
              View Telco Report
            </Button>
          </Card>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
