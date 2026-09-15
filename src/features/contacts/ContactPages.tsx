import { useState } from 'react';
import { BookUser, CheckCircle2, Megaphone, Search, Users, XCircle } from 'lucide-react';
import { Button, Card, DataTable, FileDropzone, FormField, IdCardIllustration, Input, Modal, PhoneInput, Select, Textarea, type Column } from '@/components/ui';
import { ActionCell, CountCard, HeroTabs } from '@/components/patterns';
import { contactGroups } from '@/data/fixtures';
import type { ContactGroup } from '@/data/types';

const TABS = [
  { to: '/contacts/groups', title: 'Group', subtitle: 'Organize Phonebook Contacts into Groups Easily', icon: <Users />, tone: 'orange' as const },
  { to: '/contacts/contacts', title: 'Contacts', subtitle: 'Manage and Organize Your Contacts Easily', icon: <BookUser />, tone: 'info' as const },
];

export function GroupsPage() {
  const [open, setOpen] = useState(false);
  const cols: Column<ContactGroup>[] = [
    { key: 'name', header: 'Group Name' },
    { key: 'count', header: 'Total Contacts' },
    { key: 'description', header: 'Description' },
    { key: 'action', header: 'Action', render: (r) => <ActionCell toggle={r.status === 'Active'} /> },
  ];
  return (
    <>
      <HeroTabs items={TABS} />
      <div className="mb-5 flex items-end justify-between">
        <div className="grid w-[720px] grid-cols-3 gap-5">
          <CountCard label="Total Group" value={10} icon={<Megaphone />} tone="violet" />
          <CountCard label="Active Group" value={8} icon={<CheckCircle2 />} tone="success" />
          <CountCard label="Inactive Group" value={2} icon={<XCircle />} tone="danger" />
        </div>
        <Button onClick={() => setOpen(true)}>+ Add Group</Button>
      </div>
      <DataTable columns={cols} rows={contactGroups} rowKey={(r) => r.id} bordered centered dense />
      <Modal open={open} onClose={() => setOpen(false)} title="Add Group" subtitle="Create a phonebook group" illustration={<IdCardIllustration />}>
        <FormField label="Group Name" required><Input placeholder="Enter Group Name" /></FormField>
        <FormField label="Description"><Textarea placeholder="Description" className="min-h-[80px]" /></FormField>
      </Modal>
    </>
  );
}

export function ContactsPage() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <HeroTabs items={TABS} />
      <Card className="p-7">
        <div className="flex flex-wrap items-end gap-3">
          <FormField label="Select Group" className="w-[130px]"><Select options={['all', ...contactGroups.map((g) => g.name)]} /></FormField>
          <FormField label="Mobile (Optional)" className="w-[170px]"><Input defaultValue="8826896286" /></FormField>
          <FormField label="Limit" className="w-[130px]"><Select options={['20', '50', '100']} /></FormField>
          <Button icon={<Search />}>Search</Button>
          <Button variant="outline" size="sm">Deleted Selected</Button>
          <Button variant="outline" size="sm">Delete All</Button>
          <Button className="ml-auto" onClick={() => setOpen(true)}>+ Add Contact</Button>
        </div>
        <FileDropzone className="mt-6" />
      </Card>
      <Modal open={open} onClose={() => setOpen(false)} title="Add Contact" subtitle="Add a contact to a group" illustration={<IdCardIllustration />}>
        <FormField label="Name" required><Input placeholder="Enter Name" /></FormField>
        <FormField label="Mobile" required><PhoneInput /></FormField>
        <FormField label="Group" required><Select options={contactGroups.map((g) => g.name)} /></FormField>
      </Modal>
    </>
  );
}
