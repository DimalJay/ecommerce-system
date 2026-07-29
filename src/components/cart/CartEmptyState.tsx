import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

export const CartEmptyState: React.FC = () => {
  return (
    <div className="bg-white border border-luxury-gold-light/30 rounded-3xl p-8 sm:p-16 text-center shadow-xs my-8 max-w-2xl mx-auto space-y-6">
      <div className="w-24 h-24 mx-auto rounded-full bg-luxury-sand flex items-center justify-center text-luxury-gold shadow-inner">
        <ShoppingBag size={40} />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold text-luxury-charcoal">
          Your Atelier Bag is Empty
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          Looks like you haven't added any luxury items to your cart yet. Explore our curated collections to find your signature pieces.
        </p>
      </div>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-8 py-3.5 bg-luxury-gold hover:bg-luxury-gold-dark text-white font-bold rounded-full text-xs uppercase tracking-widest transition-all shadow-lg shadow-luxury-gold/20 hover:-translate-y-0.5 cursor-pointer"
      >
        Start Shopping
      </Link>
    </div>
  );
};
