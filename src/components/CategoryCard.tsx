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
      className="bg-white border border-sky-100/90 rounded-2xl p-4 cursor-pointer shadow-xs hover:shadow-lg hover:border-sky-300 hover:-translate-y-1 transition-all duration-300 group"
    >
      <div className="relative h-48 w-full rounded-xl overflow-hidden mb-3 bg-sky-50/50">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-sky-100">
          <span className="text-[10px] font-bold text-[#0284c7] uppercase tracking-wider">{category.count}</span>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-black text-slate-900 leading-snug">{category.name}</h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">{category.subtitle}</p>
      </div>
    </div>
  );
};
