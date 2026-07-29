import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AppLayout } from '../components';
import { OrderCard, OrderHistoryEmptyState } from '../components/order-history';
import type { Order } from '../components/order-history';

export const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem('orders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } catch (err) {
      console.error('Failed to load orders from localStorage:', err);
    }
  }, []);

  const toggleExpandOrder = (id: string) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  return (
    <AppLayout>
      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-12 w-full flex-1 space-y-10">
        {/* Header Breadcrumbs & Title */}
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-luxury-gold hover:text-luxury-gold-dark transition-colors uppercase tracking-widest cursor-pointer"
          >
            <ArrowLeft size={14} /> Back to Atelier Shop
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-luxury-charcoal">
            Order History
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Manage, review, and track all your previous purchases.
          </p>
        </div>

        {orders.length === 0 ? (
          <OrderHistoryEmptyState />
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                isExpanded={expandedOrderId === order.id}
                onToggleExpand={() => toggleExpandOrder(order.id)}
              />
            ))}
          </div>
        )}
      </main>
    </AppLayout>
  );
};

export default OrderHistory;
