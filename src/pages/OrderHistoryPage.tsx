import React, { useState, useMemo } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { AppLayout } from '../components';
import { OrderCard, OrderHistoryEmptyState } from '../components/order-history';
import { useCart } from '../context/CartContext';
import { useOrders } from '../hooks/useOrders';

export type StatusFilter = 'All' |'Processing' | 'Shipped' | 'Delivered' ;

const FILTER_OPTIONS: StatusFilter[] = ['All', 'Processing', 'Shipped', 'Delivered'];

const ITEMS_PER_PAGE = 10;

export const OrderHistoryPage: React.FC = () => {
  const { user } = useCart();
  const { data: orders = [], isLoading, isError, error, refetch } = useOrders();

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
        ) : isError ? (
          <div className="text-center py-12 space-y-4">
            <p className="text-slate-600 font-semibold">Failed to load your order history.</p>
            <p className="text-xs text-text-muted max-w-sm mx-auto">
              {error instanceof Error ? error.message : 'Please try again.'}
            </p>
            <button
              onClick={() => refetch()}
              className="inline-flex items-center gap-2 bg-luxury-gold hover:bg-luxury-gold-dark text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              Try Again
            </button>
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
