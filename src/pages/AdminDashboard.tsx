import React, { useState } from 'react';
import { ShoppingBag, Package, Plus, RefreshCw, Boxes, TrendingUp } from 'lucide-react';
import { AdminNavbar } from '../components/admin/AdminNavbar';
import { AdminOrderCard } from '../components/admin/AdminOrderCard';
import { ItemTable, AddItemModal, UpdateItemModal, ConfirmDeleteModal } from '../components/admin';
import { SearchInput } from '../components/ui';
import type { Order } from '../types';
import type { AdminItem } from '../types';

const STORAGE_ORDERS_KEY = 'orders';
const STORAGE_PRODUCTS_KEY = 'admin-products';

const SEED_PRODUCTS: AdminItem[] = [
  {
    id: '1',
    name: 'Midnight Silk Slip Dress',
    sku: 'DR-SLK-001',
    category: 'Women',
    price: 185.00,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=150&q=80',
    status: 'In Stock',
    description: 'Elegant silk slip dress with a subtle sheen, perfect for evening occasions.',
  },
  {
    id: '2',
    name: 'Tailored Linen Blazer',
    sku: 'BZ-LIN-023',
    category: 'Men',
    price: 240.00,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=150&q=80',
    status: 'Low Stock',
    description: 'Lightweight linen blazer for a sharp yet breathable look.',
  },
  {
    id: '3',
    name: 'Cashmere Blend Overcoat',
    sku: 'CT-CSH-005',
    category: 'Unisex',
    price: 495.00,
    stock: 0,
    image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&w=150&q=80',
    status: 'Out of Stock',
    description: 'Luxurious cashmere blend overcoat for cold-weather elegance.',
  },
  {
    id: '4',
    name: 'Pleated Wide-Leg Trousers',
    sku: 'TR-PLT-012',
    category: 'Women',
    price: 125.00,
    stock: 32,
    image: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=150&q=80',
    status: 'In Stock',
    description: 'Flowing wide-leg trousers with pleated front detail.',
  },
];

function loadProducts(): AdminItem[] {
  try {
    const data = localStorage.getItem(STORAGE_PRODUCTS_KEY);
    if (data) return JSON.parse(data);
  } catch { /* ignore */ }
  localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(SEED_PRODUCTS));
  return SEED_PRODUCTS;
}

function saveProducts(items: AdminItem[]) {
  localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(items));
}

function loadOrders(): Order[] {
  try {
    const data = localStorage.getItem(STORAGE_ORDERS_KEY);
    if (data) return JSON.parse(data);
  } catch { /* ignore */ }
  return [];
}

function saveOrders(orders: Order[]) {
  localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(orders));
}

