import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { ModalShell } from '../ui';
import type { AdminItem } from '../../types';
import { useDeleteProductMutation } from '../../hooks/useAdminProduct';
import { useToast } from '../../hooks/useToast';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (item: AdminItem) => void;
  item: AdminItem | null;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ isOpen, onClose, onConfirm, item }) => {
  const { triggerToast } = useToast();
  const deleteProductMutation = useDeleteProductMutation();

  if (!isOpen || !item) return null;

  const handleConfirm = () => {
    deleteProductMutation.mutate(item.id, {
      onSuccess: () => {
        triggerToast(`Product "${item.name}" deleted successfully!`);
        onConfirm(item);
      },
      onError: (err) => {
        triggerToast(err.message || 'Failed to delete product.');
      },
    });
  };

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Item?"
      maxWidth="max-w-md"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-5 py-3 text-text-secondary bg-luxury-cream border border-luxury-gold-light/30 hover:bg-luxury-sand rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={deleteProductMutation.isPending}
            className="flex-1 px-5 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {deleteProductMutation.isPending ? 'Deleting...' : 'Delete'}
          </button>
        </>
      }
    >
      <div className="text-center">
        <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-100 shadow-xs">
          <AlertTriangle size={32} className="text-rose-500" />
        </div>
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-0">
          Are you sure you want to delete <span className="font-bold text-luxury-charcoal">"{item.name}"</span>?
          This action cannot be undone.
        </p>
      </div>
    </ModalShell>
  );
};
