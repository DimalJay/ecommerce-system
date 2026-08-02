import React from 'react';
import { Eye, ShoppingBag } from 'lucide-react';
import type { Order } from '../../types';
import { getStatusBadgeClass } from '../shared/OrderCardSections';
import { formatCustomerName, getOrderItemCount } from '../../lib/orderUtils';

export interface AdminOrderTableProps {
  orders: Order[];
  onPreview: (order: Order) => void;
  onStatusChange: (order: Order, newStatus: Order['status']) => void;
}

const FULFILLMENT_STATUSES: Order['status'][] = [
  'Accepted',
  'Processing',
  'Shipped',
  'Delivered',
  'Rejected',
];

export const AdminOrderTable: React.FC<AdminOrderTableProps> = ({
  orders,
  onPreview,
  onStatusChange,
}) => {
  if (orders.length === 0) {
    return (
      <div className="w-full bg-white rounded-3xl shadow-xs border border-luxury-gold-light/30 p-12 text-center">
        <div className="w-16 h-16 bg-luxury-sand/40 text-luxury-gold rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingBag size={28} />
        </div>
        <h3 className="text-lg font-bold text-luxury-charcoal uppercase tracking-wider">No Orders Found</h3>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-3xl shadow-xs border border-luxury-gold-light/30 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-luxury-sand/50 text-text-primary text-xs font-black uppercase tracking-wider border-b border-luxury-gold-light/30">
              <th className="px-3 sm:px-5 py-4">Order</th>
              <th className="px-3 sm:px-5 py-4">Customer</th>
              <th className="px-3 sm:px-5 py-4">Date Placed</th>
              <th className="px-3 sm:px-5 py-4">Items</th>
              <th className="px-3 sm:px-5 py-4">Status</th>
              <th className="px-3 sm:px-5 py-4 text-right">Total</th>
              <th className="px-3 sm:px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-luxury-gold-light/20">
            {orders.map((order) => {
              const itemsCount = getOrderItemCount(order.items);

              return (
                <tr
                  key={order.id}
                  onClick={() => onPreview(order)}
                  className="hover:bg-luxury-cream/50 transition-colors duration-150 cursor-pointer group"
                >
                  <td className="px-3 sm:px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 shrink-0 rounded-xl bg-luxury-sand/60 text-luxury-gold flex items-center justify-center">
                        <ShoppingBag size={16} />
                      </span>
                      <div className="min-w-0">
                        <p className="font-black text-luxury-charcoal uppercase text-xs sm:text-sm group-hover:text-luxury-gold transition-colors truncate">
                          {order.id}
                        </p>
                        <p className="text-[11px] font-semibold text-text-muted mt-0.5 capitalize">{order.paymentMethod}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-5 py-4">
                    <span className="text-xs font-bold text-text-primary">{formatCustomerName(order.shippingInfo)}</span>
                  </td>
                  <td className="px-3 sm:px-5 py-4">
                    <span className="text-xs font-medium text-text-secondary">{order.date}</span>
                  </td>
                  <td className="px-3 sm:px-5 py-4">
                    <span className="text-xs font-bold text-text-secondary">
                      {itemsCount} {itemsCount === 1 ? 'item' : 'items'}
                    </span>
                  </td>
                  <td className="px-3 sm:px-5 py-4">
                    <select
                      value={order.status}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => onStatusChange(order, e.target.value as Order['status'])}
                      className={`px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border bg-white focus:outline-none focus:ring-2 focus:ring-luxury-gold/30 transition-all cursor-pointer ${getStatusBadgeClass(
                        order.status
                      )}`}
                    >
                      {FULFILLMENT_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-3 sm:px-5 py-4 text-right">
                    <span className="font-extrabold text-luxury-charcoal text-xs sm:text-sm">
                      Rs. {order.total.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-3 sm:px-5 py-4">
                    <div className="flex items-center justify-end">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); onPreview(order); }}
                        className="p-2 text-text-muted hover:text-luxury-gold hover:bg-luxury-sand/60 rounded-xl transition-colors duration-200 cursor-pointer active:scale-95"
                        title="View Details"
                        aria-label="View Details"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrderTable;