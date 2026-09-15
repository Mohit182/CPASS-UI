import { Area, AreaChart, ResponsiveContainer } from 'recharts';

const colors = {
  violet: '#6C5CE7',
  success: '#22C55E',
  danger: '#EF4444',
  info: '#3B82F6',
  warning: '#F97316',
  cyan: '#06B6D4',
};

export type SparkTone = keyof typeof colors;

export function Sparkline({ data, tone = 'violet', height = 56 }: { data: number[]; tone?: SparkTone; height?: number }) {
  const color = colors[tone];
  const id = `spark-${tone}`;
  const series = data.map((v, i) => ({ i, v }));
  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={series} margin={{ top: 4, right: 2, bottom: 0, left: 2 }}>
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.35} />
              <stop offset="100%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <Area
            type="linear"
            dataKey="v"
            stroke={color}
            strokeWidth={1.5}
            fill={`url(#${id})`}
            dot={{ r: 2, fill: color, strokeWidth: 0 }}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
