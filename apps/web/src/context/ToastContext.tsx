import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type Toast = { id: string; title: string; message: string; tone?: 'info' | 'success' | 'danger' };

type ToastContextValue = { toast: (toast: Omit<Toast, 'id'>) => void };

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const value = useMemo(() => ({
    toast: (toast: Omit<Toast, 'id'>) => {
      const id = crypto.randomUUID();
      setToasts((current) => [...current, { ...toast, id }]);
      window.setTimeout(() => setToasts((current) => current.filter((entry) => entry.id !== id)), 3500);
    }
  }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-4 top-4 z-[70] grid w-[min(22rem,calc(100vw-2rem))] gap-3">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto rounded-3xl border border-white/10 bg-slate-950/90 p-4 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
            <p className="text-sm font-semibold text-white">{toast.title}</p>
            <p className="mt-1 text-sm text-slate-300">{toast.message}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
