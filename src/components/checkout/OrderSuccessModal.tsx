import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ShoppingBag, Clock, MapPin, CreditCard, ArrowRight } from 'lucide-react';
import type { Order } from '../../types';

interface OrderSuccessModalProps {
  order: Order;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ order, onClose }) => {
  const navigate = useNavigate();

  const getPaymentLabel = (method: string) => {
    switch (method) {
      case 'card':
        return 'Credit / Debit Card';
      case 'paypal':
        return 'PayPal';
      case 'cod':
        return 'Cash on Delivery';
      case 'bank':
        return 'Bank Transfer';
      default:
        return method;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-luxury-gold-light/30 my-8 relative">
        {/* Animated Checkmark Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 border-4 border-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto mb-4 animate-bounce">
          <CheckCircle size={36} />
        </div>

        <div className="text-center space-y-1 mb-6">
          <span className="inline-block px-3 py-1 bg-luxury-gold/15 text-luxury-charcoal text-[11px] font-black uppercase tracking-widest rounded-full">
            Order Confirmed
          </span>
          <h2 className="text-2xl font-black text-luxury-charcoal tracking-tight">Thank You For Your Order!</h2>
          <p className="text-xs text-slate-500 font-medium">
            We've sent a confirmation email to <span className="font-semibold text-slate-700">{order.shippingInfo.email}</span>
          </p>
        </div>

        {/* Order Meta Box */}
        <div className="bg-luxury-cream/40 border border-luxury-gold-light/25 rounded-2xl p-4 space-y-3 mb-6 text-xs">
          <div className="flex justify-between items-center pb-2 border-b border-luxury-gold-light/20">
            <span className="text-slate-500 font-medium">Order Reference</span>
            <span className="font-black text-luxury-charcoal font-mono">{order.id}</span>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-luxury-gold-light/20">
            <span className="text-slate-500 font-medium flex items-center gap-1.5">
              <Clock size={14} className="text-luxury-gold" /> Date Placed
            </span>
            <span className="font-semibold text-slate-700">{order.date}</span>
          </div>

          <div className="flex justify-between items-start pb-2 border-b border-luxury-gold-light/20">
            <span className="text-slate-500 font-medium flex items-center gap-1.5 shrink-0">
              <MapPin size={14} className="text-luxury-gold" /> Shipping Address
            </span>
            <span className="font-semibold text-slate-700 text-right max-w-50 truncate">
              {order.shippingInfo.address}, {order.shippingInfo.city}, {order.shippingInfo.state}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-medium flex items-center gap-1.5">
              <CreditCard size={14} className="text-luxury-gold" /> Payment Method
            </span>
            <span className="font-semibold text-slate-700">{getPaymentLabel(order.paymentMethod)}</span>
          </div>
        </div>

        {/* Items Brief List */}
        <div className="space-y-2.5 mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
            <span>Items Ordered ({order.items.length})</span>
            <span className="text-luxury-gold font-black text-sm">Rs. {order.total.toFixed(2)}</span>
          </h3>
          <div className="max-h-36 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl border border-slate-100">
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-10 h-10 object-cover rounded-lg shrink-0 border border-slate-200"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800 truncate">{item.product.title}</p>
                  <p className="text-[10px] text-slate-500">
                    Qty: {item.quantity} {item.selectedSize ? `• Size: ${item.selectedSize}` : ''}
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-700">
                  Rs. {(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              onClose();
              navigate('/orders');
            }}
            className="flex-1 py-3 px-4 bg-luxury-charcoal hover:bg-luxury-gold text-white hover:text-luxury-charcoal rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <Clock size={16} /> View Order History
          </button>
          <button
            onClick={() => {
              onClose();
              navigate('/');
            }}
            className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag size={16} /> Back to Store <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
