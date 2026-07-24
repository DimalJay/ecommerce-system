import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

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
    <section id="deals" className="rounded-3xl bg-[#e0f2fe] p-8 sm:p-12 my-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xs border border-sky-200/80">
      <div className="flex flex-col items-start max-w-xl">
        <span className="bg-[#0284c7] text-white px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-3 shadow-xs">
          LIMITED SEASON PRIVILEGE
        </span>
        <h3 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3 tracking-tight">
          Enjoy Extra <span className="text-[#0284c7]">20% Off</span> Storewide
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 mb-6 leading-relaxed">
          Upgrade your everyday wardrobe with AuraFashion essentials. Redeem code <span className="font-mono bg-white px-2.5 py-1 rounded-md text-slate-900 font-bold border border-sky-200">AURA20</span>.
        </p>

        <div className="flex gap-3">
          <div className="bg-white border border-sky-200 px-4 py-2.5 rounded-xl text-center shadow-xs min-w-[65px]">
            <span className="text-xl font-black text-slate-900 block">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Hours</span>
          </div>
          <div className="bg-white border border-sky-200 px-4 py-2.5 rounded-xl text-center shadow-xs min-w-[65px]">
            <span className="text-xl font-black text-slate-900 block">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Mins</span>
          </div>
          <div className="bg-white border border-sky-200 px-4 py-2.5 rounded-xl text-center shadow-xs min-w-[65px]">
            <span className="text-xl font-black text-[#0284c7] block">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Secs</span>
          </div>
        </div>
      </div>

      <button className="bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold px-8 py-3.5 rounded-full shadow-md shadow-sky-600/20 transition-all text-xs uppercase tracking-wider whitespace-nowrap cursor-pointer flex items-center gap-2 transform hover:-translate-y-0.5">
        Claim offer now <ChevronRight size={16} />
      </button>
    </section>
  );
};
