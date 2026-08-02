import React from 'react';
import { ArrowLeft, Grid, List } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CategoryHeaderProps {
  title: string;
  desc: string;
  viewMode: 'grid' | 'list';
  setViewMode: (val: 'grid' | 'list') => void;
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  title,
  desc,
  viewMode,
  setViewMode
}) => {
  return (
    <div className="space-y-4">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-xs font-bold text-luxury-gold hover:text-luxury-gold-dark transition-colors uppercase tracking-widest cursor-pointer"
      >
        <ArrowLeft size={14} /> Back to Shop
      </Link>
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-luxury-gold-light/20 pb-6">
        <div className="space-y-2 max-w-2xl text-left">
          <span className="text-[10px] font-black text-luxury-gold uppercase tracking-widest block">
            Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-luxury-charcoal uppercase">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-medium">
            {desc}
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-end">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="flex items-center gap-2 px-4 py-2 min-h-[44px] border border-luxury-gold-light/30 hover:border-luxury-gold rounded-full text-xs font-bold uppercase tracking-wider bg-white transition-all cursor-pointer"
          >
            {viewMode === 'grid' ? <List size={12} /> : <Grid size={12} />}
            <span>{viewMode === 'grid' ? 'List View' : 'Grid View'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default CategoryHeader;
