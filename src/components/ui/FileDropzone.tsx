import { useRef, useState } from 'react';
import { Download, Upload } from 'lucide-react';
import { cn } from '@/lib/cn';

export function FileDropzone({
  accept = '.csv,.xls,.xlsx',
  hint = 'Max 5 MB  csv, .xls, .xlsx',
  sample = true,
  className,
  onFile,
}: {
  accept?: string;
  hint?: string;
  sample?: boolean;
  className?: string;
  onFile?: (f: File) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [name, setName] = useState<string | null>(null);
  const [over, setOver] = useState(false);

  const handle = (f?: File) => {
    if (!f) return;
    setName(f.name);
    onFile?.(f);
  };

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => ref.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          handle(e.dataTransfer.files[0]);
        }}
        className={cn(
          'flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-ink-faint/60 bg-white px-4 py-8 text-center transition',
          over && 'border-brand-navy bg-brand-cream/40',
        )}
      >
        <span className="grid h-10 w-10 place-items-center rounded-full bg-status-violetBg text-brand-navy">
          <Upload className="h-4 w-4" />
        </span>
        <span className="mt-3 text-[14px] font-semibold text-ink">{name ?? 'Choose file or drag & drop'}</span>
        <span className="mt-0.5 text-[11px] text-ink-secondary">{hint}</span>
        <input ref={ref} type="file" accept={accept} className="hidden" onChange={(e) => handle(e.target.files?.[0])} />
      </button>
      {sample && (
        <a href="#" onClick={(e) => e.preventDefault()} className="mt-2 inline-flex items-center gap-1.5 text-[12px] font-medium text-ink hover:underline">
          <Download className="h-3.5 w-3.5" /> Download Sample File
        </a>
      )}
    </div>
  );
}
