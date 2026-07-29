import React from 'react';
import { X } from 'lucide-react';

interface DrawerShellProps {
  /** Controls whether the drawer is rendered */
  isOpen: boolean;
  /** Called when the backdrop or close button is clicked */
  onClose: () => void;
  /** Icon displayed to the left of the title in the header */
  headerIcon: React.ReactNode;
  /** Drawer title text */
  title: string;
  /** Optional item count shown in parentheses next to the title */
  itemCount?: number;
  /** Scrollable drawer body content */
  children: React.ReactNode;
  /** Optional sticky footer area (billing totals, CTA button, etc.) */
  footer?: React.ReactNode;
  /** Optional banner shown below the header (e.g. free-shipping progress) */
  banner?: React.ReactNode;
}

/**
 * Reusable right-side drawer shell with glass backdrop, sliding panel,
 * sticky header, optional banner, scrollable body, and sticky footer.
 */
export const DrawerShell: React.FC<DrawerShellProps> = ({
  isOpen,
  onClose,
  headerIcon,
  title,
  itemCount,
  children,
  footer,
  banner,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Glass Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/45 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-luxury-cream border-l border-luxury-gold-light/40 shadow-2xl shadow-slate-950/20 flex flex-col h-full z-10 animate-slide-over">
        {/* Header */}
        <div className="p-6 border-b border-luxury-gold-light/30 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            {headerIcon}
            <h2 className="text-base sm:text-lg font-black text-luxury-charcoal uppercase tracking-wider">
              {title}
              {itemCount !== undefined && ` (${itemCount})`}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 hover:bg-luxury-sand/60 text-slate-500 hover:text-luxury-charcoal rounded-full transition-colors duration-200 cursor-pointer active:scale-95"
            aria-label="Close drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Optional Banner (e.g. free-shipping progress) */}
        {banner}

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {children}
        </div>

        {/* Optional Sticky Footer */}
        {footer && (
          <div className="p-6 bg-white border-t border-luxury-gold-light/30 space-y-4 shrink-0 shadow-lg">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
