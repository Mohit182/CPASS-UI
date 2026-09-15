import type {
  Account, ApiKey, ArchiveRow, Campaign, Contact, ContactGroup, DltTemplate, DownloadJob, EntityId, ScheduledJob, SenderId, ShortUrl, User,
} from './types';

const rep = <T>(n: number, f: (i: number) => T) => Array.from({ length: n }, (_, i) => f(i));

export const campaigns: Campaign[] = rep(5, (i) => ({
  id: `cmp-${i + 1}`,
  title: 'Ahmad (19079)',
  description: 'Ahmad',
  type: 'Quick',
  route: 'Promotional',
  status: i < 3 ? 'Active' : 'Inactive',
  createdAt: '2026-09-10T11:30:00',
  deliveryPct: 96.7,
}));

export const accounts: Account[] = [
  { id: 'acc-1', type: 'ENTERPRISE', name: 'Kreditbee', status: 'ACTIVE', billingType: 'POSTPAID', availableCredits: 100, validityDays: 180, createdAt: '2022-11-13T23:03:44', contactName: 'Rohan Sharma', email: 'ops@kreditbee.in', mobile: '8826896286' },
  { id: 'acc-2', type: 'ENTERPRISE', name: 'Clovia', status: 'ACTIVE', billingType: 'POSTPAID', availableCredits: 100, validityDays: 360, createdAt: '2022-11-13T23:03:44', contactName: 'Priya Nair', email: 'ops@clovia.com', mobile: '8826896286' },
  { id: 'acc-3', type: 'RESELLER', name: 'Firstcry', status: 'ACTIVE', billingType: 'POSTPAID', availableCredits: 100, validityDays: 360, createdAt: '2022-11-13T23:03:44', contactName: 'Amit Verma', email: 'ops@firstcry.com', mobile: '8826896286' },
  { id: 'acc-4', type: 'ENTERPRISE', name: 'Ebix Cash', status: 'SUSPENDED', billingType: 'PREPAID', availableCredits: 100, validityDays: 360, createdAt: '2022-11-13T23:03:44', contactName: 'Sana Khan', email: 'ops@ebixcash.com', mobile: '8826896286' },
];
/** UI status shown in the companies table (Active / Inactive / Suspend). */
export const accountUiStatus = ['Active', 'Active', 'Inactive', 'Suspend'];

export const users: User[] = [
  { id: 'u-1', accountId: 'acc-1', email: 'hhhh', role: 'OPERATOR', status: 'ACTIVE', firstName: 'md', lastName: 'Ahmad', mobile: '8826896286', validityDays: 180, createdAt: '2026-08-01T10:00:00', credits: 100 },
  { id: 'u-2', accountId: 'acc-2', email: 'hhhh', role: 'OPERATOR', status: 'ACTIVE', firstName: 'md', lastName: 'Ahmad', mobile: '8826896286', validityDays: 175, createdAt: '2026-08-01T10:00:00', credits: 100 },
  { id: 'u-3', accountId: 'acc-3', email: 'hhhh', role: 'OPERATOR', status: 'INACTIVE', firstName: 'md', lastName: 'Ahmad', mobile: '8826896286', validityDays: 150, createdAt: '2026-08-01T10:00:00', credits: 100 },
  { id: 'u-4', accountId: 'acc-4', email: 'hhhh', role: 'ADMIN', status: 'ACTIVE', firstName: 'md', lastName: 'Ahmad', mobile: '8826896286', validityDays: 144, createdAt: '2026-08-01T10:00:00', credits: 100 },
];
export const userNames = ['Kreditbee (6041)', 'Clovia (6042)', 'Firstcry (6043)', 'EbixCash (6044)'];

export const apiKeys: ApiKey[] = rep(4, (i) => ({
  id: `key-${i + 1}`,
  accountId: 'acc-1',
  name: 'otp',
  keyPrefix: 'Het3ycyX',
  status: i < 3 ? 'ACTIVE' : 'REVOKED',
  accountType: 'ENTERPRISE',
  matchTemplate: false,
  createdAt: '2026-08-01T10:00:00',
}));

