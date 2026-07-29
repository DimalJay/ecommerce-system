import React, { useState } from 'react';
import { Plus, Search, ChevronDown } from 'lucide-react';
import { AdminNavbar } from '../components/admin/AdminNavbar';
import { ItemTable, type AdminItem } from '../components/admin/ItemTable';
import { AddItemModal } from '../components/admin/AddItemModal';
import { UpdateItemModal } from '../components/admin/UpdateItemModal';
import { ConfirmDeleteModal } from '../components/admin/ConfirmDeleteModal';

export const ItemManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AdminItem | null>(null);

  // Dropdown open states
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const handleEditItem = (item: AdminItem) => {
    setSelectedItem(item);
    setIsUpdateModalOpen(true);
  };

  const handleDeleteClick = (item: AdminItem) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = (item: AdminItem) => {
    alert(`Item "${item.name}" deleted! (Mock)`);
    setIsDeleteModalOpen(false);
    setSelectedItem(null);
  };

  const getSortLabel = (val: string) => {
    switch (val) {
      case 'price-low': return 'Price: Low to High';
      case 'price-high': return 'Price: High to Low';
      case 'name-az': return 'Name: A-Z';
      default: return 'Default Order';
    }
  };

  return (
    <div className="min-h-screen bg-luxury-cream text-slate-900 flex flex-col font-sans">
      <AdminNavbar />

      <main className="max-w-[1440px] mx-auto px-4 sm:px-8 w-full flex-1 py-10 space-y-8">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-luxury-gold-light/20 pb-6 gap-4 text-left">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Inventory Management</h1>
            <p className="text-slate-500 mt-1">Manage your store's inventory, prices, and availability.</p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-luxury-gold hover:bg-luxury-gold-dark text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Plus size={16} />
            <span>Add New Item</span>
          </button>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-luxury-sand/55 z-30 relative">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search items by name, SKU, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-luxury-cream border border-luxury-sand rounded-full focus:outline-none focus:border-luxury-gold text-xs font-semibold"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Custom Category Dropdown */}
            <div className="relative w-44">
              <button
                type="button"
                onClick={() => {
                  setIsCategoryOpen(!isCategoryOpen);
                  setIsSortOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-luxury-gold-light/30 rounded-xl focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold/25 transition-all text-xs font-bold text-slate-600 cursor-pointer focus:outline-none"
              >
                <span>{categoryFilter === 'All' ? 'All Categories' : categoryFilter}</span>
                <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCategoryOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setIsCategoryOpen(false)} />
                  <div className="absolute left-0 mt-1.5 w-full bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-40 text-left py-1 animate-fade-in">
                    {['All', 'Women', 'Men', 'Unisex'].map((cat) => {
                      const isSelected = categoryFilter === cat;
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => {
                            setCategoryFilter(cat);
                            setIsCategoryOpen(false);
                          }}
                          className={`block w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors cursor-pointer ${
                            isSelected 
                              ? 'bg-luxury-charcoal text-white font-bold' 
                              : 'text-slate-600 hover:bg-luxury-sand/30'
                          }`}
                        >
                          {cat === 'All' ? 'All Categories' : cat}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Custom Sort Dropdown */}
            <div className="relative w-44">
              <button
                type="button"
                onClick={() => {
                  setIsSortOpen(!isSortOpen);
                  setIsCategoryOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-luxury-gold-light/30 rounded-xl focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold/25 transition-all text-xs font-bold text-slate-600 cursor-pointer focus:outline-none"
              >
                <span>{getSortLabel(sortBy)}</span>
                <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} />
              </button>

              {isSortOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setIsSortOpen(false)} />
                  <div className="absolute left-0 mt-1.5 w-full bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-40 text-left py-1 animate-fade-in">
                    {[
                      { val: 'default', label: 'Default Order' },
                      { val: 'price-low', label: 'Price: Low to High' },
                      { val: 'price-high', label: 'Price: High to Low' },
                      { val: 'name-az', label: 'Name: A-Z' }
                    ].map((opt) => {
                      const isSelected = sortBy === opt.val;
                      return (
                        <button
                          key={opt.val}
                          type="button"
                          onClick={() => {
                            setSortBy(opt.val);
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

        {/* Table Area */}
        <ItemTable
          onEdit={handleEditItem}
          onDelete={handleDeleteClick}
          searchQuery={searchQuery}
          categoryFilter={categoryFilter}
          sortBy={sortBy}
        />

      </main>

      {/* Modals */}
      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <UpdateItemModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedItem(null);
        }}
        item={selectedItem}
      />
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedItem(null);
        }}
        onConfirm={handleConfirmDelete}
        item={selectedItem}
      />
    </div>
  );
};

export default ItemManagement;
