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
      {/* Blur Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-scale-up p-6 text-center">
        
        <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={32} className="text-rose-500" />
        </div>
        
        <h2 className="text-xl font-bold text-slate-900 mb-2">Delete Item?</h2>
        
        <p className="text-slate-500 mb-6">
          Are you sure you want to delete <span className="font-semibold text-slate-700">"{item.name}"</span>? 
          This action cannot be undone.
        </p>

        <div className="flex items-center gap-3 w-full">
          <button 
            onClick={onClose}
            className="flex-1 px-5 py-2.5 text-slate-600 bg-[#fbf9f6] border border-[#f5f0e6] hover:bg-[#f5f0e6] rounded-xl font-medium transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => onConfirm(item)}
            className="flex-1 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-medium transition-all shadow-sm hover:shadow-md"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
};
