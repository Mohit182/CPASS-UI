import { UserRound, Users } from 'lucide-react';
import { DataTable, type Column } from '@/components/ui';
import { HeroTabs } from '@/components/patterns';
import { FROM_FILTER, LIMIT_FILTER, ReportPanel, TO_FILTER } from '@/components/patterns/ReportPanel';
import { operatorCompanyRows, operatorUserRows } from '@/data/reports';

const TABS = [
  { to: '/operator-analytics/company', title: 'Company Summary', subtitle: 'Partner Performance at a Glance', icon: <Users />, tone: 'orange' as const },
  { to: '/operator-analytics/user', title: 'User Summary', subtitle: 'User Name & ID Overview', icon: <UserRound />, tone: 'info' as const },
];

export function CompanySummaryPage() {
  type Row = (typeof operatorCompanyRows)[number];
  const cols: Column<Row>[] = [
    { key: 'from', header: 'From', align: 'left' },
    { key: 'to', header: 'to' },
    { key: 'company', header: 'Company Name' },
    { key: 'type', header: 'Type of User' },
    { key: 'submit', header: 'Submit Credit' },
    { key: 'delivered', header: 'Delivered Credit' },
    { key: 'failed', header: 'Failed Credit' },
    { key: 'pending', header: 'Pending Credit' },
  ];
  return (
    <>
      <HeroTabs items={TABS} />
      <ReportPanel filters={[{ key: 'company', label: 'Company Name', type: 'text', placeholder: 'Enter Company Name' }, FROM_FILTER, TO_FILTER, { ...LIMIT_FILTER, defaultValue: '50' }]} />
      <DataTable columns={cols} rows={operatorCompanyRows} rowKey={(r) => r.id} bordered centered dense />
    </>
  );
}

export function UserSummaryPage() {
  type Row = (typeof operatorUserRows)[number];
  const cols: Column<Row>[] = [
    { key: 'from', header: 'From', align: 'left' },
    { key: 'to', header: 'to' },
    { key: 'user', header: 'User Name' },
    { key: 'submit', header: 'Submit Credit' },
    { key: 'delivered', header: 'Delivered Credit' },
    { key: 'failed', header: 'Failed Credit' },
    { key: 'pending', header: 'Pending Credit' },
  ];
  return (
    <>
      <HeroTabs items={TABS} />
      <ReportPanel filters={[{ key: 'user', label: 'Use Name & User ID', type: 'text', placeholder: 'Enter User Name & ID' }, FROM_FILTER, TO_FILTER, { ...LIMIT_FILTER, defaultValue: '50' }]} />
      <DataTable columns={cols} rows={operatorUserRows} rowKey={(r) => r.id} bordered centered dense />
    </>
  );
}
