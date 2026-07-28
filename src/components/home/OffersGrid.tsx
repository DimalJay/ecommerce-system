import React from 'react';
import { Percent, Sparkles, Truck } from 'lucide-react';

interface OffersGridProps {
  onClaimOffer: (msg: string) => void;
}

export const OffersGrid: React.FC<OffersGridProps> = ({ onClaimOffer }) => {
  return (
    <section className="space-y-6">
      <div className="border-b border-slate-200/60 pb-3">
        <h2 className="text-2xl font-extrabold uppercase tracking-wider text-slate-950">
          OUR OFFERS
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          onClick={() => onClaimOffer('Applied promo code AURA20!')}
          className="bg-white border border-luxury-gold-light/20 p-6 rounded-2xl shadow-3xs flex flex-col justify-between items-start gap-4 cursor-pointer hover:border-luxury-gold transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100">
            <Percent size={18} />
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase text-slate-900 tracking-wider">Flat 10% Off First Order</h4>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">Sign up to our Atelier privileges and apply promo code <strong className="font-mono text-slate-800">AURA20</strong> at checkout.</p>
          </div>
        </div>

        <div 
          onClick={() => onClaimOffer('Sizing gift active with next checkout!')}
          className="bg-white border border-luxury-gold-light/20 p-6 rounded-2xl shadow-3xs flex flex-col justify-between items-start gap-4 cursor-pointer hover:border-luxury-gold transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <Sparkles size={18} />
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase text-slate-900 tracking-wider">Complimentary Sizing Gifts</h4>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">Order any two outerwear shells this week and receive a complimentary designer daypack accessory.</p>
          </div>
        </div>

        <div 
          onClick={() => onClaimOffer('Express shipping qualified!')}
          className="bg-white border border-luxury-gold-light/20 p-6 rounded-2xl shadow-3xs flex flex-col justify-between items-start gap-4 cursor-pointer hover:border-luxury-gold transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
            <Truck size={18} />
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase text-slate-900 tracking-wider">Free Global Express Shipping</h4>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">Spend over Rs. 300 and receive complimentary secure express shipping directly to your doorstep globally.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
