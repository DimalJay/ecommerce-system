import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AppLayout } from '../components';
import { OrderCard, OrderHistoryEmptyState } from '../components/order-history';
import type { Order } from '../components/order-history';
import { request } from '../lib/request';

export const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    request('/orders')
      .then((res) => {
        const apiOrders = res.data || [];
        const mappedOrders = apiOrders.map((apiOrder: any) => {
          return {
            id: apiOrder.order_code,
            date: new Date(apiOrder.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
            items: (apiOrder.items || []).map((item: any) => {
              const productData = item.product || {};
              const images = productData.images ? (typeof productData.images === 'string' ? JSON.parse(productData.images) : productData.images) : [];
              return {
                product: {
                  id: productData.id || 0,
                  title: productData.title || 'Unknown Product',
                  category: productData.category || 'Luxury',
                  colorName: productData.color || 'Default',
                  price: parseFloat(item.price || productData.price || 0),
                  image: images[0] || productData.image || '',
                  rating: 5,
                  reviewsCount: 10,
                },
                quantity: parseInt(item.quantity || 1),
                selectedSize: item.selected_size || 'M',
                selectedColor: item.selected_color || 'Default',
              };
            }),
            shippingInfo: {
              fullName: apiOrder.full_name,
              email: apiOrder.email,
              phone: apiOrder.phone,
              address: apiOrder.address,
              apartment: apiOrder.apartment || '',
              city: apiOrder.city,
              state: apiOrder.state,
              postalCode: apiOrder.postal_code,
              country: apiOrder.country,
            },
            paymentMethod: apiOrder.payment_method,
            total: parseFloat(apiOrder.total),
            status: apiOrder.status || 'Processing',
          };
        });
        setOrders(mappedOrders);
      })
      .catch((err) => {
        console.error('Failed to load orders from API:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
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

        {isLoading ? (
          <div className="text-center py-12 text-slate-500 font-semibold animate-pulse">
            Loading your order history...
          </div>
        ) : orders.length === 0 ? (
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
