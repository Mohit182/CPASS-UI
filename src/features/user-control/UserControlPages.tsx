import { useNavigate } from 'react-router-dom';
import { BookUser, CheckCircle2, Download as DownloadIcon, Megaphone, Users, XCircle } from 'lucide-react';
import { Button, Card, Checkbox, DataTable, FormField, Input, PhoneInput, Select, StatusBadge, type Column } from '@/components/ui';
import { ActionCell, CountCard, FilterBar, HeroTabs } from '@/components/patterns';
import { accounts, accountUiStatus, userNames, users } from '@/data/fixtures';
import type { Account, User } from '@/data/types';

const TABS = [
  { to: '/user-control/companies', title: 'Company', subtitle: 'Track and Manage', icon: <Users />, tone: 'orange' as const },
  { to: '/user-control/users', title: 'User', subtitle: 'View User Company Details in One Place', icon: <BookUser />, tone: 'info' as const },
];

function Counts({ noun }: { noun: string }) {
  return (
    <div className="mb-5 grid grid-cols-4 gap-5">
      <CountCard label={`Total ${noun}`} value={10} icon={<Megaphone />} tone="violet" />
      <CountCard label={`Active ${noun}`} value={8} icon={<CheckCircle2 />} tone="success" />
      <CountCard label={`Inactive ${noun}`} value={2} icon={<XCircle />} tone="danger" />
      <CountCard label={`Suspended ${noun}`} value={2} icon={<DownloadIcon />} tone="info" />
    </div>
  );
}

const fmtTs = (iso: string) => iso.replace('T', ' ');

const companyCols: Column<Account>[] = [
  { key: 'name', header: 'Company Name' },
  { key: 'availableCredits', header: 'Available Credits' },
  { key: 'billingType', header: 'Billing Type', render: (r) => (r.billingType === 'PREPAID' ? 'Prepaid' : 'Postpaid') },
  { key: 'validityDays', header: 'Validity(in days)' },
  { key: 'status', header: 'Status', render: (_r, i) => <StatusBadge status={accountUiStatus[i]} className="text-[10px]" /> },
  { key: 'createdAt', header: 'Creation time', render: (r) => fmtTs(r.createdAt) },
  { key: 'action', header: 'Action', render: (_r, i) => <ActionCell toggle={i < 2} /> },
];

export function CompaniesPage() {
  const navigate = useNavigate();
  return (
    <>
      <HeroTabs items={TABS} />
      <Counts noun="Companies" />
      <FilterBar
        className="mb-5"
        filters={[
          { key: 'name', label: 'Company Name', type: 'text', placeholder: 'Enter Company Name' },
          { key: 'from', label: 'From', type: 'date', defaultValue: '10-08-2026' },
          { key: 'to', label: 'to', type: 'date', defaultValue: '10-08-2026' },
          { key: 'limit', label: 'Limit', type: 'select', options: ['50', '100', '200'], width: 'w-[80px]' },
        ]}
        onSearch={() => {}}
        onDownload={() => {}}
        extra={
          <Button variant="outline" size="sm" onClick={() => navigate('/user-control/companies/new')}>
            + Add Company
          </Button>
        }
      />
      <DataTable columns={companyCols} rows={accounts} rowKey={(r) => r.id} bordered centered dense />
    </>
  );
}

const userCols: Column<User>[] = [
  { key: 'name', header: 'User Name', render: (_r, i) => userNames[i] },
  { key: 'full', header: 'First & Last Name', render: (r) => `${r.firstName}  ${r.lastName}` },
  { key: 'email', header: 'Email' },
  { key: 'mobile', header: 'Mobile Number' },
  { key: 'company', header: 'Company Name', render: () => 'Growtele' },
  { key: 'role', header: 'Role Type', render: (r) => (r.role === 'ADMIN' ? 'Admin' : 'User') },
  { key: 'validityDays', header: 'Validity', render: (r) => `${r.validityDays} Days` },
  { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} className="text-[10px]" /> },
  { key: 'action', header: 'Action', render: (r) => <ActionCell toggle={r.status === 'ACTIVE'} /> },
];

export function UsersPage() {
  const navigate = useNavigate();
  return (
    <>
      <HeroTabs items={TABS} />
      <Counts noun="Users" />
      <FilterBar
        className="mb-5"
        filters={[
          { key: 'name', label: 'Use Name & User ID', type: 'text', placeholder: 'Enter User Name & ID' },
          { key: 'from', label: 'From', type: 'date', defaultValue: '10-08-2026' },
          { key: 'to', label: 'to', type: 'date', defaultValue: '10-08-2026' },
          { key: 'limit', label: 'Limit', type: 'select', options: ['50', '100', '200'], width: 'w-[80px]' },
        ]}
        onSearch={() => {}}
        onDownload={() => {}}
        extra={
          <Button variant="outline" size="sm" onClick={() => navigate('/user-control/users/new')}>
            + Add User
          </Button>
        }
      />
      <DataTable columns={userCols} rows={users} rowKey={(r) => r.id} bordered dense />
    </>
  );
}

