import { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { AppLayout } from '../components';
import { ItemTable, AddItemModal, UpdateItemModal, ConfirmDeleteModal, type AdminItem } from '../components/admin';
import { SearchInput } from '../components/ui';

export const ItemManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AdminItem | null>(null);

  const handleEditItem = (item: AdminItem) => { setSelectedItem(item); setIsUpdateModalOpen(true); };
  const handleDeleteClick = (item: AdminItem) => { setSelectedItem(item); setIsDeleteModalOpen(true); };
  const handleConfirmDelete = (item: AdminItem) => { alert(`Item "${item.name}" deleted! (Mock)`); setIsDeleteModalOpen(false); setSelectedItem(null); };

  return (
    <AppLayout>
      <main className="max-w-[1440px] mx-auto px-4 sm:px-8 w-full flex-1 py-10 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Item Management</h1>
            <p className="text-slate-500 mt-1">Manage your store's inventory, prices, and availability.</p>
          </div>
          <button onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-luxury-gold hover:bg-luxury-gold-dark text-white px-5 py-2.5 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
          >
            <Plus size={20} />
            <span>Add New Item</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-luxury-sand">
          <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search items..." className="w-full sm:w-96" />
          <button className="flex items-center gap-2 px-4 py-2 text-slate-600 bg-luxury-cream border border-luxury-sand rounded-xl hover:bg-luxury-sand transition-colors cursor-pointer">
            <Filter size={20} />
            <span>Filter</span>
          </button>
        </div>

        <ItemTable onEdit={handleEditItem} onDelete={handleDeleteClick} />
      </main>

      <AddItemModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <UpdateItemModal isOpen={isUpdateModalOpen} onClose={() => { setIsUpdateModalOpen(false); setSelectedItem(null); }} item={selectedItem} />
      <ConfirmDeleteModal isOpen={isDeleteModalOpen} onClose={() => { setIsDeleteModalOpen(false); setSelectedItem(null); }} onConfirm={handleConfirmDelete} item={selectedItem} />
    </AppLayout>
  );
};

export default ItemManagement;
