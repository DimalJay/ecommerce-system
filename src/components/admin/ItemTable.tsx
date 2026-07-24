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

export const ItemTable: React.FC = () => {
  return (
    <div className="w-full bg-white rounded-3xl shadow-sm border border-[#f5f0e6] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#fbf9f6] text-slate-500 text-sm uppercase tracking-wider border-b border-[#f5f0e6]">
              <th className="px-6 py-4 font-semibold">Product</th>
              <th className="px-6 py-4 font-semibold">Category</th>
              <th className="px-6 py-4 font-semibold">Price</th>
              <th className="px-6 py-4 font-semibold">Stock</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f5f0e6]">
            {mockItems.map((item) => (
              <tr key={item.id} className="hover:bg-[#fbf9f6] transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-12 h-12 rounded-xl object-cover border border-[#f5f0e6]"
                    />
                    <div>
                      <p className="font-semibold text-slate-900 group-hover:text-[#c5a880] transition-colors">{item.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">SKU: {item.sku}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-slate-600">{item.category}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-medium text-slate-900">${item.price.toFixed(2)}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-slate-600">{item.stock} units</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                    item.status === 'In Stock' 
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                      : item.status === 'Low Stock'
                      ? 'bg-amber-50 text-amber-600 border-amber-100'
                      : 'bg-rose-50 text-rose-600 border-rose-100'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      className="p-2 text-slate-400 hover:text-[#c5a880] hover:bg-[#f5f0e6] rounded-lg transition-colors"
                      title="Edit Item"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete Item"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button 
                      className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                      title="More Options"
                    >
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination / Footer */}
      <div className="px-6 py-4 bg-white border-t border-[#f5f0e6] flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of <span className="font-medium">4</span> items
        </p>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm border border-[#f5f0e6] text-slate-400 rounded-lg cursor-not-allowed">
            Previous
          </button>
          <button className="px-3 py-1 text-sm border border-[#f5f0e6] text-slate-400 rounded-lg cursor-not-allowed">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
