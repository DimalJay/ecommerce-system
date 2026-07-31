import React from 'react';
import { ShieldCheck } from 'lucide-react';
import type { Order } from '../../types';

/* eslint-disable react-refresh/only-export-components */

export function getStatusBadgeClass(status: Order['status']): string {
  switch (status) {
    case 'Processing':
      return 'bg-amber-50 text-amber-800 border-amber-200/50';
    case 'Shipped':
      return 'bg-blue-50 text-blue-800 border-blue-200/50';
    case 'Delivered':
      return 'bg-emerald-50 text-emerald-800 border-emerald-200/50';
    default:
      return 'bg-slate-50 text-text-primary border-slate-200/50';
  }
}

interface OrderItemsListProps {
  items: Order['items'];
  itemsCount: number;
  title?: string;
}

export const OrderItemsList: React.FC<OrderItemsListProps> = ({
  items,
  itemsCount,
  title = 'Items Ordered',
}) => (
  <div className="space-y-3">
    <h3 className="text-xs font-black text-luxury-charcoal uppercase tracking-widest border-b border-luxury-gold-light/10 pb-2 flex items-center justify-between">
      <span>{title} ({itemsCount})</span>
      <span className="text-[10px] font-medium text-text-muted uppercase">Unit Prices Shown</span>
    </h3>
    <div className="divide-y divide-luxury-sand">
      {items.map((item, idx) => (
        <div key={idx} className="py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={item.product.image}
              alt={item.product.title}
              className="w-12 h-16 object-cover bg-luxury-sand rounded-lg border border-luxury-gold-light/10"
            />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-luxury-charcoal line-clamp-1">
                {item.product.title}
              </h4>
              <div className="flex items-center gap-2 text-[10px] text-text-muted font-bold uppercase tracking-wider">
                <span>Size: {item.selectedSize}</span>
                <span>&bull;</span>
                <span>Color: {item.selectedColor}</span>
              </div>
            </div>
          </div>
          <div className="text-right space-y-1">
            <span className="text-xs font-bold text-luxury-gold block">
              Rs. {item.product.price.toFixed(2)}
            </span>
            <span className="text-[10px] text-text-muted block font-medium">
              Qty: {item.quantity}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

interface ShippingDetailsCardProps {
  shippingInfo: Order['shippingInfo'];
}

export const ShippingDetailsCard: React.FC<ShippingDetailsCardProps> = ({ shippingInfo }) => (
  <div className="space-y-3">
    <h4 className="text-xs font-black text-luxury-charcoal uppercase tracking-widest">
      Shipping Details
    </h4>
    <div className="text-xs text-text-secondary space-y-1 bg-white p-4 border border-luxury-gold-light/15 rounded-2xl">
      <p className="font-bold text-luxury-charcoal">
        {shippingInfo.fullName || `${shippingInfo.firstName ?? ''} ${shippingInfo.lastName ?? ''}`.trim()}
      </p>
      <p>{shippingInfo.address}</p>
      {shippingInfo.apartment && <p>{shippingInfo.apartment}</p>}
      <p>
        {shippingInfo.city}, {shippingInfo.state} {shippingInfo.postalCode}
      </p>
      <p className="pt-2 text-text-secondary font-medium">Phone: {shippingInfo.phone}</p>
      <p className="text-text-secondary font-medium">Email: {shippingInfo.email}</p>
    </div>
  </div>
);

interface BillingReceiptCardProps {
  paymentMethod: string;
  total: number;
  label?: string;
}

export const BillingReceiptCard: React.FC<BillingReceiptCardProps> = ({
  paymentMethod,
  total,
  label = 'Grand Total',
}) => (
  <div className="space-y-3">
    <h4 className="text-xs font-black text-luxury-charcoal uppercase tracking-widest">
      Billing Receipt
    </h4>
    <div className="bg-white p-4 border border-luxury-gold-light/15 rounded-2xl text-xs space-y-2">
      <div className="flex justify-between text-text-muted">
        <span>Payment Method</span>
        <span className="font-bold text-luxury-charcoal uppercase">
          {paymentMethod === 'card' ? 'Credit / Debit Card' : paymentMethod}
        </span>
      </div>
      <div className="flex justify-between text-text-muted pt-2 border-t border-luxury-sand">
        <span>{label}</span>
        <span className="font-black text-luxury-gold">Rs. {total.toFixed(2)}</span>
      </div>
      <div className="flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 px-2 py-1 rounded-lg font-bold w-fit mt-3">
        <ShieldCheck size={12} />
        <span>Paid &amp; Secured Transaction</span>
      </div>
    </div>
  </div>
);
