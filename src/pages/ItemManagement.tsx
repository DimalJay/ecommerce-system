import React, { useState } from 'react';
import { Plus, Filter, ChevronDown } from 'lucide-react';
import { AppLayout } from '../components';
import { ItemTable, AddItemModal, UpdateItemModal, ConfirmDeleteModal, type AdminItem } from '../components/admin';
import { SearchInput } from '../components/ui';

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

  const handleEditItem = (item: AdminItem) => { setSelectedItem(item); setIsUpdateModalOpen(true); };
  const handleDeleteClick = (item: AdminItem) => { setSelectedItem(item); setIsDeleteModalOpen(true); };
  const handleConfirmDelete = (item: AdminItem) => { alert(`Item "${item.name}" deleted! (Mock)`); setIsDeleteModalOpen(false); setSelectedItem(null); };

  const getSortLabel = (val: string) => {
    switch (val) {
      case 'price-low': return 'Price: Low to High';
      case 'price-high': return 'Price: High to Low';
      case 'name-az': return 'Name: A-Z';
      default: return 'Default Order';
    }
  };

  const categories = ['All', 'Women', 'Men', 'Unisex', 'Kids'];

  return (
    <AppLayout>
      <main className="max-w-[1440px] mx-auto px-4 sm:px-8 w-full flex-1 py-10 space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Inventory Management</h1>
            <p className="text-slate-500 mt-1">Manage your store's inventory, prices, and availability.</p>
          </div>
          
          <button 
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-luxury-gold hover:bg-luxury-gold-dark text-white px-5 py-2.5 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
          >
            <Plus size={16} />
            <span>Add New Item</span>
          </button>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-luxury-sand">
          <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search items..." className="w-full sm:w-96" />

          <div className="flex flex-wrap items-center gap-3">
            {/* Category Filter Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => { setIsCategoryOpen(!isCategoryOpen); setIsSortOpen(false); }}
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-700 bg-luxury-cream border border-luxury-sand rounded-xl hover:bg-luxury-sand transition-colors cursor-pointer"
              >
                <Filter size={16} className="text-luxury-gold" />
                <span>Category: {categoryFilter}</span>
                <ChevronDown size={14} className={`transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCategoryOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-luxury-gold-light/30 rounded-xl shadow-xl p-1 z-30 space-y-0.5 animate-fade-in">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => { setCategoryFilter(cat); setIsCategoryOpen(false); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        categoryFilter === cat ? 'bg-luxury-sand text-luxury-gold-dark' : 'text-slate-600 hover:bg-luxury-cream'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => { setIsSortOpen(!isSortOpen); setIsCategoryOpen(false); }}
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-700 bg-luxury-cream border border-luxury-sand rounded-xl hover:bg-luxury-sand transition-colors cursor-pointer"
              >
                <span>Sort: {getSortLabel(sortBy)}</span>
                <ChevronDown size={14} className={`transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
              </button>

              {isSortOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-luxury-gold-light/30 rounded-xl shadow-xl p-1 z-30 space-y-0.5 animate-fade-in">
                  {[
                    { key: 'default', label: 'Default Order' },
                    { key: 'price-low', label: 'Price: Low to High' },
                    { key: 'price-high', label: 'Price: High to Low' },
                    { key: 'name-az', label: 'Name: A-Z' },
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => { setSortBy(opt.key); setIsSortOpen(false); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        sortBy === opt.key ? 'bg-luxury-sand text-luxury-gold-dark' : 'text-slate-600 hover:bg-luxury-cream'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
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
    </AppLayout>
  );
};

export default ItemManagement;
