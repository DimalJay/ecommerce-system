import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { ModalShell } from '../ui';
import { SizeToggleGrid } from './SizeToggleGrid';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: {
    name: string;
    sku: string;
    category: string;
    price: number;
    stock: number;
    image: string;
    selectedSizes: string[];
    description: string;
  }) => void;
}

export const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const handleToggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    onSave({
      name,
      sku,
      category,
      price: parseFloat(price) || 0,
      stock: parseInt(stock) || 0,
      image: image || 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=150&q=80',
      selectedSizes,
      description,
    });
    setName('');
    setSku('');
    setCategory('');
    setPrice('');
    setStock('');
    setImage('');
    setDescription('');
    setSelectedSizes([]);
    onClose();
  };

  const footer = (
    <>
      <button
        type="button"
        onClick={onClose}
        className="px-5 py-3 text-text-secondary hover:bg-bg-secondary rounded-lg font-medium transition-colors cursor-pointer"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={handleSave}
        className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-elevated px-6 py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg cursor-pointer"
      >
        <Plus size={18} />
        <span>Save Item</span>
      </button>
    </>
  );

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} title="Add New Item" footer={footer}>
      <form className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Item Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            className="w-full px-4 py-3 bg-elevated border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Item Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Silk Evening Dress"
              className="w-full px-4 py-3 bg-elevated border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">SKU</label>
            <input
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              placeholder="e.g. DR-SLK-002"
              className="w-full px-4 py-3 bg-elevated border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-elevated border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
            >
              <option value="">Select Category</option>
              <option value="Women">Women</option>
              <option value="Men">Men</option>
              <option value="Kids">Kids</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Price (Rs.)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 bg-elevated border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Stock</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="0"
                className="w-full px-4 py-3 bg-elevated border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Available Sizes</label>
          <SizeToggleGrid selectedSizes={selectedSizes} onToggle={handleToggleSize} />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Description</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a short description about the item..."
            className="w-full px-4 py-3 bg-elevated border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all resize-none"
          />
        </div>
      </form>
    </ModalShell>
  );
};
