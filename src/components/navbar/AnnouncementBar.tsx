import React from 'react';
import { Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-luxury-charcoal text-luxury-cream text-center py-2 px-4 text-[10px] font-extrabold tracking-[0.15em] flex items-center justify-center gap-2 uppercase border-b border-luxury-gold/20 select-none">
      <Sparkles size={13} className="text-luxury-gold animate-pulse shrink-0" />
      <span>COMPLIMENTARY WORLDWIDE EXPRESS SHIPPING ON ORDERS OVER Rs. 300</span>
      <span className="hidden sm:inline-block text-luxury-gold-light/40">|</span>
      <span className="hidden sm:inline-block bg-luxury-gold/25 text-luxury-gold-light border border-luxury-gold/30 px-2 py-0.5 rounded text-[9px] font-mono tracking-widest">
        AURA20
      </span>
    </div>
  );
};
