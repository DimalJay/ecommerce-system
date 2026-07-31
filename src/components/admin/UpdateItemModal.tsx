import React, { useState } from 'react';
import { Save, Upload } from 'lucide-react';
import { ModalShell } from '../ui';
import { SizeToggleGrid } from './SizeToggleGrid';
import type { AdminItem } from '../../types';

interface UpdateItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: AdminItem | null;
  onSave: (item: AdminItem) => void;
}

export const UpdateItemModal: React.FC<UpdateItemModalProps> = ({ isOpen, onClose, item, onSave }) => {
  const [selectedSizes, setSelectedSizes] = useState<string[]>(['M', 'L']);
  const [formData, setFormData] = useState<Partial<AdminItem>>(() => item ?? {});

  if (!isOpen || !item) return null;

  const handleToggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    onSave(formData as AdminItem);
    onClose();
  };

  const footer = (
    <>
      <button
        type="button"
        onClick={onClose}
        className="px-5 py-3 text-text-secondary hover:bg-accent-ghost rounded-lg font-medium transition-colors cursor-pointer"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={handleSave}
        className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg cursor-pointer"
      >
        <Save size={18} />
        <span>Save Changes</span>
      </button>
    </>
  );

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} title="Edit Item" footer={footer}>
      <form className="space-y-6">
        {/* Image Preview with Upload Overlay */}
        <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Item Image</label>
          <div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-border group cursor-pointer">
            <img src={formData.image} alt={formData.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white backdrop-blur-sm">
              <Upload size={28} className="mb-2" />
              <span className="font-medium">Change Image</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Item Name */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Item Name</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-elevated border border-accent-subtle rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all"
            />
          </div>

          {/* SKU (read-only) */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">SKU</label>
            <input
              type="text"
              value={formData.sku || ''}
              disabled
              className="w-full px-4 py-3 bg-bg-secondary border border-accent-subtle rounded-lg text-text-secondary cursor-not-allowed"
            />
            <p className="text-xs text-text-muted mt-1">SKU cannot be changed.</p>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Category</label>
            <select
              value={formData.category?.toLowerCase() || ''}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 bg-elevated border border-accent-subtle rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all text-text-primary"
            >
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="kids">Kids</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Price (Rs.)</label>
              <input
                type="number"
                value={formData.price || 0}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="w-full px-4 py-3 bg-elevated border border-accent-subtle rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Stock</label>
              <input
                type="number"
                value={formData.stock || 0}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-elevated border border-accent-subtle rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Available Sizes */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Available Sizes</label>
          <SizeToggleGrid selectedSizes={selectedSizes} onToggle={handleToggleSize} />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Description</label>
          <textarea
            rows={3}
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Write a short description about the item..."
            className="w-full px-4 py-3 bg-elevated border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all resize-none"
          />
        </div>
      </form>
    </ModalShell>
  );
};
