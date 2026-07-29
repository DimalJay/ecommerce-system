import React, { useState, useEffect } from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';

export const PromoBanner: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 18, minutes: 45, seconds: 20 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="deals" className="rounded-3xl bg-luxury-sand p-8 sm:p-12 my-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xs border border-luxury-gold-light/35 relative overflow-hidden">
      
      {/* Decorative Blur BG */}
      <div className="absolute -top-10 -left-10 w-48 h-48 bg-luxury-gold/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col items-start max-w-xl relative z-10">
        <span className="bg-luxury-gold text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest mb-4 shadow-2xs flex items-center gap-1.5">
          <Sparkles size={11} className="animate-pulse" />
          Limited Season Privilege
        </span>
        <h3 className="text-3xl sm:text-4xl font-black text-luxury-charcoal mb-3 tracking-tight font-serif italic">
          Enjoy Extra <span className="text-luxury-gold font-sans not-italic font-black">20% Off</span> Storewide
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
          Upgrade your everyday wardrobe with AuraAtelier essentials. Redeem code <span className="font-mono bg-white px-2.5 py-1 rounded-lg text-luxury-charcoal font-black border border-luxury-gold-light/40">AURA20</span> during checkout.
        </p>

        {/* Countdown boxes */}
        <div className="flex gap-3">
          <div className="bg-white border border-luxury-gold-light/30 px-4 py-2.5 rounded-2xl text-center shadow-3xs min-w-[70px]">
            <span className="text-xl font-black text-luxury-charcoal block">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Hours</span>
          </div>
          <div className="bg-white border border-luxury-gold-light/30 px-4 py-2.5 rounded-2xl text-center shadow-3xs min-w-[70px]">
            <span className="text-xl font-black text-luxury-charcoal block">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Mins</span>
          </div>
          <div className="bg-white border border-luxury-gold-light/30 px-4 py-2.5 rounded-2xl text-center shadow-3xs min-w-[70px]">
            <span className="text-xl font-black text-luxury-gold block">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Secs</span>
          </div>
        </div>
      </div>

      <button className="bg-luxury-charcoal hover:bg-luxury-gold text-white hover:text-luxury-charcoal font-bold px-8 py-3.5 rounded-full shadow-md shadow-luxury-charcoal/10 transition-all text-xs uppercase tracking-widest whitespace-nowrap cursor-pointer flex items-center gap-2 transform hover:-translate-y-0.5 relative z-10">
        Claim offer now <ChevronRight size={16} />
      </button>
    </section>
  );
};
