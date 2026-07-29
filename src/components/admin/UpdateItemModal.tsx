import React, { useState, useEffect } from 'react';
import { Save, Upload } from 'lucide-react';
import { ModalShell } from '../ui';
import { SizeToggleGrid } from './SizeToggleGrid';
import type { AdminItem } from './ItemTable';

interface UpdateItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: AdminItem | null;
}

/**
 * Admin modal for editing an existing catalogue item.
 * Uses ModalShell for the outer chrome and SizeToggleGrid for the shared size selector.
 */
export const UpdateItemModal: React.FC<UpdateItemModalProps> = ({ isOpen, onClose, item }) => {
  const [selectedSizes, setSelectedSizes] = useState<string[]>(['M', 'L']);
  const [formData, setFormData] = useState<Partial<AdminItem>>({});

  useEffect(() => {
    if (item && isOpen) {
      setFormData(item);
    }
  }, [item, isOpen]);

  if (!isOpen || !item) return null;

  const handleToggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    alert(`Changes saved for ${formData.name}! (Mock)`);
    onClose();
  };

  const footer = (
    <>
      <button
        type="button"
        onClick={onClose}
        className="px-5 py-2.5 text-slate-600 hover:bg-[#f5f0e6] rounded-xl font-medium transition-colors cursor-pointer"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={handleSave}
        className="flex items-center gap-2 bg-[#c5a880] hover:bg-[#aa8c65] text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-md hover:shadow-lg cursor-pointer"
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
          <label className="block text-sm font-medium text-slate-700 mb-2">Item Image</label>
          <div className="relative w-full h-48 rounded-2xl overflow-hidden border-2 border-[#dfd3c3] group cursor-pointer">
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
            <label className="block text-sm font-medium text-slate-700 mb-2">Item Name</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-[#f5f0e6] rounded-xl focus:outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] transition-all"
            />
          </div>

          {/* SKU (read-only) */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">SKU</label>
            <input
              type="text"
              value={formData.sku || ''}
              disabled
              className="w-full px-4 py-2.5 bg-[#fbf9f6] border border-[#f5f0e6] rounded-xl text-slate-500 cursor-not-allowed"
            />
            <p className="text-xs text-slate-400 mt-1">SKU cannot be changed.</p>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
            <select
              value={formData.category?.toLowerCase() || ''}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-[#f5f0e6] rounded-xl focus:outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] transition-all text-slate-700"
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
              <label className="block text-sm font-medium text-slate-700 mb-2">Price (Rs.)</label>
              <input
                type="number"
                value={formData.price || 0}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="w-full px-4 py-2.5 bg-white border border-[#f5f0e6] rounded-xl focus:outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Stock</label>
              <input
                type="number"
                value={formData.stock || 0}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                className="w-full px-4 py-2.5 bg-white border border-[#f5f0e6] rounded-xl focus:outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] transition-all"
              />
            </div>
          </div>
        </div>

        {/* Available Sizes */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Available Sizes</label>
          <SizeToggleGrid selectedSizes={selectedSizes} onToggle={handleToggleSize} />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
          <textarea
            rows={3}
            placeholder="Write a short description about the item..."
            defaultValue={`Premium quality ${formData.category?.toLowerCase()} clothing item.`}
            className="w-full px-4 py-3 bg-white border border-[#f5f0e6] rounded-xl focus:outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] transition-all resize-none"
          />
        </div>
      </form>
    </ModalShell>
  );
};
