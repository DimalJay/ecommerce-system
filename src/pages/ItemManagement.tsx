import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
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
        <div className="flex flex-col sm:flex-row justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-luxury-sand/55">
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
            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2.5 bg-luxury-cream border border-luxury-gold-light/30 focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold/25 transition-all text-xs font-bold text-slate-600 rounded-full cursor-pointer focus:outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Women">Women</option>
              <option value="Men">Men</option>
              <option value="Unisex">Unisex</option>
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 bg-luxury-cream border border-luxury-gold-light/30 focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold/25 transition-all text-xs font-bold text-slate-600 rounded-full cursor-pointer focus:outline-none"
            >
              <option value="default">Default Order</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-az">Name: A-Z</option>
            </select>
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
