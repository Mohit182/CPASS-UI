import { cn } from '@/lib/cn';

/**
 * Day × hour numeric grid (MIS report). `data[day][hour]`.
 * Row totals shown at the end; the highlighted row/cell get a warm tint.
 */
export function HeatmapGrid({
  data,
  highlightDay,
  highlightHour,
  className,
}: {
  data: number[][];
  highlightDay?: number;
  highlightHour?: number;
  className?: string;
}) {
  const hours = Array.from({ length: 24 }, (_, h) => h);
  const max = Math.max(1, ...data.flat());
  return (
    <div className={cn('overflow-x-auto rounded-card border border-line bg-surface-card shadow-card', className)}>
      <table className="w-full border-collapse text-[10px] text-ink">
        <thead>
          <tr className="bg-brand-gradient text-white">
            <th className="sticky left-0 bg-brand-navy px-2 py-2 text-left font-semibold">Day</th>
            {hours.map((h) => (
              <th key={h} className="px-1 py-2 font-semibold">
                {String(h).padStart(2, '0')}
              </th>
            ))}
            <th className="px-2 py-2 font-semibold">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, d) => {
            const total = row.reduce((a, b) => a + b, 0);
            const rowHi = highlightDay === d + 1;
            return (
              <tr key={d} className={cn('border-t border-line', rowHi && 'bg-brand-cream/60')}>
                <td className="sticky left-0 bg-inherit px-2 py-1 font-medium">{d + 1}</td>
                {row.map((v, h) => {
                  const hot = rowHi && highlightHour === h;
                  const intensity = v / max;
                  return (
                    <td
                      key={h}
                      className={cn('px-1 py-1 text-center tabular-nums', hot && 'rounded bg-brand-orange font-bold text-white')}
                      style={!hot && v > 0 ? { backgroundColor: `rgba(108,92,231,${0.05 + intensity * 0.25})` } : undefined}
                    >
                      {v}
                    </td>
                  );
                })}
                <td className="px-2 py-1 text-center font-semibold">{total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
