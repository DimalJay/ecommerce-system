import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Order } from '../../types';
import { getStatusBadgeClass, OrderItemsList, ShippingDetailsCard, BillingReceiptCard } from '../shared/OrderCardSections';
import { getOrderItemCount } from '../../lib/orderUtils';

interface OrderCardProps {
  order: Order;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, isExpanded, onToggleExpand }) => {
  const itemsCount = getOrderItemCount(order.items);

  return (
    <div className="bg-white border border-luxury-gold-light/20 rounded-3xl overflow-hidden shadow-xs hover:border-luxury-gold-light/50 transition-all">
      {/* Order Card Header Summary row */}
      <div
        onClick={onToggleExpand}
        className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-luxury-sand/20 transition-colors"
      >
        <div className="grid grid-cols-2 sm:flex sm:items-center gap-y-2 sm:gap-8 text-left">
          <div>
            <span className="text-[10px] font-bold text-text-muted block uppercase tracking-wider">
              Order Number
            </span>
            <span className="text-xs font-black text-luxury-charcoal uppercase">
              {order.id}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-text-muted block uppercase tracking-wider">
              Date Placed
            </span>
            <span className="text-xs font-bold text-text-secondary">
              {order.date}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-text-muted block uppercase tracking-wider">
              Total Paid
            </span>
            <span className="text-xs font-black text-luxury-gold">
              Rs. {order.total.toFixed(2)}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-text-muted block uppercase tracking-wider">
              Items Count
            </span>
            <span className="text-xs font-bold text-text-secondary">
              {itemsCount} {itemsCount === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-4 mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-luxury-sand">
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusBadgeClass(
              order.status
            )}`}
          >
            {order.status}
          </span>
          {isExpanded ? (
            <ChevronUp size={16} className="text-text-muted" />
          ) : (
            <ChevronDown size={16} className="text-text-muted" />
          )}
        </div>
      </div>

      {/* Expandable Order Detail Accordion panel */}
      {isExpanded && (
        <div className="p-6 border-t border-luxury-sand bg-luxury-sand/10 space-y-8 animate-fade-in">
          <OrderItemsList items={order.items} itemsCount={itemsCount} title="Ordered Items" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-luxury-gold-light/10">
            <ShippingDetailsCard shippingInfo={order.shippingInfo} />
            <BillingReceiptCard paymentMethod={order.paymentMethod} total={order.total} label="Estimated Total" />
          </div>
        </div>
      )}
    </div>
  );
};
export default OrderCard;
