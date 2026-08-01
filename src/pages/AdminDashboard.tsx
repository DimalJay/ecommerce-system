import React, { useState } from 'react';
import { ShoppingBag, Package, Plus, RefreshCw, Boxes, TrendingUp } from 'lucide-react';
import {
  AdminSidebar,
  ADMIN_NAV_ITEMS,
  AdminOrderCard,
  AdminProductTable,
  AddProductModal,
  UpdateProductModal,
  ConfirmDeleteModal,
  ProductPreviewModal,
} from '../components/admin';
import type { AdminTab } from '../components/admin';
import { SearchInput } from '../components/ui';
import type { Order } from '../types';
import type { AdminItem } from '../types';
import { useAdminProducts } from '../hooks/useAdminProduct';

const STORAGE_ORDERS_KEY = 'orders';

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

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('orders');

  const {
    data: products = [],
    isLoading: isProductsLoading,
    isError: isProductsError,
    refetch: refetchProducts,
  } = useAdminProducts();
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
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AdminItem | null>(null);

  const [orderSearchQuery, setOrderSearchQuery] = useState('');

  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const processingCount = orders.filter((o) => o.status === 'Processing').length;
  const lowStockCount = products.filter((p) => p.status === 'Low Stock' || p.status === 'Out of Stock').length;

  const handleAddProduct = () => {
    setIsAddModalOpen(false);
  };

  const handleUpdateProduct = () => {
    setIsUpdateModalOpen(false);
    setSelectedItem(null);
  };

  const handleDeleteProduct = () => {
    setIsDeleteModalOpen(false);
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

  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category).filter(Boolean)))];

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary font-sans lg:flex">
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 min-w-0 flex flex-col">
        <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Admin Dashboard</h1>
              <p className="text-text-muted text-sm mt-1">Manage orders and inventory from one place.</p>
            </div>
            <button
              onClick={() => { setOrders(loadOrders()); refetchProducts(); }}
              className="flex items-center gap-2 bg-luxury-gold hover:bg-luxury-gold-dark text-white px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
            >
              <RefreshCw size={14} />
              <span>Refresh</span>
            </button>
          </div>

        <nav className="lg:hidden flex gap-2 overflow-x-auto">
          {ADMIN_NAV_ITEMS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeTab === key
                  ? 'bg-text-primary text-elevated shadow-md'
                  : 'bg-elevated border border-border text-text-secondary hover:text-accent'
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </nav>

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

            {isProductsLoading ? (
              <div className="w-full bg-white rounded-3xl shadow-xs border border-luxury-gold-light/30 p-12 text-center">
                <div className="w-10 h-10 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-text-muted text-sm mt-4 font-medium">Loading products...</p>
              </div>
            ) : isProductsError ? (
              <div className="w-full bg-white rounded-3xl shadow-xs border border-luxury-gold-light/30 p-12 text-center space-y-4">
                <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
                  <ShoppingBag size={28} />
                </div>
                <h3 className="text-lg font-bold text-luxury-charcoal uppercase tracking-wider">Failed to Load Products</h3>
                <p className="text-text-muted text-xs max-w-sm mx-auto">
                  Could not fetch products from the server. Make sure you are logged in as admin, then try refreshing.
                </p>
                <button
                  type="button"
                  onClick={() => refetchProducts()}
                  className="inline-flex items-center gap-2 bg-luxury-gold hover:bg-luxury-gold-dark text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  <RefreshCw size={14} />
                  <span>Retry</span>
                </button>
              </div>
            ) : (
              <AdminProductTable
                items={products}
                onPreview={(item) => { setSelectedItem(item); setIsPreviewModalOpen(true); }}
                onEdit={(item) => { setSelectedItem(item); setIsUpdateModalOpen(true); }}
                onDelete={(item) => { setSelectedItem(item); setIsDeleteModalOpen(true); }}
                searchQuery={searchQuery}
                categoryFilter={categoryFilter}
                sortBy={sortBy}
              />
            )}
          </div>
        )}
      </main>

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddProduct}
      />
      <UpdateProductModal
        key={isUpdateModalOpen ? selectedItem?.sku ?? 'none' : 'closed'}
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
      <ProductPreviewModal
        key={isPreviewModalOpen ? selectedItem?.id ?? 'open' : 'closed'}
        isOpen={isPreviewModalOpen}
        onClose={() => { setIsPreviewModalOpen(false); setSelectedItem(null); }}
        item={selectedItem}
      />
      </div>
    </div>
  );
};

export default AdminDashboard;
