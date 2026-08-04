import React, { useState, useEffect } from 'react';

const SLIDES = [
  {
    image: 'https://plus.unsplash.com/premium_photo-1713483864121-bb85ae97d2ac?auto=format&fit=crop&w=1600&q=80',
    title: 'New Season Arrivals',
    subtitle: 'Discover curated pieces for the modern wardrobe',
    link: '/category/new-arrivals'
  },
  {
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80',
    title: 'Women\'s Collection',
    subtitle: 'Timeless elegance meets contemporary design',
    link: '/category/women'
  },
  {
    image: 'https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?auto=format&fit=crop&w=1600&q=80',
    title: 'Accessories Collection',
    subtitle: 'Complete your look with premium shoes and essentials',
    link: '/category/accessories'
  }
];

export const HeroSection: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const active = SLIDES[index];

  return (
    <section className="relative w-full h-105 md:h-130 rounded-xl overflow-hidden">
      {SLIDES.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-700 ${
            idx === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <img
            src={slide.image}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-text-primary/70 via-text-primary/30 to-transparent" />
        </div>
      ))}

      <div className="relative z-10 h-full flex items-center px-8 md:px-12">
        <div className="max-w-lg space-y-4 animate-fade-in">
          <span className="text-accent text-xs font-semibold uppercase tracking-widest">
            AuraFashion
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-elevated leading-tight">
            {active.title}
          </h1>
          <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-md">
            {active.subtitle}
          </p>
          <a
            href={active.link}
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-elevated text-sm font-semibold rounded-lg transition-all hover:-translate-y-0.5"
          >
            Shop Now
          </a>
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setIndex(idx)}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              idx === index ? 'w-8 bg-accent' : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
