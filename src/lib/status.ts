export type StatusTone = 'success' | 'danger' | 'warning' | 'info' | 'violet' | 'cyan' | 'neutral';

const map: Record<string, { label?: string; tone: StatusTone }> = {
  active: { tone: 'success' },
  delivered: { tone: 'success' },
  live: { tone: 'success' },
  approved: { tone: 'success' },
  verified: { tone: 'success' },
  success: { tone: 'success' },
  completed: { tone: 'violet' },
  submitted: { tone: 'violet' },
  running: { tone: 'cyan' },
  sent: { tone: 'cyan' },
  inactive: { tone: 'warning' },
  scheduled: { tone: 'warning' },
  expired: { tone: 'warning' },
  suspended: { tone: 'info' },
  suspend: { tone: 'info' },
  pending: { tone: 'info' },
  routing: { tone: 'info' },
  received: { tone: 'info' },
  published: { tone: 'info' },
  failed: { tone: 'danger' },
  rejected: { tone: 'danger' },
  revoked: { tone: 'danger' },
  blacklisted: { tone: 'danger' },
};

export function statusMeta(status: string): { label: string; tone: StatusTone } {
  const key = status.toLowerCase().trim();
  const hit = map[key];
  const label = hit?.label ?? key.charAt(0).toUpperCase() + key.slice(1);
  return { label, tone: hit?.tone ?? 'neutral' };
}
