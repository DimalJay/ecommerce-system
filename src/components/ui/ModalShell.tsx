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
      {/* Glass Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/45 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div
        className={`relative w-full ${maxWidth} bg-white rounded-3xl shadow-2xl shadow-slate-950/20 border border-luxury-gold-light/30 overflow-hidden animate-scale-up flex flex-col max-h-[90vh] z-10`}
      >
        {/* Sticky Header */}
        <div className="px-6 py-4 sm:px-8 border-b border-luxury-gold-light/25 flex items-center justify-between bg-luxury-cream/60 backdrop-blur-xs shrink-0">
          <h2 className="text-lg sm:text-xl font-extrabold text-luxury-charcoal tracking-tight">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-luxury-charcoal hover:bg-luxury-sand/60 rounded-full transition-colors duration-200 cursor-pointer active:scale-95"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar flex-1">
          {children}
        </div>

        {/* Optional Sticky Footer */}
        {footer && (
          <div className="px-6 py-4 sm:px-8 border-t border-luxury-gold-light/25 bg-luxury-cream/60 backdrop-blur-xs shrink-0 flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
