import React from 'react';
import { ShoppingBag, DollarSign, Clock, Truck, CheckCircle2 } from 'lucide-react';

interface OrderStatsProps {
  totalOrders: number;
  totalSales: number;
  processingCount: number;
  shippedCount: number;
  deliveredCount: number;
}

export const OrderStats: React.FC<OrderStatsProps> = ({
  totalOrders,
  totalSales,
  processingCount,
  shippedCount,
  deliveredCount,
}) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      {/* KPI 1 */}
      <div className="bg-white p-5 border border-luxury-gold-light/20 rounded-2xl shadow-xs text-left">
        <div className="flex items-center justify-between gap-2 text-text-muted mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider">Total Orders</span>
          <ShoppingBag size={18} className="text-luxury-gold" />
        </div>
        <p className="text-2xl font-black text-luxury-charcoal">{totalOrders}</p>
        <p className="text-[10px] text-text-muted mt-1 font-medium">All-time placed orders</p>
      </div>

      {/* KPI 2 */}
      <div className="bg-white p-5 border border-luxury-gold-light/20 rounded-2xl shadow-xs text-left col-span-2 sm:col-span-1">
        <div className="flex items-center justify-between gap-2 text-text-muted mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider">Total Sales</span>
          <DollarSign size={18} className="text-emerald-600" />
        </div>
        <p className="text-2xl font-black text-luxury-charcoal">
          Rs. {totalSales.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <p className="text-[10px] text-text-muted mt-1 font-medium">Gross revenue received</p>
      </div>

      {/* KPI 3 */}
      <div className="bg-white p-5 border border-luxury-gold-light/20 rounded-2xl shadow-xs text-left">
        <div className="flex items-center justify-between gap-2 text-text-muted mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider">Processing</span>
          <Clock size={18} className="text-amber-500" />
        </div>
        <p className="text-2xl font-black text-luxury-charcoal">{processingCount}</p>
        <p className="text-[10px] text-amber-600 mt-1 font-semibold">Awaiting packaging</p>
      </div>

      {/* KPI 4 */}
      <div className="bg-white p-5 border border-luxury-gold-light/20 rounded-2xl shadow-xs text-left">
        <div className="flex items-center justify-between gap-2 text-text-muted mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider">Shipped</span>
          <Truck size={18} className="text-blue-500" />
        </div>
        <p className="text-2xl font-black text-luxury-charcoal">{shippedCount}</p>
        <p className="text-[10px] text-blue-600 mt-1 font-semibold">In transit to client</p>
      </div>

      {/* KPI 5 */}
      <div className="bg-white p-5 border border-luxury-gold-light/20 rounded-2xl shadow-xs text-left">
        <div className="flex items-center justify-between gap-2 text-text-muted mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider">Delivered</span>
          <CheckCircle2 size={18} className="text-emerald-500" />
        </div>
        <p className="text-2xl font-black text-luxury-charcoal">{deliveredCount}</p>
        <p className="text-[10px] text-emerald-600 mt-1 font-semibold">Fulfillment completed</p>
      </div>
    </div>
  );
};
export default OrderStats;
