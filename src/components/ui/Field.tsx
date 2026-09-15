import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react';
import { Calendar, ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/cn';

export const controlCls =
  'h-9 w-full rounded-lg border border-line bg-white px-3 text-[13px] text-ink placeholder:text-ink-faint transition focus:border-brand-navy/40 focus:outline-none focus:ring-2 focus:ring-brand-navy/10 disabled:bg-surface-muted disabled:text-ink-faint';

/** Label + control + optional hint. Use `inline` for filter bars. */
export function FormField({
  label,
  required,
  hint,
  className,
  children,
  htmlFor,
}: {
  label?: ReactNode;
  required?: boolean;
  hint?: ReactNode;
  className?: string;
  children: ReactNode;
  htmlFor?: string;
}) {
  return (
    <div className={cn('min-w-0', className)}>
      {label && (
        <label htmlFor={htmlFor} className="mb-1.5 block text-[13px] font-medium text-ink">
          {label}
          {required && <span className="text-ink"> *</span>}
        </label>
      )}
      {children}
      {hint && <p className="mt-1 text-[11px] text-ink-secondary">{hint}</p>}
    </div>
  );
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leading?: ReactNode;
  trailing?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ leading, trailing, className, ...rest }, ref) {
  return (
    <span className={cn('relative block', className)}>
      {leading && (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint [&>svg]:h-4 [&>svg]:w-4">{leading}</span>
      )}
      <input ref={ref} className={cn(controlCls, leading && 'pl-9', trailing && 'pr-9')} {...rest} />
      {trailing && (
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint [&>svg]:h-4 [&>svg]:w-4">{trailing}</span>
      )}
    </span>
  );
});

export function SearchInput(props: InputProps) {
  return <Input type="search" leading={<Search />} {...props} />;
}

export function DateInput({ className, ...rest }: InputProps) {
  return <Input type="text" placeholder="dd-mm-yyyy" trailing={<Calendar />} className={className} {...rest} />;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[] | string[];
  placeholder?: string;
  leading?: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { options, placeholder, leading, className, ...rest },
  ref,
) {
  const opts = options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o));
  return (
    <span className={cn('relative block', className)}>
      {leading && (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint [&>svg]:h-4 [&>svg]:w-4">{leading}</span>
      )}
      <select ref={ref} className={cn(controlCls, 'appearance-none pr-9', leading && 'pl-9')} {...rest}>
        {placeholder && <option value="">{placeholder}</option>}
        {opts.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-secondary" />
    </span>
  );
});

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(function Textarea(
  { className, ...rest },
  ref,
) {
  return <textarea ref={ref} className={cn(controlCls, 'h-auto min-h-[120px] resize-y py-2.5', className)} {...rest} />;
});

/** "+91 | number" input. */
export function PhoneInput({ className, ...rest }: InputProps) {
  return (
    <span className={cn('flex', className)}>
      <span className="flex h-9 items-center rounded-l-lg border border-r-0 border-line bg-surface-muted px-3 text-[13px] text-ink-secondary">
        +91
      </span>
      <input type="tel" className={cn(controlCls, 'rounded-l-none')} placeholder="Enter mobile number" {...rest} />
    </span>
  );
}

export function Checkbox({
  label,
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & { label?: ReactNode }) {
  return (
    <label className={cn('inline-flex cursor-pointer select-none items-center gap-2 text-[12px] text-ink', className)}>
      <input type="checkbox" className="h-4 w-4 shrink-0 rounded border-line accent-brand-navy" {...rest} />
      {label}
    </label>
  );
}

export function Radio({
  label,
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & { label?: ReactNode }) {
  return (
    <label className={cn('inline-flex cursor-pointer select-none items-center gap-2 text-[13px] text-ink', className)}>
      <input type="radio" className="h-4 w-4 shrink-0 accent-brand-navy" {...rest} />
      {label}
    </label>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
  className,
  size = 'md',
}: {
  checked: boolean;
  onChange?: (v: boolean) => void;
  label?: ReactNode;
  className?: string;
  size?: 'sm' | 'md';
}) {
  const dims = size === 'sm' ? 'h-4 w-7' : 'h-5 w-9';
  const knob = size === 'sm' ? 'h-3 w-3 translate-x-0.5' : 'h-4 w-4 translate-x-0.5';
  const on = size === 'sm' ? 'translate-x-3.5' : 'translate-x-4';
  return (
    <label className={cn('inline-flex cursor-pointer items-center gap-2 text-[12px] text-ink', className)}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange?.(!checked)}
        className={cn('relative inline-flex shrink-0 items-center rounded-full transition', dims, checked ? 'bg-status-success' : 'bg-ink-faint/50')}
      >
        <span className={cn('inline-block rounded-full bg-white shadow transition', knob, checked && on)} />
      </button>
      {label}
    </label>
  );
}
