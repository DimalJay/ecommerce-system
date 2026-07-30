import React from 'react';
import { Sparkles } from 'lucide-react';

interface CategoryItem {
  key: string;
  title: string;
  image: string;
}

interface OtherCategoriesGridProps {
  categories: CategoryItem[];
  onNavigate: (key: string) => void;
}

export const OtherCategoriesGrid: React.FC<OtherCategoriesGridProps> = ({ categories, onNavigate }) => {
  return (
    <section className="space-y-6 pt-12 border-t border-luxury-gold-light/20">
      <div className="text-left max-w-xl">
        <span className="text-[10px] font-black text-luxury-gold uppercase tracking-widest block mb-1">
          Explore Collections
        </span>
        <h2 className="text-2xl font-black text-luxury-charcoal tracking-tight font-sans">
          Other Categories
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.key}
            className="relative bg-white border border-luxury-gold-light/20 rounded-3xl overflow-hidden aspect-3/2 group shadow-xs hover:shadow-md transition-all duration-500 hover:-translate-y-1"
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 brightness-95 group-hover:brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-slate-900/10 to-transparent flex flex-col justify-end p-6 text-left">
              <h3 className="text-sm sm:text-base font-extrabold text-white uppercase tracking-wider mb-2 drop-shadow-sm">
                {cat.title}
              </h3>
              <button
                onClick={() => onNavigate(cat.key)}
                className="w-fit bg-white/95 hover:bg-luxury-gold text-luxury-charcoal hover:text-white px-5 py-2 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <span>Show More</span>
                <Sparkles size={11} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default OtherCategoriesGrid;
