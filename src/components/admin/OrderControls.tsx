import React, { useState } from 'react';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';

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
  const [isSortOpen, setIsSortOpen] = useState(false);

  const getSortLabel = (val: string) => {
    switch (val) {
      case 'oldest': return 'Oldest Orders';
      case 'value-high': return 'Order Value: High to Low';
      case 'value-low': return 'Order Value: Low to High';
      default: return 'Newest Orders';
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 justify-between bg-white p-4 rounded-2xl shadow-xs border border-luxury-sand/55 z-30 relative">
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
            className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer border ${statusFilter === status
                ? 'bg-luxury-charcoal text-white border-luxury-charcoal'
                : 'bg-luxury-cream text-slate-600 border-luxury-sand hover:bg-luxury-sand/30'
              }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Custom Sort dropdown */}
      <div className="flex items-center gap-2 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100 relative">
        <SlidersHorizontal size={14} className="text-slate-400" />
        <div className="relative w-48">
          <button
            type="button"
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-luxury-gold-light/30 rounded-xl focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold/25 transition-all text-xs font-bold text-slate-600 cursor-pointer focus:outline-none"
          >
            <span>{getSortLabel(sortBy)}</span>
            <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} />
          </button>

          {isSortOpen && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setIsSortOpen(false)} />
              <div className="absolute right-0 mt-1.5 w-full bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-40 text-left py-1 animate-fade-in">
                {[
                  { val: 'newest', label: 'Newest Orders' },
                  { val: 'oldest', label: 'Oldest Orders' },
                  { val: 'value-high', label: 'Order Value: High to Low' },
                  { val: 'value-low', label: 'Order Value: Low to High' }
                ].map((opt) => {
                  const isSelected = sortBy === opt.val;
                  return (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => {
                        setSortBy(opt.val as any);
                        setIsSortOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors cursor-pointer ${
                        isSelected 
                          ? 'bg-luxury-charcoal text-white font-bold' 
                          : 'text-slate-600 hover:bg-luxury-sand/30'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderControls;
