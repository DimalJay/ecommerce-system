import React from 'react';
import { Edit2, Trash2, MoreVertical } from 'lucide-react';

export interface AdminItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

const mockItems: AdminItem[] = [
  {
    id: '1',
    name: 'Midnight Silk Slip Dress',
    sku: 'DR-SLK-001',
    category: 'Women',
    price: 185.00,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=150&q=80',
    status: 'In Stock'
  },
  {
    id: '2',
    name: 'Tailored Linen Blazer',
    sku: 'BZ-LIN-023',
    category: 'Men',
    price: 240.00,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=150&q=80',
    status: 'Low Stock'
  },
  {
    id: '3',
    name: 'Cashmere Blend Overcoat',
    sku: 'CT-CSH-005',
    category: 'Unisex',
    price: 495.00,
    stock: 0,
    image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&w=150&q=80',
    status: 'Out of Stock'
  },
  {
    id: '4',
    name: 'Pleated Wide-Leg Trousers',
    sku: 'TR-PLT-012',
    category: 'Women',
    price: 125.00,
    stock: 32,
    image: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=150&q=80',
    status: 'In Stock'
  }
];

interface ItemTableProps {
  onEdit: (item: AdminItem) => void;
  onDelete: (item: AdminItem) => void;
}

export const ItemTable: React.FC<ItemTableProps> = ({ onEdit, onDelete }) => {
  return (
    <div className="w-full bg-white rounded-3xl shadow-xs border border-luxury-gold-light/30 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-luxury-sand/50 text-slate-700 text-xs font-black uppercase tracking-wider border-b border-luxury-gold-light/30">
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-luxury-gold-light/20">
            {mockItems.map((item) => (
              <tr key={item.id} className="hover:bg-luxury-cream/50 transition-colors duration-150 group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-12 h-12 rounded-xl object-cover border border-luxury-gold-light/30 shadow-2xs"
                    />
                    <div>
                      <p className="font-bold text-luxury-charcoal group-hover:text-luxury-gold transition-colors text-xs sm:text-sm">{item.name}</p>
                      <p className="text-[11px] font-mono text-slate-400 mt-0.5">SKU: {item.sku}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">{item.category}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-extrabold text-luxury-charcoal text-xs sm:text-sm">Rs. {item.price.toFixed(2)}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-medium text-slate-600">{item.stock} units</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
                    item.status === 'In Stock' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
                      : item.status === 'Low Stock'
                      ? 'bg-amber-50 text-amber-700 border-amber-200/80'
                      : 'bg-rose-50 text-rose-700 border-rose-200/80'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1.5">
                    <button 
                      type="button"
                      onClick={() => onEdit(item)}
                      className="p-2 text-slate-400 hover:text-luxury-gold hover:bg-luxury-sand/60 rounded-xl transition-colors duration-200 cursor-pointer active:scale-95"
                      title="Edit Item"
                      aria-label="Edit Item"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      type="button"
                      onClick={() => onDelete(item)}
                      className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors duration-200 cursor-pointer active:scale-95"
                      title="Delete Item"
                      aria-label="Delete Item"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button 
                      type="button"
                      className="p-2 text-slate-400 hover:text-luxury-charcoal hover:bg-slate-100 rounded-xl transition-colors duration-200 cursor-pointer active:scale-95"
                      title="More Options"
                      aria-label="More Options"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="px-6 py-4 bg-white border-t border-luxury-gold-light/20 flex items-center justify-between">
        <p className="text-xs text-slate-500 font-medium">
          Showing <span className="font-bold text-luxury-charcoal">1</span> to <span className="font-bold text-luxury-charcoal">4</span> of <span className="font-bold text-luxury-charcoal">4</span> items
        </p>
        <div className="flex gap-2">
          <button type="button" className="px-3 py-1.5 text-xs font-bold border border-luxury-gold-light/30 text-slate-400 rounded-xl cursor-not-allowed opacity-60">
            Previous
          </button>
          <button type="button" className="px-3 py-1.5 text-xs font-bold border border-luxury-gold-light/30 text-slate-400 rounded-xl cursor-not-allowed opacity-60">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
