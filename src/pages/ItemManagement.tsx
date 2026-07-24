import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Navbar, Footer } from '../components';

export const ItemManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#fafaf9] text-slate-900 flex flex-col font-sans">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        wishlistCount={0}
        cartCount={0}
        onOpenCart={() => {}}
        onOpenWishlist={() => {}}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-8 w-full flex-1 py-10 space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Item Management</h1>
            <p className="text-slate-500 mt-1">Manage your store's inventory, prices, and availability.</p>
          </div>
          
          <button 
            className="flex items-center gap-2 bg-[#c5a880] hover:bg-[#aa8c65] text-white px-5 py-2.5 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Plus size={20} />
            <span>Add New Item</span>
          </button>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-[#f5f0e6]">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search items..." 
              className="w-full pl-10 pr-4 py-2 bg-[#fbf9f6] border border-[#f5f0e6] rounded-xl focus:outline-none focus:border-[#c5a880] transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-slate-600 bg-[#fbf9f6] border border-[#f5f0e6] rounded-xl hover:bg-[#f5f0e6] transition-colors">
            <Filter size={20} />
            <span>Filter</span>
          </button>
        </div>

        {/* Table Area (Placeholder for ItemTable component) */}
        <div className="bg-white rounded-3xl shadow-sm border border-[#f5f0e6] overflow-hidden min-h-[400px] flex items-center justify-center">
           <p className="text-slate-400">Item Table will be rendered here...</p>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default ItemManagement;
