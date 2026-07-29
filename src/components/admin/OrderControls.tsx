import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

interface OrderControlsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  sortBy: 'newest' | 'oldest' | 'value-high' | 'value-low';
  setSortBy: (sort: 'newest' | 'oldest' | 'value-high' | 'value-low') => void;
}

export const OrderControls: React.FC<OrderControlsProps> = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 justify-between bg-white p-4 rounded-2xl shadow-xs border border-luxury-sand/55">
      {/* Search bar */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input
          type="text"
          placeholder="Search by Order ID, customer name, email, or city..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-luxury-cream border border-luxury-sand rounded-xl focus:outline-none focus:border-luxury-gold text-xs font-semibold"
        />
      </div>

      {/* Status filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-1 hidden sm:inline-block">
          Filter Status:
        </span>
        {['All', 'Processing', 'Shipped', 'Delivered'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer border ${
              statusFilter === status
                ? 'bg-luxury-charcoal text-white border-luxury-charcoal'
                : 'bg-luxury-cream text-slate-600 border-luxury-sand hover:bg-luxury-sand/30'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Sort dropdown */}
      <div className="flex items-center gap-2 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100">
        <SlidersHorizontal size={14} className="text-slate-400" />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="bg-luxury-cream border border-luxury-sand rounded-xl px-3 py-2 text-xs font-bold text-slate-600 focus:outline-none focus:border-luxury-gold"
        >
          <option value="newest">Newest Orders</option>
          <option value="oldest">Oldest Orders</option>
          <option value="value-high">Order Value: High to Low</option>
          <option value="value-low">Order Value: Low to High</option>
        </select>
      </div>
    </div>
  );
};

export default OrderControls;
