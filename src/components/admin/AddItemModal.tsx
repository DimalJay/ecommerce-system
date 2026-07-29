import React, { useState } from 'react';
import { Plus, Upload } from 'lucide-react';
import { ModalShell } from '../ui';
import { SizeToggleGrid } from './SizeToggleGrid';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Admin modal for adding a new catalogue item.
 * Uses ModalShell for the outer chrome (backdrop, panel, header, footer)
 * and SizeToggleGrid for the shared size selector.
 */
export const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose }) => {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const handleToggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    alert('Item added successfully! (Mock)');
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
        <Plus size={18} />
        <span>Save Item</span>
      </button>
    </>
  );

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} title="Add New Item" footer={footer}>
      <form className="space-y-6">
        {/* Image Upload Area */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Item Image</label>
          <div className="w-full h-40 border-2 border-dashed border-[#dfd3c3] rounded-2xl flex flex-col items-center justify-center bg-[#fbf9f6] text-slate-500 hover:bg-[#f5f0e6] hover:border-[#c5a880] transition-colors cursor-pointer group">
            <Upload size={32} className="text-[#c5a880] mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-medium">Click to upload or drag and drop</p>
            <p className="text-xs text-slate-400 mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Item Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Item Name</label>
            <input
              type="text"
              placeholder="e.g. Silk Evening Dress"
              className="w-full px-4 py-2.5 bg-white border border-[#f5f0e6] rounded-xl focus:outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] transition-all"
            />
          </div>

          {/* SKU */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">SKU</label>
            <input
              type="text"
              placeholder="e.g. DR-SLK-002"
              className="w-full px-4 py-2.5 bg-white border border-[#f5f0e6] rounded-xl focus:outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] transition-all"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
            <select className="w-full px-4 py-2.5 bg-white border border-[#f5f0e6] rounded-xl focus:outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] transition-all text-slate-700">
              <option value="">Select Category</option>
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
                placeholder="0.00"
                className="w-full px-4 py-2.5 bg-white border border-[#f5f0e6] rounded-xl focus:outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Stock</label>
              <input
                type="number"
                placeholder="0"
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
            className="w-full px-4 py-3 bg-white border border-[#f5f0e6] rounded-xl focus:outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] transition-all resize-none"
          />
        </div>
      </form>
    </ModalShell>
  );
};
