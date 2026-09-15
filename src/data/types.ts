// Typed to the backend Phase 1 contract where one exists; UI-only fields layered on top.

export type MessageStatus = 'RECEIVED' | 'PUBLISHED' | 'ROUTING' | 'SUBMITTED' | 'SENT' | 'DELIVERED' | 'FAILED' | 'EXPIRED';
export type AccountType = 'PLATFORM' | 'RESELLER' | 'ENTERPRISE';
export type UserRole = 'OWNER' | 'ADMIN' | 'OPERATOR';
export type Channel = 'web' | 'api' | 'smpp';
export type Route = 'Promotional' | 'Transactional' | 'Service Implicit' | 'Service Explicit';

export interface Account {
  id: string;
  type: AccountType;
  parentId?: string;
  name: string;
  status: 'ACTIVE' | 'SUSPENDED';
  billingType: 'PREPAID' | 'POSTPAID';
  availableCredits: number;
  validityDays: number;
  createdAt: string;
  // UI-only
  contactName: string;
  email: string;
  mobile: string;
  city?: string;
}

export interface User {
  id: string;
  accountId: string;
  email: string;
  role: UserRole;
  status: 'ACTIVE' | 'INACTIVE';
  firstName: string;
  lastName: string;
  mobile: string;
  validityDays: number;
  createdAt: string;
  credits: number;
}

export interface ApiKey {
  id: string;
  accountId: string;
  name: string;
  keyPrefix: string;
  status: 'ACTIVE' | 'REVOKED';
  accountType: AccountType;
  matchTemplate: boolean;
  createdAt: string;
}

export interface MessageRecipient {
  id: string;
  phoneNumber: string;
  status: MessageStatus;
  operator?: string;
  circle?: string;
  deliveredAt?: string;
  errorCode?: string;
}

export interface MessageRequest {
  id: string;
  accountId: string;
  sender: string;
  message: string;
  clientReference?: string;
  priority: 'HIGH' | 'NORMAL' | 'LOW';
  validitySeconds?: number;
  status: MessageStatus;
  createdAt: string;
  recipients: MessageRecipient[];
  channel: Channel;
  campaignId?: string;
  templateId?: string;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  type: 'Quick' | 'Dynamic' | 'Multi Dynamic' | 'Unicode';
  route: Route;
  status: 'Active' | 'Inactive' | 'Running' | 'Live' | 'Completed' | 'Scheduled';
  createdAt: string;
  deliveryPct: number;
}

export interface EntityId {
  id: string;
  entityId: string;
  entityName: string;
  status: 'Active' | 'Inactive';
}

export interface SenderId {
  id: string;
  senderId: string;
  entityId: string;
  route: Route;
  status: 'Active' | 'Inactive';
  createdAt: string;
}

export interface DltTemplate {
  id: string;
  templateId: string;
  name: string;
  senderId: string;
  type: 'Promotional' | 'Service Implicit' | 'Service Explicit' | 'Transactional';
  content: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  createdAt: string;
}

export interface ShortUrl {
  id: string;
  name: string;
  longUrl: string;
  shortUrl: string;
  clicks: number;
  status: 'Active' | 'Inactive';
  createdAt: string;
}

export interface ContactGroup {
  id: string;
  name: string;
  description: string;
  count: number;
  createdAt: string;
  status: 'Active' | 'Inactive';
}

export interface Contact {
  id: string;
  name: string;
  mobile: string;
  email?: string;
  groupId: string;
  createdAt: string;
  status: 'Active' | 'Inactive';
}

export interface ScheduledJob {
  id: string;
  campaign: string;
  senderId: string;
  scheduledAt: string;
  recipients: number;
  type: 'One time' | 'Recurring';
  status: 'Scheduled' | 'Completed' | 'Running' | 'Failed';
}

export interface DownloadJob {
  id: string;
  name: string;
  type: 'Detail' | 'Summary' | 'Dynamic';
  requestedAt: string;
  range: string;
  records: number;
  status: 'Completed' | 'Pending' | 'Failed';
}

export interface ArchiveRow {
  id: string;
  month: string;
  records: number;
  size: string;
  archivedAt: string;
  status: 'Available' | 'Expired';
}

export interface ClickerRow {
  id: string;
  mobile: string;
  shortUrl: string;
  clickedAt: string;
  device: string;
  os: string;
  browser: string;
  location: string;
}

export interface OperatorSummary {
  operator: string;
  circle: string;
  submitted: number;
  delivered: number;
  failed: number;
  pending: number;
}

export interface KpiSet {
  submitted: number;
  delivered: number;
  failed: number;
  pending: number;
}

export interface SummaryRow extends KpiSet {
  id: string;
  date: string;
  channel: 'API' | 'WEB' | 'SMPP';
  submittedCredits: number;
  deliveredCredits: number;
  failedCredits: number;
  pendingCredits: number;
  header?: string;
  template?: string;
  campaign?: string;
}
