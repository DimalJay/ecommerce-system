import React, { useState } from 'react';
import { X, Upload, Plus } from 'lucide-react';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose }) => {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  
  if (!isOpen) return null;

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Blur Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-scale-up flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#f5f0e6] flex items-center justify-between bg-[#fbf9f6] shrink-0">
          <h2 className="text-xl font-bold text-slate-900">Add New Item</h2>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-[#f5f0e6] rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
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
              {/* Name */}
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

            {/* Sizes */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Available Sizes</label>
              <div className="flex flex-wrap gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`w-12 h-12 rounded-xl text-sm font-semibold transition-all flex items-center justify-center ${
                      selectedSizes.includes(size)
                        ? 'bg-[#c5a880] text-white shadow-md'
                        : 'bg-white border border-[#f5f0e6] text-slate-600 hover:border-[#c5a880] hover:text-[#c5a880]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
              <textarea 
                rows={3}
                placeholder="Write a short description about the item..."
                className="w-full px-4 py-3 bg-white border border-[#f5f0e6] rounded-xl focus:outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] transition-all resize-none"
              ></textarea>
            </div>
            
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#f5f0e6] bg-[#fbf9f6] shrink-0 flex items-center justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 text-slate-600 hover:bg-[#f5f0e6] rounded-xl font-medium transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={(e) => {
              e.preventDefault();
              alert('Item added successfully! (Mock)');
              onClose();
            }}
            className="flex items-center gap-2 bg-[#c5a880] hover:bg-[#aa8c65] text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-md hover:shadow-lg"
          >
            <Plus size={18} />
            <span>Save Item</span>
          </button>
        </div>

      </div>
    </div>
  );
};
