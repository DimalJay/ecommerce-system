import React, { useState } from 'react';
import { RefreshCw, ShoppingBag } from 'lucide-react';
import { OrderStats } from '../components/admin/OrderStats';
import { OrderControls } from '../components/admin/OrderControls';
import { AdminOrderCard } from '../components/admin/AdminOrderCard';
import type { Order } from '../types';

export const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const savedOrders = localStorage.getItem('orders');
      return savedOrders ? (JSON.parse(savedOrders) as Order[]) : [];
    } catch (err) {
      console.error('Failed to load orders from localStorage:', err);
      return [];
    }
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'value-high' | 'value-low'>('newest');

  // Load orders from localStorage
  const loadOrders = () => {
    try {
      const savedOrders = localStorage.getItem('orders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } catch (err) {
      console.error('Failed to load orders from localStorage:', err);
    }
  };

  // Update order status in state & localStorage
  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });

    setOrders(updatedOrders);
    try {
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
    } catch (err) {
      console.error('Failed to save updated orders:', err);
    }
  };

  // Toggle order expanded detail view
  const toggleExpandOrder = (id: string) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  // KPI Calculations
  const totalOrders = orders.length;
  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
  const processingCount = orders.filter((o) => o.status === 'Processing').length;
  const shippedCount = orders.filter((o) => o.status === 'Shipped').length;
  const deliveredCount = orders.filter((o) => o.status === 'Delivered').length;

  // Filter and Sort orders
  const filteredOrders = orders
    .filter((order) => {
      if (statusFilter !== 'All' && order.status !== statusFilter) {
        return false;
      }

      const query = searchQuery.toLowerCase().trim();
      if (!query) return true;

      const customerName = (order.shippingInfo?.fullName || `${order.shippingInfo?.firstName || ''} ${order.shippingInfo?.lastName || ''}`).toLowerCase();
      const email = (order.shippingInfo?.email || '').toLowerCase();
      const city = (order.shippingInfo?.city || '').toLowerCase();
      const orderId = order.id.toLowerCase();

      return (
        orderId.includes(query) ||
        customerName.includes(query) ||
        email.includes(query) ||
        city.includes(query)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return b.id.localeCompare(a.id);
      if (sortBy === 'oldest') return a.id.localeCompare(b.id);
      if (sortBy === 'value-high') return b.total - a.total;
      if (sortBy === 'value-low') return a.total - b.total;
      return 0;
    });

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col font-sans">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 py-8 sm:py-10 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-border pb-6 gap-4 text-left">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Order Management</h1>
            <p className="text-text-muted text-sm mt-1">Review, track, and update fulfillment status for client orders.</p>
          </div>

          <button
            onClick={loadOrders}
            className="flex items-center gap-2 bg-luxury-gold hover:bg-luxury-gold-dark text-white px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <RefreshCw size={14} className="mr-1" />
            <span>Refresh Data</span>
          </button>
        </div>

        {/* Dashboard KPIs */}
        <OrderStats
          totalOrders={totalOrders}
          totalSales={totalSales}
          processingCount={processingCount}
          shippedCount={shippedCount}
          deliveredCount={deliveredCount}
        />

        {/* Search, Filter, Sort Controls */}
        <OrderControls
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white border border-luxury-gold-light/20 rounded-3xl p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-luxury-sand/40 text-luxury-gold rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag size={28} />
            </div>
            <h3 className="text-lg font-bold text-luxury-charcoal uppercase tracking-wider">No Orders Found</h3>
            <p className="text-text-muted text-xs max-w-sm mx-auto">
              {orders.length === 0
                ? 'There are currently no orders placed in the system.'
                : 'No orders match your current search queries or selected status filters.'}
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
      </main>
    </div>
  );
};

export default OrderManagement;
