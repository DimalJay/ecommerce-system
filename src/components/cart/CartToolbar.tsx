import React from 'react';
import { CheckSquare, Square, Trash2 } from 'lucide-react';

interface CartToolbarProps {
  allSelected: boolean;
  someSelected: boolean;
  selectedCount: number;
  totalCount: number;
  onToggleSelectAll: () => void;
  onRemoveSelected: () => void;
}

export const CartToolbar: React.FC<CartToolbarProps> = ({
  allSelected,
  someSelected,
  selectedCount,
  totalCount,
  onToggleSelectAll,
  onRemoveSelected,
}) => {
  return (
    <div className="flex items-center justify-between bg-white border border-luxury-gold-light/30 rounded-2xl px-5 py-3.5 shadow-xs">
      <button
        type="button"
        onClick={onToggleSelectAll}
        className="flex items-center gap-2.5 text-xs font-bold text-luxury-charcoal hover:text-luxury-gold transition-colors cursor-pointer select-none"
      >
        {allSelected ? (
          <CheckSquare size={18} className="text-luxury-gold" />
        ) : (
          <Square size={18} className="text-slate-400" />
        )}
        <span>
          Select All ({selectedCount}/{totalCount})
        </span>
      </button>

      {someSelected && (
        <button
          type="button"
          onClick={onRemoveSelected}
          className="flex items-center gap-1.5 text-xs font-semibold text-rose-500 hover:text-rose-700 transition-colors cursor-pointer"
        >
          <Trash2 size={14} />
          <span>Remove Selected</span>
        </button>
      )}
    </div>
  );
};
