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
      <div
        className="fixed inset-0 bg-text-primary/40 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-bg-primary border-l border-border shadow-xl flex flex-col h-full z-10 animate-slide-over">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-elevated shrink-0">
          <div className="flex items-center gap-3">
            {headerIcon}
            <h2 className="text-base font-bold text-text-primary">
              {title}
              {itemCount !== undefined && ` (${itemCount})`}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-secondary text-text-muted hover:text-text-primary rounded-lg transition-colors cursor-pointer"
            aria-label="Close drawer"
          >
            <X size={18} />
          </button>
        </div>

        {banner}

        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {children}
        </div>

        {footer && (
          <div className="px-6 py-5 bg-elevated border-t border-border space-y-4 shrink-0 shadow-md">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
