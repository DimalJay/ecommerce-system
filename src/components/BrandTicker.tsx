import React from 'react';

const BRAND_LOGOS = [
  { name: 'pallu', style: 'font-serif italic font-extrabold text-rose-800' },
  { name: 'M&RK', style: 'font-sans font-black tracking-widest text-slate-800' },
  { name: 'NOLIMIT', style: 'font-mono font-black text-emerald-800' },
  { name: 'DEEDAT', style: 'font-serif tracking-widest text-slate-900' },
  { name: 'HUF & DEE', style: 'font-sans font-extrabold text-blue-900' }
];

export const BrandTicker: React.FC = () => {
  return (
    <section className="bg-white border-y border-slate-100 py-6 overflow-hidden">
      <div className="w-full relative flex items-center">
        {/* Infinite Marquee Wrapper */}
        <div className="flex animate-marquee gap-24 whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              {BRAND_LOGOS.map((brand, idx) => (
                <div key={`${i}-${idx}`} className={`text-xl uppercase tracking-widest ${brand.style} mx-4`}>
                  {brand.name}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
