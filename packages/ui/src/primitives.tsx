import type { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react';
import { cn } from '@it-master-ai/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

const baseButton = 'inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-60 disabled:pointer-events-none';

export const Button = ({ className, variant = 'primary', loading, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; loading?: boolean }) => {
  const styles: Record<Variant, string> = {
    primary: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:scale-[1.01]',
    secondary: 'bg-white/10 text-slate-100 ring-1 ring-white/10 hover:bg-white/15',
    ghost: 'bg-transparent text-slate-200 hover:bg-white/10',
    danger: 'bg-rose-500 text-white hover:bg-rose-400'
  };

  return (
    <button className={cn(baseButton, styles[variant], className)} {...props}>
      {loading ? 'Please wait...' : children}
    </button>
  );
};

const fieldBase = 'w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20';

export const Input = ({ label, error, className, ...props }: InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }) => (
  <label className="grid gap-2 text-sm text-slate-300">
    {label ? <span>{label}</span> : null}
    <input className={cn(fieldBase, className)} {...props} />
    {error ? <span className="text-xs text-rose-300">{error}</span> : null}
  </label>
);

export const Select = ({ label, className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { label?: string }) => (
  <label className="grid gap-2 text-sm text-slate-300">
    {label ? <span>{label}</span> : null}
    <select className={cn(fieldBase, className)} {...props}>
      {children}
    </select>
  </label>
);

export const Badge = ({ children, className }: HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn('inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-cyan-100', className)}>{children}</span>
);

export const Loader = ({ label = 'Loading' }: { label?: string }) => (
  <div className="flex items-center gap-3 text-sm text-slate-300">
    <div className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
    <span>{label}</span>
  </div>
);

export const Skeleton = ({ className }: { className?: string }) => <div className={cn('animate-pulse rounded-3xl bg-white/10', className)} />;

export const Modal = ({ open, title, children, onClose }: { open: boolean; title: string; children: ReactNode; onClose: () => void }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-950 p-6 text-white shadow-2xl shadow-cyan-500/10" onClick={(event) => event.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button className="rounded-full px-3 py-1 text-sm text-slate-300 hover:bg-white/10" onClick={onClose}>Close</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export const ProgressCircle = ({ value, size = 120, label }: { value: number; size?: number; label?: string }) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth="10" fill="none" />
        <circle cx="60" cy="60" r={radius} stroke="url(#progressGradient)" strokeWidth="10" fill="none" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={dashOffset} />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center rounded-full bg-slate-950/70 text-center">
        <span className="text-2xl font-bold text-white">{value}%</span>
        {label ? <span className="text-xs text-slate-400">{label}</span> : null}
      </div>
    </div>
  );
};

export const Pagination = ({ page, totalPages, onPageChange }: { page: number; totalPages: number; onPageChange: (page: number) => void }) => (
  <div className="flex items-center justify-between gap-3">
    <Button variant="secondary" onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page === 1}>Previous</Button>
    <span className="text-sm text-slate-300">Page {page} of {totalPages}</span>
    <Button variant="secondary" onClick={() => onPageChange(Math.min(totalPages, page + 1))} disabled={page === totalPages}>Next</Button>
  </div>
);
