import React from 'react';

export interface Category {
  id: string;
  name: string;
  subtitle: string;
  count: string;
  image: string;
}

interface CategoryCardProps {
  category: Category;
  onSelectCategory: (id: string) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onSelectCategory }) => {
  return (
    <div
      onClick={() => onSelectCategory(category.id)}
      className="bg-white border border-luxury-gold-light/20 rounded-3xl p-4 cursor-pointer shadow-3xs hover:shadow-md hover:border-luxury-gold-light/60 hover:-translate-y-1 transition-all duration-500 group"
    >
      <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-3 bg-luxury-sand">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
        />
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full border border-luxury-gold-light/20">
          <span className="text-[9px] font-black text-luxury-gold uppercase tracking-wider">{category.count}</span>
        </div>
      </div>

      <div className="px-1">
        <h3 className="text-xs sm:text-sm font-black text-luxury-charcoal leading-snug group-hover:text-luxury-gold transition-colors">{category.name}</h3>
        <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{category.subtitle}</p>
      </div>
    </div>
  );
};
