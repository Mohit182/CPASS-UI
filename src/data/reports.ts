import type { SummaryRow } from './types';

const rep = <T>(n: number, f: (i: number) => T) => Array.from({ length: n }, (_, i) => f(i));

export const overviewRows: SummaryRow[] = [
  { id: 'o1', date: '2026-08-12', channel: 'API', submitted: 2, submittedCredits: 2, delivered: 2, deliveredCredits: 2, failed: 2, failedCredits: 2, pending: 2, pendingCredits: 2 },
  { id: 'o2', date: '2026-08-11', channel: 'API', submitted: 5, submittedCredits: 5, delivered: 4, deliveredCredits: 4, failed: 1, failedCredits: 1, pending: 2, pendingCredits: 2 },
  { id: 'o3', date: '2026-08-04', channel: 'WEB', submitted: 2, submittedCredits: 2, delivered: 1, deliveredCredits: 1, failed: 1, failedCredits: 1, pending: 0, pendingCredits: 0 },
  { id: 'o4', date: '2026-08-04', channel: 'WEB', submitted: 2, submittedCredits: 2, delivered: 1, deliveredCredits: 1, failed: 1, failedCredits: 1, pending: 0, pendingCredits: 0 },
];

export const headerRows: SummaryRow[] = rep(5, (i) => ({
  id: `h${i}`,
  date: i % 2 === 0 ? '2026-08-12' : '2026-08-11',
  channel: 'WEB',
  header: 'GRWTEL',
  submitted: i % 2 === 0 ? 2 : 5,
  submittedCredits: i % 2 === 0 ? 2 : 5,
  delivered: i % 2 === 0 ? 2 : 4,
  deliveredCredits: i % 2 === 0 ? 2 : 4,
  failed: i % 2 === 0 ? 0 : 1,
  failedCredits: i % 2 === 0 ? 0 : 1,
  pending: 0,
  pendingCredits: 0,
}));

export const templateRows: SummaryRow[] = rep(6, (i) => ({
  id: `t${i}`,
  date: '2026-08-12',
  channel: 'WEB',
  header: 'GRWTEL',
  template: '1707168447801414304',
  submitted: 2, submittedCredits: 2, delivered: 2, deliveredCredits: 2, failed: 0, failedCredits: 0, pending: 0, pendingCredits: 0,
}));

export const campaignRows: (SummaryRow & { messageType: string; message: string })[] = rep(10, (i) => ({
  id: `c${i}`,
  date: '2026-08-12T15:01:06',
  channel: 'WEB',
  header: 'GRWTEL',
  campaign: 'Ahmad',
  messageType: [0, 3, 6, 7].includes(i) ? 'Dynamic' : 'Quick',
  message: 'Your OTP Fo..',
  submitted: 2, submittedCredits: 2, delivered: 2, deliveredCredits: 2, failed: 0, failedCredits: 0, pending: 0, pendingCredits: 0,
}));

export const searchRows = rep(8, (i) => ({
  id: `s${i}`,
  user: 'Growtele (2071)',
  msgId: '3HwjPFfSuqicYcBJINdL7RmW2vN',
  header: 'GRWTEL',
  mobile: '8826896286',
  received: '2026-08-11 13:48:29',
  submit: '2026-08-11 13:48:29',
  delivery: '2026-08-11 13:48:31',
  message: 'Your OTP f...',
  channel: 'web',
  status: 'Delivered',
  errorCode: '000',
  errorDesc: '000',
}));

/** 31 days × 24 hours, mostly zeros with a couple of hot cells. */
export const misHeatmap: number[][] = rep(31, (d) => rep(24, (h) => (d === 8 && h === 23 ? 5 : 0)));

export const misChannelRows = rep(7, (i) => ({
  id: `m${i}`,
  user: 'Growtele (2071)',
  smsType: i < 3 ? 'Dynamic' : i < 5 ? 'Quick' : 'Multi Dynamic',
  requestTime: '2026-08-11 13:48:29',
  scheduledTime: '-',
  senderId: 'GRWTEL',
  source: 'web',
  smsSource: 'Normal',
  credits: 3,
  submitCredit: 3,
}));

export const clickerToday = [
  { label: 'Total Submit', value: '20,060,853', tone: 'violet' },
  { label: 'Delivered', value: '87.75%', tone: 'success' },
  { label: 'Failed', value: '2.25%', tone: 'danger' },
  { label: 'Pending', value: '623', tone: 'info' },
  { label: 'Click', value: '100', tone: 'cyan' },
] as const;

export const clickerDetailRows = rep(8, (i) => ({
  id: `cd${i}`,
  user: 'Growtele (2071)',
  smsType: 'Quick',
  campaign: 'Ahmad',
  requestTime: '2026-08-12 15:01:06',
  header: 'GRWTEL',
  source: 'web',
  smsCount: 2,
  credits: 2,
  length: 61,
  message: 'Your OTP f....',
}));

export const operatorCompanyRows = rep(5, (i) => ({
  id: `oc${i}`,
  from: '2026-08-12',
  to: '2026-08-12',
  company: 'KB_G_Marketing-1(2004)',
  type: 'Non Promo',
  submit: 131712,
  delivered: 102392,
  failed: 24242,
  pending: 1,
}));

export const operatorUserRows = [2, 4, 2, 3, 2].map((s, i) => ({
  id: `ou${i}`,
  from: '2026-08-12',
  to: '2026-08-12',
  user: 'Growtele(2071)',
  submit: s,
  delivered: [2, 4, 2, 2, 1][i],
  failed: 0,
  pending: 0,
}));
