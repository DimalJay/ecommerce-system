import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Navbar, Footer } from '../components';
import { ItemTable, type AdminItem } from '../components/admin/ItemTable';
import { AddItemModal } from '../components/admin/AddItemModal';
import { UpdateItemModal } from '../components/admin/UpdateItemModal';
import { ConfirmDeleteModal } from '../components/admin/ConfirmDeleteModal';

export const ItemManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
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
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-luxury-gold hover:bg-luxury-gold-dark text-white px-5 py-2.5 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Plus size={20} />
            <span>Add New Item</span>
          </button>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-luxury-sand">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search items..." 
              className="w-full pl-10 pr-4 py-2 bg-luxury-cream border border-luxury-sand rounded-xl focus:outline-none focus:border-luxury-gold transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-slate-600 bg-luxury-cream border border-luxury-sand rounded-xl hover:bg-luxury-sand transition-colors">
            <Filter size={20} />
            <span>Filter</span>
          </button>
        </div>

        {/* Table Area */}
        <ItemTable onEdit={handleEditItem} onDelete={handleDeleteClick} />

      </main>

      <Footer />
      
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
