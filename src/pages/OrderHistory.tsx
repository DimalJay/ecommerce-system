import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AppLayout } from '../components';
import { OrderCard, OrderHistoryEmptyState } from '../components/order-history';
import type { Order } from '../components/order-history';

export const OrderHistory: React.FC = () => {
  const [orders] = useState<Order[]>(() => {
    try {
      const savedOrders = localStorage.getItem('orders');
      return savedOrders ? (JSON.parse(savedOrders) as Order[]) : [];
    } catch (err) {
      console.error('Failed to load orders from localStorage:', err);
      return [];
    }
  });
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const toggleExpandOrder = (id: string) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  return (
    <AppLayout>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full flex-1 space-y-8">
        <div className="space-y-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
          >
            <ArrowLeft size={14} /> Back to Shop
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
            Order History
          </h1>
          <p className="text-sm text-text-muted">
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
