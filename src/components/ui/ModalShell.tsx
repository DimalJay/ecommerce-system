import React from 'react';
import { X } from 'lucide-react';

interface ModalShellProps {
  /** Controls whether the modal is rendered */
  isOpen: boolean;
  /** Called when the backdrop or close button is clicked */
  onClose: () => void;
  /** Text displayed in the modal header */
  title: string;
  /** Scrollable modal body content */
  children: React.ReactNode;
  /** Optional sticky footer (action buttons) */
  footer?: React.ReactNode;
  /** Tailwind max-width class; defaults to 'max-w-2xl' */
  maxWidth?: string;
}

/**
 * Reusable modal shell with rich glass backdrop blur, rounded panel,
 * sticky header/footer, and scrollable body.
 */
export const ModalShell: React.FC<ModalShellProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = 'max-w-2xl',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <div
        className="fixed inset-0 bg-text-primary/40 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      />

      <div
        className={`relative w-full ${maxWidth} bg-elevated rounded-2xl shadow-xl border border-border overflow-hidden animate-scale-up flex flex-col max-h-[85vh] z-10`}
      >
        <div className="px-6 py-4 sm:px-6 border-b border-border flex items-center justify-between bg-bg-primary/80 shrink-0">
          <h2 className="text-lg font-bold text-text-primary">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-text-muted hover:text-text-primary hover:bg-secondary rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          {children}
        </div>

        {footer && (
          <div className="px-6 py-4 border-t border-border bg-bg-primary/80 shrink-0 flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
