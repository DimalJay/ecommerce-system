import React from 'react';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';

export const OrderHistoryEmptyState: React.FC = () => {
  return (
    <div className="bg-white border border-luxury-gold-light/25 rounded-3xl p-12 text-center space-y-6 max-w-lg mx-auto shadow-xs">
      <div className="w-16 h-16 mx-auto rounded-full bg-luxury-sand flex items-center justify-center text-luxury-gold">
        <Package size={28} />
      </div>
      <div className="space-y-2">
        <h2 className="text-lg font-black text-luxury-charcoal uppercase tracking-wider">
          No orders placed yet
        </h2>
        <p className="text-xs text-text-muted max-w-xs mx-auto leading-relaxed">
          You haven't placed any orders yet. Start shopping to place your first order.
        </p>
      </div>
      <Link
        to="/"
        className="inline-block px-8 py-4 bg-luxury-gold hover:bg-luxury-gold-dark text-white rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-md cursor-pointer"
      >
        Start Shopping
      </Link>
    </div>
  );
};
