import { useState, useRef, useEffect, useCallback } from 'react';

export function useToast(duration = 3000) {
  const [message, setMessage] = useState<string | null>(null);
  const timerRef = useRef<number>(0);

  const triggerToast = useCallback((msg: string) => {
    setMessage(msg);
    clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setMessage(null), duration);
  }, [duration]);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return { toastMessage: message, triggerToast };
}
