import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroSectionProps {
  onAddToCart: (title: string) => void;
}

const ACCESSORIES_SLIDES = [
  {
    title: 'BROWSE ACCESSORIES',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'FOOTWEAR & BAGS',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'TECHNICAL OUTERWEAR',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80'
  }
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onAddToCart }) => {
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const activeSlide = ACCESSORIES_SLIDES[slideIndex];

  const handleNextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % ACCESSORIES_SLIDES.length);
  };

  const handlePrevSlide = () => {
    setSlideIndex((prev) => (prev - 1 + ACCESSORIES_SLIDES.length) % ACCESSORIES_SLIDES.length);
  };

  return (
    <div className="space-y-6 my-4">
      {/* Main Top Large Hero Banner */}
      <section className="relative rounded-3xl bg-[#e0f2fe] border border-sky-200/60 overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center min-h-[440px]">
        {/* Left Side Image */}
        <div className="lg:col-span-6 h-full flex items-center justify-center p-6 lg:p-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80"
            alt="Elevate your everyday looks"
            className="w-full h-full max-h-[460px] object-cover object-top rounded-2xl lg:rounded-none"
          />
        </div>

        {/* Right Side Content */}
        <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col items-start gap-5">
          <span className="bg-white/80 text-[#0369a1] border border-sky-200 text-[11px] font-bold px-4 py-1.5 rounded-full shadow-xs">
            Fashion made simple
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            <span className="text-[#0284c7]">El</span>evate your <br />
            every<span className="text-[#0284c7]">day</span> looks
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md">
            AuraFashion brings you a wide range of trendy and stylish clothing at affordable prices.
          </p>

          <button
            onClick={() => onAddToCart('Elevate Everyday Outfit')}
            className="bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold px-8 py-3.5 rounded-full shadow-md shadow-sky-600/20 transition-all text-xs uppercase tracking-wider cursor-pointer transform hover:-translate-y-0.5 mt-2"
          >
            Shop now
          </button>
        </div>
      </section>

      {/* Bottom Two Feature Banners Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Feature Card - 50% OFF */}
        <div className="lg:col-span-6 rounded-3xl bg-white border border-sky-200/80 p-6 sm:p-8 grid grid-cols-12 items-center gap-4 min-h-[220px] shadow-xs">
          <div className="col-span-5 h-full flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80"
              alt="50% off model"
              className="w-full h-48 object-cover rounded-2xl shadow-xs"
            />
          </div>

          <div className="col-span-7 flex flex-col items-start gap-2.5">
            <h2 className="text-4xl sm:text-5xl font-black text-[#0284c7] tracking-tight">
              50% <span className="text-2xl sm:text-3xl text-slate-900 font-bold">off</span>
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              AuraFashion brings you a wide range of trendy and stylish clothing at affordable prices.
            </p>
            <button
              onClick={() => onAddToCart('50% Off Special Collection')}
              className="mt-1 border border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 font-bold px-5 py-2 rounded-full text-xs transition-all cursor-pointer"
            >
              Shop now
            </button>
          </div>
        </div>

        {/* Right Feature Card - Browse Accessories Slider */}
        <div className="lg:col-span-6 rounded-3xl bg-[#bae6fd] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden min-h-[220px]">
          {/* Top Bar inside Banner */}
          <div className="flex items-center justify-between z-10">
            <span className="text-xs font-bold text-[#0369a1]">
              New arrival &bull; {activeSlide.year}
            </span>

            {/* Slider Arrow Controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrevSlide}
                className="w-7 h-7 bg-white hover:bg-slate-100 text-slate-700 rounded-full flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                title="Previous"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={handleNextSlide}
                className="w-7 h-7 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-full flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                title="Next"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Bottom Title & Right Side Image */}
          <div className="grid grid-cols-12 gap-4 items-end mt-4 z-10">
            <div className="col-span-7">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase leading-tight">
                {activeSlide.title}
              </h2>
            </div>
            <div className="col-span-5 flex justify-end">
              <img
                src={activeSlide.image}
                alt={activeSlide.title}
                className="w-full h-36 object-cover rounded-2xl shadow-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
