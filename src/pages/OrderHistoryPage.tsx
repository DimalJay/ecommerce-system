import React, { useState, useMemo, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { AppLayout } from '../components';
import { OrderCard, OrderHistoryEmptyState } from '../components/order-history';
import type { Order } from '../components/order-history';
import { useCart } from '../context/CartContext';
import { request } from '../lib/request';

export type StatusFilter = 'All' | 'Accepted' | 'Processing' | 'Shipped' | 'Delivered' | 'Rejected';

const FILTER_OPTIONS: StatusFilter[] = ['All', 'Accepted', 'Processing', 'Shipped', 'Delivered', 'Rejected'];

/** Mock sample orders covering all 5 statuses when localStorage is empty */
const MOCK_SEED_ORDERS: Order[] = [
  {
    id: 'ORD-982341',
    date: 'July 30, 2026',
    status: 'Processing',
    paymentMethod: 'card',
    total: 349.99,
    items: [
      {
        product: {
          id: 1,
          title: 'Silk Cashmere Trench Coat',
          price: 349.99,
          oldPrice: 420.00,
          image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500&auto=format&fit=crop&q=60',
          category: 'Outwear',
          colorName: 'Beige',
          rating: 4.9,
          reviewsCount: 28,
          isNew: true,
        },
        quantity: 1,
        selectedSize: 'M',
        selectedColor: 'Beige',
      },
    ],
    shippingInfo: {
      fullName: 'Sophia Bennett',
      email: 'sophia.bennett@example.com',
      phone: '+1 (555) 234-5678',
      address: '742 Evergreen Terrace',
      apartment: 'Suite 4B',
      city: 'Springfield',
      state: 'OR',
      postalCode: '97477',
      country: 'United States',
    },
  },
  {
    id: 'ORD-871204',
    date: 'July 28, 2026',
    status: 'Accepted',
    paymentMethod: 'card',
    total: 185.50,
    items: [
      {
        product: {
          id: 2,
          title: 'Artisanal Leather Crossbody',
          price: 185.50,
          image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&auto=format&fit=crop&q=60',
          category: 'Accessories',
          colorName: 'Cognac',
          rating: 4.8,
          reviewsCount: 19,
        },
        quantity: 1,
        selectedSize: 'One Size',
        selectedColor: 'Cognac',
      },
    ],
    shippingInfo: {
      fullName: 'Sophia Bennett',
      email: 'sophia.bennett@example.com',
      phone: '+1 (555) 234-5678',
      address: '742 Evergreen Terrace',
      apartment: 'Suite 4B',
      city: 'Springfield',
      state: 'OR',
      postalCode: '97477',
    },
  },
  {
    id: 'ORD-765412',
    date: 'July 25, 2026',
    status: 'Shipped',
    paymentMethod: 'paypal',
    total: 275.00,
    items: [
      {
        product: {
          id: 3,
          title: 'Merino Wool Knit Sweater',
          price: 137.50,
          image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&auto=format&fit=crop&q=60',
          category: 'Knitwear',
          colorName: 'Cream',
          rating: 4.7,
          reviewsCount: 42,
        },
        quantity: 2,
        selectedSize: 'S',
        selectedColor: 'Cream',
      },
    ],
    shippingInfo: {
      fullName: 'Sophia Bennett',
      email: 'sophia.bennett@example.com',
      phone: '+1 (555) 234-5678',
      address: '742 Evergreen Terrace',
      apartment: '',
      city: 'Springfield',
      state: 'OR',
      postalCode: '97477',
    },
  },
  {
    id: 'ORD-654321',
    date: 'July 20, 2026',
    status: 'Delivered',
    paymentMethod: 'card',
    total: 420.00,
    items: [
      {
        product: {
          id: 4,
          title: 'Tailored Wool Trousers',
          price: 210.00,
          image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&auto=format&fit=crop&q=60',
          category: 'Pants',
          colorName: 'Charcoal',
          rating: 4.9,
          reviewsCount: 15,
        },
        quantity: 2,
        selectedSize: 'M',
        selectedColor: 'Charcoal',
      },
    ],
    shippingInfo: {
      fullName: 'Sophia Bennett',
      email: 'sophia.bennett@example.com',
      phone: '+1 (555) 234-5678',
      address: '742 Evergreen Terrace',
      apartment: 'Suite 4B',
      city: 'Springfield',
      state: 'OR',
      postalCode: '97477',
    },
  },
  {
    id: 'ORD-543210',
    date: 'July 15, 2026',
    status: 'Rejected',
    paymentMethod: 'card',
    total: 120.00,
    items: [
      {
        product: {
          id: 5,
          title: 'Structured Linen Shirt',
          price: 120.00,
          image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500&auto=format&fit=crop&q=60',
          category: 'Shirts',
          colorName: 'White',
          rating: 4.5,
          reviewsCount: 11,
        },
        quantity: 1,
        selectedSize: 'L',
        selectedColor: 'White',
      },
    ],
    shippingInfo: {
      fullName: 'Sophia Bennett',
      email: 'sophia.bennett@example.com',
      phone: '+1 (555) 234-5678',
      address: '742 Evergreen Terrace',
      apartment: '',
      city: 'Springfield',
      state: 'OR',
      postalCode: '97477',
    },
  },
];

const ITEMS_PER_PAGE = 10;

export const OrderHistoryPage: React.FC = () => {
  const { user } = useCart();

  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    request('/orders')
      .then((res: any) => {
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
        try {
          const savedOrders = localStorage.getItem('orders');
          if (savedOrders) {
            const parsed = JSON.parse(savedOrders) as Order[];
            if (parsed && parsed.length > 0) {
              setOrders(parsed);
              return;
            }
          }
        } catch (e) {
          console.error(e);
        }
        setOrders(MOCK_SEED_ORDERS);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<StatusFilter>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const toggleExpandOrder = (id: string) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  const handleFilterChange = (status: StatusFilter) => {
    setActiveFilter(status);
    setCurrentPage(1);
    setExpandedOrderId(null);
  };

  const filteredOrders = useMemo(() => {
    if (activeFilter === 'All') return orders;
    return orders.filter((order) => order.status === activeFilter);
  }, [orders, activeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / ITEMS_PER_PAGE));
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredOrders.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredOrders, currentPage]);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <AppLayout>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full flex-1 space-y-8">
        {/* Header section */}
        <div className="space-y-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
          >
            <ArrowLeft size={14} /> Back to Shop
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
                Order History
              </h1>
              <p className="text-sm text-text-muted mt-1">
                Manage, review, and track all your previous purchases.
              </p>
            </div>
            <div className="text-xs font-bold text-text-muted bg-luxury-sand/50 px-3 py-1.5 rounded-full border border-luxury-gold-light/20 self-start sm:self-auto">
              Total Orders: {orders.length}
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-luxury-charcoal uppercase tracking-wider">
            <Filter size={14} className="text-luxury-gold" /> Filter by Status
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTER_OPTIONS.map((status) => {
              const count =
                status === 'All'
                  ? orders.length
                  : orders.filter((o) => o.status === status).length;
              const isActive = activeFilter === status;

              return (
                <button
                  key={status}
                  onClick={() => handleFilterChange(status)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-luxury-charcoal text-white shadow-xs border border-luxury-charcoal'
                      : 'bg-white text-text-secondary border border-luxury-gold-light/30 hover:border-luxury-gold-light hover:text-luxury-charcoal'
                  }`}
                >
                  <span>{status}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                      isActive ? 'bg-luxury-gold text-luxury-charcoal' : 'bg-luxury-sand text-text-muted'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Orders Content */}
        {isLoading ? (
          <div className="text-center py-12 text-slate-500 font-semibold animate-pulse">
            Loading your order history...
          </div>
        ) : filteredOrders.length === 0 ? (
          <OrderHistoryEmptyState />
        ) : (
          <div className="space-y-4">
            {paginatedOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                isExpanded={expandedOrderId === order.id}
                onToggleExpand={() => toggleExpandOrder(order.id)}
              />
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-6 border-t border-luxury-gold-light/20">
            <p className="text-xs text-text-muted">
              Showing <span className="font-bold text-luxury-charcoal">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{' '}
              <span className="font-bold text-luxury-charcoal">
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredOrders.length)}
              </span>{' '}
              of <span className="font-bold text-luxury-charcoal">{filteredOrders.length}</span> orders
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl border border-luxury-gold-light/30 text-luxury-charcoal hover:bg-luxury-sand/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous Page"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      currentPage === pageNum
                        ? 'bg-luxury-gold text-luxury-charcoal font-black shadow-xs'
                        : 'text-text-secondary hover:bg-luxury-sand/40'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl border border-luxury-gold-light/30 text-luxury-charcoal hover:bg-luxury-sand/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Next Page"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </main>
    </AppLayout>
  );
};

export default OrderHistoryPage;
