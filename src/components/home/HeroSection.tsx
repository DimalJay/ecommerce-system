import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    leftImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
    rightImage: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&w=600&q=80',
    discount: '10% OFF',
    subText: 'ON YOUR FIRST ORDER',
    accentColor: '#ca8a04',
    bgColor: '#fef9c3' // Soft mustard/beige theme
  },
  {
    leftImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80',
    rightImage: 'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=600&q=80',
    discount: '15% OFF',
    subText: 'SUMMER PRIVILEGE',
    accentColor: '#dc2626',
    bgColor: '#fee2e2' // Soft red/pink theme
  },
  {
    leftImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
    rightImage: 'https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=600&q=80',
    discount: 'NEW SEASON',
    subText: 'ATELIER CAPSULE 2026',
    accentColor: '#1d4ed8',
    bgColor: '#eff6ff' // Soft slate blue theme
  },
  {
    leftImage: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=600&q=80',
    rightImage: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80',
    discount: '20% OFF',
    subText: 'ARCHIVE CLASSICS EVENT',
    accentColor: '#15803d',
    bgColor: '#f0fdf4' // Soft olive green theme
  }
];

export const HeroSection: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const active = SLIDES[index];

  return (
    <section 
      className="relative w-full rounded-2xl overflow-hidden border border-luxury-gold-light/20 shadow-xs min-h-[320px] md:min-h-[400px] flex items-center transition-colors duration-500"
      style={{ backgroundColor: active.bgColor }}
    >
      
      {/* Slide Container */}
      <div className="w-full grid grid-cols-12 items-center">
        
        {/* Left Model */}
        <div className="col-span-4 h-[320px] md:h-[400px] overflow-hidden relative">
          <img 
            src={active.leftImage} 
            alt="New Arrivals Left" 
            className="w-full h-full object-cover object-top animate-fade-in"
          />
          {/* Gradient fading into the center */}
          <div 
            className="absolute inset-y-0 right-0 w-28 transition-all duration-500 pointer-events-none"
            style={{ backgroundImage: `linear-gradient(to right, transparent, ${active.bgColor})` }}
          />
        </div>

        {/* Center Banner Offer */}
        <div className="col-span-4 flex flex-col items-center justify-center text-center p-4 md:p-8 space-y-3 z-10 font-sans">
          <span className="text-[10px] md:text-xs font-bold tracking-widest text-slate-400">FLAT</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-luxury-charcoal" style={{ color: active.accentColor }}>
            {active.discount}
          </h2>
          <p className="text-[9px] md:text-[11px] font-bold uppercase tracking-widest text-slate-500 max-w-[150px] md:max-w-none">
            {active.subText}
          </p>
          <button 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-block mt-4 px-6 py-2 border-2 border-luxury-charcoal hover:bg-luxury-charcoal hover:text-white text-luxury-charcoal text-[9px] md:text-[10px] font-bold uppercase tracking-widest rounded-md transition-all cursor-pointer"
          >
            SHOP NOW
          </button>
        </div>

        {/* Right Model */}
        <div className="col-span-4 h-[320px] md:h-[400px] overflow-hidden relative">
          <img 
            src={active.rightImage} 
            alt="New Arrivals Right" 
            className="w-full h-full object-cover object-top animate-fade-in"
          />
          {/* Gradient fading into the center */}
          <div 
            className="absolute inset-y-0 left-0 w-28 transition-all duration-500 pointer-events-none"
            style={{ backgroundImage: `linear-gradient(to left, transparent, ${active.bgColor})` }}
          />
        </div>

      </div>

      {/* Nav Controls */}
      <button 
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/70 hover:bg-white text-slate-700 flex items-center justify-center border border-luxury-gold-light/20 shadow-xs cursor-pointer z-10"
        title="Previous banner"
      >
        <ChevronLeft size={16} />
      </button>

      <button 
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/70 hover:bg-white text-slate-700 flex items-center justify-center border border-luxury-gold-light/20 shadow-xs cursor-pointer z-10"
        title="Next banner"
      >
        <ChevronRight size={16} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {SLIDES.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${index === idx ? 'bg-luxury-gold w-4' : 'bg-slate-300'}`}
          />
        ))}
      </div>

    </section>
  );
};