function FormActions({ onCancel }: { onCancel: () => void }) {
  return (
    <div className="mt-5 flex items-center gap-3">
      <Button size="lg">Create</Button>
      <Button variant="outline" size="lg" onClick={onCancel}>
        Cancel
      </Button>
    </div>
  );
}

export function CompanyFormPage() {
  const navigate = useNavigate();
  return (
    <>
      <Card className="p-7">
        <h2 className="mb-5 border-b border-line pb-3 font-display text-[20px] font-semibold text-ink">Company Details</h2>
        <div className="grid grid-cols-3 gap-x-6 gap-y-5">
          <FormField label="Company Name"><Input placeholder="Enter your Company Name" /></FormField>
          <FormField label="First Name" required><Input placeholder="Enter your Name" /></FormField>
          <FormField label="Last Name" required><Input placeholder="Enter your Name" /></FormField>
          <FormField label="Email ID"><Input type="email" placeholder="Enter your Email" /></FormField>
          <FormField label="Mobile No" required><PhoneInput placeholder="Enter your Mobile No." /></FormField>
          <FormField label="Billing Type"><Select options={['PREPAID', 'POSTPAID']} /></FormField>
          <FormField label="web"><Input placeholder="Enter your Web" /></FormField>
          <FormField label="Other Mobile No" required><PhoneInput placeholder="Enter other Mobile No." /></FormField>
        </div>
      </Card>
      <FormActions onCancel={() => navigate('/user-control/companies')} />
    </>
  );
}

export function UserFormPage() {
  const navigate = useNavigate();
  return (
    <>
      <Card className="p-7">
        <h2 className="mb-5 border-b border-line pb-3 font-display text-[20px] font-semibold text-ink">User Details</h2>
        <div className="grid grid-cols-3 gap-x-6 gap-y-5">
          <FormField label="Company Name" required><Select options={accounts.map((a) => a.name)} placeholder="Enter your Company Name" /></FormField>
          <FormField label="User Name"><Input placeholder="Enter User Name" /></FormField>
          <FormField label="Password"><Input type="password" placeholder="Enter Pass.." /></FormField>
          <FormField label="First Name" required><Input placeholder="Enter your First Name" /></FormField>
          <FormField label="Last Name" required><Input placeholder="Enter your Last Name" /></FormField>
          <FormField label="E-Mail"><Input type="email" placeholder="Enter your Email" /></FormField>
          <FormField label="Mobile Number" required><PhoneInput placeholder="0000000000" /></FormField>
          <FormField label="Access Role" required><Select options={['Owner', 'Admin', 'Operator']} placeholder=" " /></FormField>
          <FormField label="Account Type"><Select options={['Platform', 'Reseller', 'Enterprise']} placeholder=" " /></FormField>
          <FormField label="Bill Type" required><Select options={['Prepaid', 'Postpaid']} placeholder=" " /></FormField>
          <FormField label="Validity" required><Select options={['30 Days', '90 Days', '180 Days', '365 Days']} placeholder="Select Days" /></FormField>
          <FormField label="Mask Data" required><Select options={['Data Protection', 'None']} /></FormField>
        </div>
      </Card>
      <Card className="mt-5 p-7">
        <h2 className="mb-4 font-display text-[20px] font-semibold text-ink">Settings</h2>
        <div className="flex flex-wrap gap-x-16 gap-y-3">
          <Checkbox defaultChecked label={<span className="text-[15px]">Two-Step Verification</span>} className="[&>input]:h-5 [&>input]:w-5 [&>input]:accent-status-success" />
          <Checkbox defaultChecked label={<span className="text-[15px]">Latency Report</span>} className="[&>input]:h-5 [&>input]:w-5 [&>input]:accent-status-success" />
          <Checkbox label={<span className="text-[15px]">Enable User Profile Picture</span>} className="[&>input]:h-5 [&>input]:w-5" />
          <Checkbox label={<span className="text-[15px]">Daily Credit Cap</span>} className="[&>input]:h-5 [&>input]:w-5" />
        </div>
      </Card>
      <FormActions onCancel={() => navigate('/user-control/users')} />
    </>
  );
}
