import React from 'react';
import { PackageCheck, CheckCircle2, XCircle } from 'lucide-react';
import { ModalShell } from '../ui';
import type { Order } from '../../types';
import {
  getStatusBadgeClass,
  OrderItemsList,
  ShippingDetailsCard,
  BillingReceiptCard,
} from '../shared/OrderCardSections';
import { formatCustomerName, getOrderItemCount } from '../../lib/orderUtils';
import { OrderStatusStepper } from '../shared/OrderStatusStepper';

export interface AdminOrderDetailsModalProps {
  order: Order | null;
  onClose: () => void;
  onStatusChange: (order: Order, newStatus: Order['status']) => void;
  isUpdating?: boolean;
}

/** Maps an order status to the next fulfillment stage in the workflow. */
const NEXT_STATUS: Partial<Record<Order['status'], Order['status']>> = {
  Processing: 'Accepted',
  Accepted: 'Shipped',
  Shipped: 'Delivered',
};

export const AdminOrderDetailsModal: React.FC<AdminOrderDetailsModalProps> = ({
  order,
  onClose,
  onStatusChange,
  isUpdating = false,
}) => {
  if (!order) return null;

  const itemsCount = getOrderItemCount(order.items);
  const nextStatus = NEXT_STATUS[order.status];
  // Rejection is only allowed before the order is accepted.
  const canReject = order.status === 'Processing';

  return (
    <ModalShell
      isOpen={!!order}
      onClose={onClose}
      title="Order Details"
      maxWidth="max-w-2xl"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider text-text-secondary hover:bg-luxury-sand/50 transition-colors cursor-pointer"
          >
            Close
          </button>
          {canReject && (
            <button
              type="button"
              disabled={isUpdating}
              onClick={() => onStatusChange(order, 'Rejected')}
              className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              <XCircle size={16} />
              Reject
            </button>
          )}
          {nextStatus ? (
            <button
              type="button"
              disabled={isUpdating}
              onClick={() => onStatusChange(order, nextStatus)}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              {isUpdating ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <PackageCheck size={16} />
                  Process to {nextStatus}
                </>
              )}
            </button>
          ) : order.status === 'Rejected' ? (
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200/70">
              <CheckCircle2 size={16} />
              Rejected
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/70">
              <CheckCircle2 size={16} />
              Finalized
            </span>
          )}
        </>
      }
    >
      {/* Order summary */}
      <div className="bg-luxury-cream/70 border border-luxury-gold-light/20 rounded-2xl p-5 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Order Code</p>
          <p className="text-base font-black text-luxury-charcoal uppercase tracking-wide truncate">{order.id}</p>
          <p className="text-xs font-semibold text-text-secondary mt-1 truncate">
            {formatCustomerName(order.shippingInfo)} · {order.shippingInfo.email}
          </p>
        </div>
        <span
          className={`inline-flex items-center w-fit px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest border ${getStatusBadgeClass(
            order.status
          )}`}
        >
          {order.status}
        </span>
      </div>

      {/* Order progress stepper */}
      <div className="bg-white border border-luxury-gold-light/20 rounded-2xl p-4 sm:p-5 mb-5">
        <OrderStatusStepper status={order.status} />
      </div>

      {/* Meta strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
        <div>
          <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Date Placed</p>
          <p className="text-xs font-bold text-text-primary mt-1">{order.date}</p>
        </div>
        <div>
          <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Payment</p>
          <p className="text-xs font-bold text-text-primary capitalize mt-1">{order.paymentMethod}</p>
        </div>
        <div>
          <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Items</p>
          <p className="text-xs font-bold text-text-primary mt-1">
            {itemsCount} {itemsCount === 1 ? 'item' : 'items'}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Order Total</p>
          <p className="text-sm font-black text-luxury-gold mt-1">Rs. {order.total.toFixed(2)}</p>
        </div>
      </div>

      {/* Items + shipping + billing */}
      <div className="bg-white border border-luxury-gold-light/20 rounded-2xl p-5 mb-5">
        <OrderItemsList items={order.items} itemsCount={itemsCount} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white border border-luxury-gold-light/20 rounded-2xl p-5">
          <ShippingDetailsCard shippingInfo={order.shippingInfo} />
        </div>
        <div className="bg-white border border-luxury-gold-light/20 rounded-2xl p-5">
          <BillingReceiptCard paymentMethod={order.paymentMethod} total={order.total} />
        </div>
      </div>
    </ModalShell>
  );
};

export default AdminOrderDetailsModal;