export const entityIds: EntityId[] = [
  { id: 'e1', entityId: '1001503767453350910', entityName: 'Growtele', status: 'Active' },
  { id: 'e2', entityId: '1001661523911478418', entityName: 'ABR Green', status: 'Active' },
  { id: 'e3', entityId: '1001911922955148958', entityName: 'Shaban Alam', status: 'Inactive' },
  { id: 'e4', entityId: '1101391900000011583', entityName: 'MONEY_TAP', status: 'Active' },
  { id: 'e5', entityId: '1001503767453350910', entityName: 'Growtele', status: 'Inactive' },
];

export const senderIds: SenderId[] = [
  { id: 's1', senderId: '068500', entityId: 'AM (1201159141994639834)', route: 'Transactional', status: 'Active', createdAt: '2026-08-01' },
  { id: 's2', senderId: '220027', entityId: 'ABR Green (1001661523911478418)', route: 'Promotional', status: 'Active', createdAt: '2026-08-01' },
  { id: 's3', senderId: '220027', entityId: 'ABR Green (1001661523911478418)', route: 'Promotional', status: 'Active', createdAt: '2026-08-01' },
  { id: 's4', senderId: '068500', entityId: 'AM (1201159141994639834)', route: 'Transactional', status: 'Inactive', createdAt: '2026-08-01' },
  { id: 's5', senderId: '605606', entityId: 'Growtele (1001503767453350910)', route: 'Service Implicit', status: 'Inactive', createdAt: '2026-08-01' },
];

export const dltTemplates: DltTemplate[] = rep(4, (i) => ({
  id: `t${i + 1}`,
  templateId: '1707168447801414304',
  name: 'Abr New May',
  senderId: 'ABRIND',
  type: 'Service Explicit',
  content: 'Dear {#var.....',
  status: 'Approved',
  createdAt: '2023-05-19',
}));
export const dltTemplateEntity = 'ABR Green (1001661523911478418)';

export const shortUrls: ShortUrl[] = [];

export const contactGroups: ContactGroup[] = rep(4, (i) => ({
  id: `g${i + 1}`,
  name: 'Ahmad [2466]',
  description: 'Ahmad',
  count: 0,
  createdAt: '2026-08-01',
  status: i < 3 ? 'Active' : 'Inactive',
}));

export const contacts: Contact[] = [];

export const scheduledJobs: ScheduledJob[] = rep(5, (i) => ({
  id: `sch-${i + 1}`,
  campaign: 'Ahmad',
  senderId: '6722',
  scheduledAt: '2026-08-19T16:57:00',
  recipients: 3,
  type: 'One time',
  status: i < 3 ? 'Scheduled' : 'Completed',
}));

export const archiveRows: ArchiveRow[] = rep(8, (i) => ({
  id: `arc-${i + 1}`,
  month: '2026-08',
  records: 1,
  size: '56 B',
  archivedAt: '2026-08-11T13:48:29',
  status: 'Available',
}));

export const downloadJobs: DownloadJob[] = [
  { id: 'dl-1', name: 'clicker_detail_data_download | csv', type: 'Detail', requestedAt: '2026-08-18T16:26:35', range: 'date1: 2026-08-18\ndate2: 2026-08-18\nuserfilter: all\nmasking: no', records: 0, status: 'Failed' },
  { id: 'dl-2', name: 'clicker_detail_data_download | csv', type: 'Detail', requestedAt: '2026-08-18T16:26:35', range: 'date1: 2026-08-18\ndate2: 2026-08-18\nuserfilter: all\nmasking: no', records: 0, status: 'Completed' },
];

export const dynamicReportColumns = [
  'Accept OneX Timestamp', 'AGEC DLR Status', 'AGEC Error Code', 'API Key', 'Campaign ID', 'Campaign Instance ID', 'Channel',
  'Circle', 'Credits', 'Delivery Time', 'Error Code', 'Header', 'Message', 'Mobile', 'Msg ID', 'Operator', 'Received Time',
  'Status', 'Submit Time', 'Template ID', 'Type', 'User Name',
];
