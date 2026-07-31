import React from 'react';
import { Edit2, Trash2, ShoppingBag } from 'lucide-react';
import type { AdminItem } from '../../types';

interface ItemTableProps {
  items: AdminItem[];
  onEdit: (item: AdminItem) => void;
  onDelete: (item: AdminItem) => void;
  searchQuery: string;
  categoryFilter: string;
  sortBy: string;
}

export const ItemTable: React.FC<ItemTableProps> = ({
  items,
  onEdit,
  onDelete,
  searchQuery,
  categoryFilter,
  sortBy
}) => {
  const filteredItems = items
    .filter((item) => {
      if (categoryFilter !== 'All' && item.category.toLowerCase() !== categoryFilter.toLowerCase()) {
        return false;
      }
      const query = searchQuery.toLowerCase().trim();
      if (!query) return true;
      return (
        item.name.toLowerCase().includes(query) ||
        item.sku.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'name-az') return a.name.localeCompare(b.name);
      return 0;
    });

  if (filteredItems.length === 0) {
    return (
      <div className="w-full bg-white rounded-3xl shadow-xs border border-luxury-gold-light/30 p-12 text-center">
        <div className="w-16 h-16 bg-luxury-sand/40 text-luxury-charcoal rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingBag size={28} />
        </div>
        <h3 className="text-lg font-bold text-luxury-charcoal uppercase tracking-wider">No Products Found</h3>
        <p className="text-text-muted text-xs max-w-sm mx-auto mt-2">
          {items.length === 0
            ? 'Your inventory is empty. Add your first product to get started.'
            : 'No products match your current search or filter.'}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-3xl shadow-xs border border-luxury-gold-light/30 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-luxury-sand/50 text-text-primary text-xs font-black uppercase tracking-wider border-b border-luxury-gold-light/30">
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-luxury-gold-light/20">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-luxury-cream/50 transition-colors duration-150 group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-xl object-cover border border-luxury-gold-light/30 shadow-xs"
                    />
                    <div>
                      <p className="font-bold text-luxury-charcoal group-hover:text-luxury-gold transition-colors text-xs sm:text-sm">{item.name}</p>
                      <p className="text-[11px] font-mono text-text-muted mt-1">SKU: {item.sku}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">{item.category}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-extrabold text-luxury-charcoal text-xs sm:text-sm">Rs. {item.price.toFixed(2)}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-medium text-text-secondary">{item.stock} units</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${item.status === 'In Stock'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
                    : item.status === 'Low Stock'
                      ? 'bg-amber-50 text-amber-700 border-amber-200/80'
                      : 'bg-rose-50 text-rose-700 border-rose-200/80'
                    }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(item)}
                      className="p-2 text-text-muted hover:text-luxury-gold hover:bg-luxury-sand/60 rounded-xl transition-colors duration-200 cursor-pointer active:scale-95"
                      title="Edit Item"
                      aria-label="Edit Item"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(item)}
                      className="p-2 text-text-muted hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors duration-200 cursor-pointer active:scale-95"
                      title="Delete Item"
                      aria-label="Delete Item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 bg-white border-t border-luxury-gold-light/20 flex items-center justify-between">
        <p className="text-xs text-text-secondary font-medium">
          Showing <span className="font-bold text-luxury-charcoal">{filteredItems.length > 0 ? 1 : 0}</span> to <span className="font-bold text-luxury-charcoal">{filteredItems.length}</span> of <span className="font-bold text-luxury-charcoal">{filteredItems.length}</span> items
        </p>
      </div>
    </div>
  );
};
