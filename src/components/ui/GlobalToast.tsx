import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

import { type GlobalToastDetail, TOAST_EVENT } from '../../lib/toastUtils';

/** Global toast rendered once at the app root; triggered by every API request. */
export const GlobalToast: React.FC = () => {
  const [toast, setToast] = useState<GlobalToastDetail | null>(null);
  const timerRef = useRef<number>(0);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<GlobalToastDetail>).detail;
      setToast(detail);
      clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setToast(null), 3000);
    };
    window.addEventListener(TOAST_EVENT, handler);
    return () => {
      window.removeEventListener(TOAST_EVENT, handler);
      clearTimeout(timerRef.current);
    };
  }, []);

  if (!toast) return null;

  const isError = toast.type === 'error';
  const Icon = isError ? AlertCircle : CheckCircle2;

  return (
    <div
      className={`fixed bottom-6 right-6 z-[300] px-5 py-3 rounded-2xl shadow-2xl border flex items-center gap-3 text-xs font-bold animate-slide-over max-w-xs ${
        isError
          ? 'bg-rose-600 text-white border-rose-400/40'
          : 'bg-luxury-charcoal text-white border-luxury-gold/30'
      }`}
    >
      <Icon size={16} className={`shrink-0 ${isError ? 'text-rose-200' : 'text-luxury-gold'}`} />
      <span>{toast.message}</span>
    </div>
  );
};

export default GlobalToast;