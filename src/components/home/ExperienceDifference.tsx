import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Lock } from 'lucide-react';

export const ExperienceDifference: React.FC = () => {
  return (
    <section className="space-y-8 bg-white border border-luxury-gold-light/20 p-8 rounded-3xl">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h2 className="text-2xl font-extrabold uppercase tracking-wider text-slate-950">
          EXPERIENCE THE DIFFERENCE
        </h2>
        <p className="text-xs text-slate-500">
          Discover why thousands globally choose AuraAtelier for their everyday fashion statements.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex flex-col items-center text-center p-4 gap-3">
          <div className="w-12 h-12 bg-luxury-sand text-luxury-gold rounded-full flex items-center justify-center border border-luxury-gold-light/20">
            <Truck size={22} />
          </div>
          <h4 className="text-xs font-bold uppercase text-slate-900 tracking-wider">Free Global Shipping</h4>
          <p className="text-[11px] text-slate-500">Complimentary express dispatch on orders over Rs. 300.</p>
        </div>

        <div className="flex flex-col items-center text-center p-4 gap-3">
          <div className="w-12 h-12 bg-luxury-sand text-luxury-gold rounded-full flex items-center justify-center border border-luxury-gold-light/20">
            <ShieldCheck size={22} />
          </div>
          <h4 className="text-xs font-bold uppercase text-slate-900 tracking-wider">3-Year Guarantee</h4>
          <p className="text-[11px] text-slate-500">Guaranteed 100% authentic premium craftsmanship.</p>
        </div>

        <div className="flex flex-col items-center text-center p-4 gap-3">
          <div className="w-12 h-12 bg-luxury-sand text-luxury-gold rounded-full flex items-center justify-center border border-luxury-gold-light/20">
            <RotateCcw size={22} />
          </div>
          <h4 className="text-xs font-bold uppercase text-slate-900 tracking-wider">30-Day Easy Returns</h4>
          <p className="text-[11px] text-slate-500">Hassle-free exchange and full refund policy.</p>
        </div>

        <div className="flex flex-col items-center text-center p-4 gap-3">
          <div className="w-12 h-12 bg-luxury-sand text-luxury-gold rounded-full flex items-center justify-center border border-luxury-gold-light/20">
            <Lock size={22} />
          </div>
          <h4 className="text-xs font-bold uppercase text-slate-900 tracking-wider">Secure Checkout</h4>
          <p className="text-[11px] text-slate-500">256-Bit SSL encrypted safe payment processing.</p>
        </div>
      </div>
    </section>
  );
};