type Tab = 'orders' | 'products';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('orders');

  const [products, setProducts] = useState<AdminItem[]>(loadProducts);
  const [orders, setOrders] = useState<Order[]>(loadOrders);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AdminItem | null>(null);

  const [orderSearchQuery, setOrderSearchQuery] = useState('');

  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const processingCount = orders.filter((o) => o.status === 'Processing').length;
  const lowStockCount = products.filter((p) => p.status === 'Low Stock' || p.status === 'Out of Stock').length;

  const handleAddProduct = (data: { name: string; sku: string; category: string; price: number; stock: number; image: string; description: string }) => {
    const newItem: AdminItem = {
      id: Date.now().toString(),
      name: data.name,
      sku: data.sku,
      category: data.category,
      price: data.price,
      stock: data.stock,
      image: data.image,
      description: data.description,
      status: data.stock <= 0 ? 'Out of Stock' : data.stock < 10 ? 'Low Stock' : 'In Stock',
    };
    const updated = [...products, newItem];
    setProducts(updated);
    saveProducts(updated);
  };

  const handleUpdateProduct = (item: AdminItem) => {
    const updated = products.map((p) =>
      p.id === item.id ? { ...p, ...item, status: item.stock <= 0 ? 'Out of Stock' as const : item.stock < 10 ? 'Low Stock' as const : 'In Stock' as const } : p
    );
    setProducts(updated);
    saveProducts(updated);
  };

  const handleDeleteProduct = (item: AdminItem) => {
    const updated = products.filter((p) => p.id !== item.id);
    setProducts(updated);
    saveProducts(updated);
    setSelectedItem(null);
  };

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    const updated = orders.map((o) => o.id === orderId ? { ...o, status: newStatus } : o);
    setOrders(updated);
    saveOrders(updated);
  };

  const toggleExpandOrder = (id: string) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  const filteredOrders = orders.filter((order) => {
    const query = orderSearchQuery.toLowerCase().trim();
    if (!query) return true;
    const name = `${order.shippingInfo?.firstName || ''} ${order.shippingInfo?.lastName || ''}`.toLowerCase();
    const email = (order.shippingInfo?.email || '').toLowerCase();
    const id = order.id.toLowerCase();
    return name.includes(query) || email.includes(query) || id.includes(query);
  }).sort((a, b) => b.id.localeCompare(a.id));

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
    <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col font-sans">
      <AdminNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 py-8 sm:py-10 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Admin Dashboard</h1>
            <p className="text-text-muted text-sm mt-1">Manage orders and inventory from one place.</p>
          </div>
          <button
            onClick={() => { setOrders(loadOrders()); setProducts(loadProducts()); }}
            className="flex items-center gap-2 bg-luxury-gold hover:bg-luxury-gold-dark text-white px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
          >
            <RefreshCw size={14} />
            <span>Refresh</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-luxury-gold-light/20 rounded-2xl p-5 flex items-center gap-4 shadow-xs">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <ShoppingBag size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold text-luxury-charcoal">{orders.length}</p>
              <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Total Orders</p>
            </div>
          </div>
          <div className="bg-white border border-luxury-gold-light/20 rounded-2xl p-5 flex items-center gap-4 shadow-xs">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
              <TrendingUp size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold text-luxury-charcoal">Rs. {totalSales.toLocaleString()}</p>
              <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Total Sales</p>
            </div>
          </div>
          <div className="bg-white border border-luxury-gold-light/20 rounded-2xl p-5 flex items-center gap-4 shadow-xs">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
              <Package size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold text-luxury-charcoal">{products.length}</p>
              <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Products</p>
            </div>
          </div>
          <div className="bg-white border border-luxury-gold-light/20 rounded-2xl p-5 flex items-center gap-4 shadow-xs">
            <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
              <Boxes size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold text-luxury-charcoal">{processingCount + lowStockCount}</p>
              <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Needs Attention</p>
            </div>
          </div>
        </div>

        <div className="border-b border-border">
          <div className="flex gap-0">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-3 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
                activeTab === 'orders'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-text-muted hover:text-text-secondary'
              }`}
            >
              <ShoppingBag size={16} className="inline mr-2" />
              Orders
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-6 py-3 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
                activeTab === 'products'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-text-muted hover:text-text-secondary'
              }`}
            >
              <Package size={16} className="inline mr-2" />
              Products
            </button>
          </div>
        </div>

        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <SearchInput value={orderSearchQuery} onChange={setOrderSearchQuery} placeholder="Search orders by ID, name, email..." className="w-full sm:w-96" />
            </div>

            {filteredOrders.length === 0 ? (
              <div className="bg-white border border-luxury-gold-light/20 rounded-3xl p-12 text-center space-y-4">
                <div className="w-16 h-16 bg-luxury-sand/40 text-luxury-gold rounded-full flex items-center justify-center mx-auto">
                  <ShoppingBag size={28} />
                </div>
                <h3 className="text-lg font-bold text-luxury-charcoal uppercase tracking-wider">No Orders Found</h3>
                <p className="text-text-muted text-xs max-w-sm mx-auto">
                  {orders.length === 0
                    ? 'There are currently no orders placed in the system.'
                    : 'No orders match your search query.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <AdminOrderCard
                    key={order.id}
                    order={order}
                    isExpanded={expandedOrderId === order.id}
                    onToggleExpand={() => toggleExpandOrder(order.id)}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-luxury-sand">
              <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search items..." className="w-full sm:w-96" />

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => { setIsCategoryOpen(!isCategoryOpen); setIsSortOpen(false); }}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-text-primary bg-luxury-cream border border-luxury-sand rounded-xl hover:bg-luxury-sand transition-colors cursor-pointer"
                  >
                    <span>Category: {categoryFilter}</span>
                    <RefreshCw size={12} className={`transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isCategoryOpen && (
                    <div className="absolute right-0 mt-2 w-44 bg-white border border-luxury-gold-light/30 rounded-xl shadow-xl p-1 z-30 space-y-1 animate-fade-in">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => { setCategoryFilter(cat); setIsCategoryOpen(false); }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                            categoryFilter === cat ? 'bg-luxury-sand text-luxury-gold-dark' : 'text-text-secondary hover:bg-luxury-cream'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => { setIsSortOpen(!isSortOpen); setIsCategoryOpen(false); }}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-text-primary bg-luxury-cream border border-luxury-sand rounded-xl hover:bg-luxury-sand transition-colors cursor-pointer"
                  >
                    <span>Sort: {getSortLabel(sortBy)}</span>
                    <RefreshCw size={12} className={`transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isSortOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-luxury-gold-light/30 rounded-xl shadow-xl p-1 z-30 space-y-1 animate-fade-in">
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
                            sortBy === opt.key ? 'bg-luxury-sand text-luxury-gold-dark' : 'text-text-secondary hover:bg-luxury-cream'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(true)}
                  className="flex items-center gap-2 bg-luxury-gold hover:bg-luxury-gold-dark text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Add Product</span>
                </button>
              </div>
            </div>

            <ItemTable
              items={products}
              onEdit={(item) => { setSelectedItem(item); setIsUpdateModalOpen(true); }}
              onDelete={(item) => { setSelectedItem(item); setIsDeleteModalOpen(true); }}
              searchQuery={searchQuery}
              categoryFilter={categoryFilter}
              sortBy={sortBy}
            />
          </div>
        )}
      </main>

      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddProduct}
      />
      <UpdateItemModal
        isOpen={isUpdateModalOpen}
        onClose={() => { setIsUpdateModalOpen(false); setSelectedItem(null); }}
        item={selectedItem}
        onSave={handleUpdateProduct}
      />
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => { setIsDeleteModalOpen(false); setSelectedItem(null); }}
        onConfirm={handleDeleteProduct}
        item={selectedItem}
      />
    </div>
  );
};

export default AdminDashboard;
