export type ToastType = 'success' | 'error';

export interface GlobalToastDetail {
  message: string;
  type: ToastType;
}

export const TOAST_EVENT = 'toast:show';

export const showGlobalToast = (message: string, type: ToastType = 'success') => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<GlobalToastDetail>(TOAST_EVENT, { detail: { message, type } }));
};
