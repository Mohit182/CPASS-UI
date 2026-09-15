import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { cn } from '@/lib/cn';
import { formatNumber } from '@/lib/format';

export { Sparkline } from './Sparkline';
export type { SparkTone } from './Sparkline';

const axis = { fontSize: 11, fill: '#A0A0B2' };

function TrafficTooltip({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-line bg-white px-3 py-2 text-[11px] shadow-card">
      <p className="mb-1 font-semibold text-ink">{label}, 2026</p>
      {payload.map((p) => (
        <p key={p.name} className="flex items-center justify-between gap-6 text-ink-secondary">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
            {p.name}
          </span>
          <span className="font-medium text-ink">{formatNumber(p.value)}</span>
        </p>
      ))}
    </div>
  );
}

/** Sent vs Delivered smooth area chart. */
export function TrafficAreaChart({ data, height = 260 }: { data: { day: string; sent: number; delivered: number }[]; height?: number }) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="g-sent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="g-del" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22C55E" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#22C55E" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#ECECF3" />
          <XAxis dataKey="day" tick={axis} axisLine={false} tickLine={false} dy={8} />
          <YAxis tick={axis} axisLine={false} tickLine={false} tickFormatter={(v) => (v === 0 ? '0' : `${v / 1000}k`)} width={40} />
          <Tooltip content={<TrafficTooltip />} cursor={{ stroke: '#ECECF3' }} />
          <Area type="monotone" dataKey="sent" name="Sent" stroke="#60A5FA" strokeWidth={2} fill="url(#g-sent)" dot={{ r: 0 }} activeDot={{ r: 4 }} />
          <Area type="monotone" dataKey="delivered" name="Delivered" stroke="#22C55E" strokeWidth={2} fill="url(#g-del)" dot={{ r: 0 }} activeDot={{ r: 4 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

/** Flat donut with centre label + side percentages. */
export function DeliveryDonut({
  data,
  total,
  totalLabel = 'TOTAL',
  className,
}: {
  data: { name: string; value: number; color: string }[];
  total: string;
  totalLabel?: string;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <div className="relative h-[210px] w-[210px] shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" innerRadius={62} outerRadius={100} paddingAngle={2} startAngle={90} endAngle={-270} stroke="none" isAnimationActive={false}>
              {data.map((d) => (
                <Cell key={d.name} fill={d.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
          <div>
            <p className="font-display text-[20px] font-bold leading-tight text-ink">{total}</p>
            <p className="text-[12px] text-ink-secondary">{totalLabel}</p>
          </div>
        </div>
      </div>
      <ul className="space-y-3">
        {data.map((d) => (
          <li key={d.name} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ background: d.color }} />
            <span className="leading-tight">
              <span className="block text-[13px] font-bold text-ink">{d.value}%</span>
              <span className="block text-[9px] text-ink-faint">{d.name}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Grouped bar chart (Delivered / Failed / Submitted per hour). */
export function HourlyBarChart({ data, height = 240 }: { data: { hour: string; delivered: number; failed: number; submitted: number }[]; height?: number }) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }} barGap={4} barCategoryGap="35%">
          <CartesianGrid vertical={false} stroke="#ECECF3" />
          <XAxis dataKey="hour" tick={axis} axisLine={false} tickLine={false} dy={8} />
          <YAxis tick={axis} axisLine={false} tickLine={false} width={32} />
          <Tooltip cursor={{ fill: '#F8F8FB' }} contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #ECECF3' }} />
          <Bar dataKey="delivered" name="Delivered" fill="#4ADE80" radius={[4, 4, 0, 0]} />
          <Bar dataKey="failed" name="Failed" fill="#F87171" radius={[4, 4, 0, 0]} />
          <Bar dataKey="submitted" name="Submitted" fill="#8B7CF6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/** Horizontal gradient bars with label + % (Operator split). */
export function OperatorSplitBars({ data, className }: { data: { operator: string; pct: number }[]; className?: string }) {
  return (
    <ul className={cn('space-y-4', className)}>
      {data.map((d) => (
        <li key={d.operator}>
          <div className="mb-1.5 flex items-center justify-between text-[13px]">
            <span className="font-semibold text-ink">{d.operator}</span>
            <span className="text-ink-secondary">{d.pct}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-brand-cream">
            <div className="h-full rounded-full bg-[linear-gradient(90deg,#F97316_0%,#F58A1F_60%,#EF4444_100%)]" style={{ width: `${d.pct}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function ChartLegend({ items, className }: { items: { label: string; color: string }[]; className?: string }) {
  return (
    <ul className={cn('flex items-center gap-4 text-[12px] text-ink-secondary', className)}>
      {items.map((i) => (
        <li key={i.label} className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ background: i.color }} />
          {i.label}
        </li>
      ))}
    </ul>
  );
}
