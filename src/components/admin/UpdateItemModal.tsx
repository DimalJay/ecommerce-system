import React, { useState, useEffect } from 'react';
import { X, Upload, Save } from 'lucide-react';
import type { AdminItem } from './ItemTable';

interface UpdateItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: AdminItem | null;
}

export const UpdateItemModal: React.FC<UpdateItemModalProps> = ({ isOpen, onClose, item }) => {
  const [selectedSizes, setSelectedSizes] = useState<string[]>(['M', 'L']); // Mock pre-selected
  
  // Local state for the form (to simulate pre-filling)
  const [formData, setFormData] = useState<Partial<AdminItem>>({});

  useEffect(() => {
    if (item && isOpen) {
      setFormData(item);
    }
  }, [item, isOpen]);
  
  if (!isOpen || !item) return null;

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
          <h2 className="text-xl font-bold text-slate-900">Edit Item</h2>
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
            
            {/* Image Upload Area with Preview */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Item Image</label>
              <div className="relative w-full h-48 rounded-2xl overflow-hidden border-2 border-[#dfd3c3] group">
                <img 
                  src={formData.image} 
                  alt={formData.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer backdrop-blur-sm">
                  <Upload size={28} className="mb-2" />
                  <span className="font-medium">Change Image</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Item Name</label>
                <input 
                  type="text" 
                  value={formData.name || ''}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white border border-[#f5f0e6] rounded-xl focus:outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] transition-all"
                />
              </div>

              {/* SKU */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">SKU</label>
                <input 
                  type="text" 
                  value={formData.sku || ''}
                  onChange={(e) => setFormData({...formData, sku: e.target.value})}
                  className="w-full px-4 py-2.5 bg-[#fbf9f6] border border-[#f5f0e6] rounded-xl focus:outline-none text-slate-500 cursor-not-allowed"
                  disabled
                />
                <p className="text-xs text-slate-400 mt-1">SKU cannot be changed.</p>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                <select 
                  value={formData.category?.toLowerCase() || ''}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
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
                    onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                    className="w-full px-4 py-2.5 bg-white border border-[#f5f0e6] rounded-xl focus:outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Stock</label>
                  <input 
                    type="number" 
                    value={formData.stock || 0}
                    onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value)})}
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
                defaultValue={`Premium quality ${formData.category?.toLowerCase()} clothing item.`}
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
              alert(`Changes saved for ${formData.name}! (Mock)`);
              onClose();
            }}
            className="flex items-center gap-2 bg-[#c5a880] hover:bg-[#aa8c65] text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-md hover:shadow-lg"
          >
            <Save size={18} />
            <span>Save Changes</span>
          </button>
        </div>

      </div>
    </div>
  );
};
