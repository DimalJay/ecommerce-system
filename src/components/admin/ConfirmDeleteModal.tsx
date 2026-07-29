import React from 'react';
import { AlertTriangle } from 'lucide-react';
import type { AdminItem } from './ItemTable';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (item: AdminItem) => void;
  item: AdminItem | null;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ isOpen, onClose, onConfirm, item }) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
      {/* Glass Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/45 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-slate-950/20 border border-luxury-gold-light/30 overflow-hidden animate-scale-up p-6 sm:p-8 text-center z-10">
        
        <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-100 shadow-2xs">
          <AlertTriangle size={32} className="text-rose-500" />
        </div>
        
        <h2 className="text-xl font-extrabold text-luxury-charcoal mb-2">Delete Item?</h2>
        
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
          Are you sure you want to delete <span className="font-bold text-luxury-charcoal">"{item.name}"</span>? 
          This action cannot be undone.
        </p>

        <div className="flex items-center gap-3 w-full">
          <button 
            type="button"
            onClick={onClose}
            className="flex-1 px-5 py-3 text-slate-600 bg-luxury-cream border border-luxury-gold-light/30 hover:bg-luxury-sand rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer"
          >
            Cancel
          </button>
          <button 
            type="button"
            onClick={() => onConfirm(item)}
            className="flex-1 px-5 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer active:scale-95"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
};
