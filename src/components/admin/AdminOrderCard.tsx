import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Order, OrderItem } from '../order-history';
import { getStatusBadgeClass, OrderItemsList, ShippingDetailsCard, BillingReceiptCard } from '../shared/OrderCardSections';

interface AdminOrderCardProps {
  order: Order;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onStatusChange: (id: string, newStatus: Order['status']) => void;
}

export const AdminOrderCard: React.FC<AdminOrderCardProps> = ({
  order,
  isExpanded,
  onToggleExpand,
  onStatusChange,
}) => {
  const itemsCount = order.items.reduce((sum: number, item: OrderItem) => sum + item.quantity, 0);

  return (
    <div className="bg-white border border-luxury-gold-light/20 rounded-3xl overflow-hidden shadow-xs hover:border-luxury-gold-light/50 transition-all text-left">
      {/* Order summary header */}
      <div className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:flex lg:items-center gap-y-3 gap-x-8">
          <div>
            <span className="text-[10px] font-bold text-text-muted block uppercase tracking-wider">Order ID</span>
            <span className="text-xs font-black text-luxury-charcoal uppercase">{order.id}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-text-muted block uppercase tracking-wider">Client Name</span>
            <span className="text-xs font-bold text-text-primary">
              {order.shippingInfo?.fullName || `${order.shippingInfo?.firstName || ''} ${order.shippingInfo?.lastName || ''}`.trim()}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-text-muted block uppercase tracking-wider">Date Placed</span>
            <span className="text-xs font-bold text-text-secondary">{order.date}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-text-muted block uppercase tracking-wider">Total Value</span>
            <span className="text-xs font-black text-luxury-gold">Rs. {order.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between lg:justify-end gap-4 border-t lg:border-t-0 pt-4 lg:pt-0 border-luxury-sand">
          {/* Action: Status Selector Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Fulfillment:</span>
            <select
              value={order.status}
              onChange={(e) => onStatusChange(order.id, e.target.value as Order['status'])}
              className={`px-3 py-2 rounded-full text-[10px] font-black uppercase tracking-wider border ${getStatusBadgeClass(
                order.status
              )} focus:outline-none`}
            >
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          {/* Expand Toggle */}
          <button
            onClick={onToggleExpand}
            className="p-2 bg-luxury-cream hover:bg-luxury-sand text-text-secondary rounded-full transition-colors cursor-pointer"
            title="View Details"
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Expandable Order Detail Accordion panel */}
      {isExpanded && (
        <div className="p-6 border-t border-luxury-sand bg-luxury-sand/10 space-y-8 animate-fade-in">
          <OrderItemsList items={order.items} itemsCount={itemsCount} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-luxury-gold-light/10">
            <ShippingDetailsCard shippingInfo={order.shippingInfo} />
            <BillingReceiptCard paymentMethod={order.paymentMethod} total={order.total} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrderCard;
