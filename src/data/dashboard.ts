export const kpis = {
  submitted: { value: 500, delta: 18.6, series: [62, 78, 70, 74, 84, 72, 80, 76] },
  delivered: { value: 250, delta: 18.6, series: [60, 72, 64, 70, 78, 66, 74, 70] },
  failed: { value: 100, delta: 18.6, series: [58, 70, 62, 68, 76, 64, 72, 66] },
  pending: { value: 30, delta: 18.6, series: [60, 74, 66, 72, 80, 68, 76, 72] },
};

export const credits = { remaining: 16200, total: 25000, monthlyLeft: 8800 };

/** Daily volume across all routes (June). */
export const traffic = [
  { day: '1 Jun', sent: 68000, delivered: 42000 },
  { day: '5 Jun', sent: 80000, delivered: 55000 },
  { day: '11 Jun', sent: 72000, delivered: 47000 },
  { day: '16 Jun', sent: 100000, delivered: 74000 },
  { day: '17 Jun', sent: 96000, delivered: 71000 },
  { day: '21 Jun', sent: 70000, delivered: 44000 },
  { day: '27 Jun', sent: 88000, delivered: 62000 },
  { day: '30 Jun', sent: 78000, delivered: 52000 },
];

export const deliverySplit = [
  { name: 'Delivered', value: 55, color: '#4ADE80' },
  { name: 'Failed', value: 33, color: '#F87171' },
  { name: 'Pending', value: 12, color: '#60A5FA' },
];

export const hourly = [
  { hour: '02', delivered: 65, failed: 43, submitted: 76 },
  { hour: '04', delivered: 94, failed: 62, submitted: 109 },
  { hour: '06', delivered: 57, failed: 81, submitted: 98 },
  { hour: '08', delivered: 70, failed: 81, submitted: 96 },
  { hour: '10', delivered: 94, failed: 62, submitted: 109 },
];

export const dltWorkspace = [
  { key: 'entity', title: 'Add Entity IDs', sub: '1 Verified', to: '/dlt/entity-ids', tone: 'orange' as const },
  { key: 'sender', title: "Add Sender ID's", sub: '9 Active', to: '/dlt/sender-ids', tone: 'success' as const },
  { key: 'template', title: 'Add Templates', sub: '46 Approved', to: '/dlt/templates', tone: 'violet' as const },
  { key: 'bulk', title: 'Bulk Upload', sub: 'Upload CSV', to: '/dlt/bulk-upload', tone: 'lime' as const },
];

export const recentCampaigns = [
  { id: 'c1', name: 'Diwali Offer Blast', route: 'Promotional', delivery: 96.7, status: 'Running' },
  { id: 'c2', name: 'OTP – Login Flow', route: 'Transactional', delivery: 94.8, status: 'Live' },
  { id: 'c3', name: 'EMI Due Reminder', route: 'Service Implicit', delivery: 97.6, status: 'Completed' },
  { id: 'c4', name: 'New Branch Launch', route: 'Promotional', delivery: 91.7, status: 'Scheduled' },
  { id: 'c5', name: 'KYC Verification', route: 'Transactional', delivery: 98.9, status: 'Running' },
  { id: 'c6', name: 'OTP – Login Flow', route: 'Transactional', delivery: 94.8, status: 'Live' },
  { id: 'c7', name: 'EMI Due Reminder', route: 'Service Implicit', delivery: 97.6, status: 'Completed' },
];

export const dltSummary = {
  approvedTemplates: 46,
  entityIds: 4,
  ctr: '18.4%',
  activeSenderIds: 2,
  syncNote: 'Scrubbing sync with TRAI portal completed today at 06:15 IST.',
};

export const operatorSplit = [
  { operator: 'JIO', pct: 41 },
  { operator: 'Airtel', pct: 29 },
  { operator: 'VI', pct: 18 },
  { operator: 'Others', pct: 9 },
];
