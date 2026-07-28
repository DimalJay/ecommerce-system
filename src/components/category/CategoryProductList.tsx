import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { ProductCard } from '../ProductCard';
import type { Product } from '../ProductCard';

interface CategoryProductListProps {
  products: Product[];
  viewMode: 'grid' | 'list';
  wishlist: number[];
  toggleWishlist: (id: number) => void;
  handleAddToCart: (product: Product) => void;
  setActiveQuickViewProduct: (product: Product) => void;
}

export const CategoryProductList: React.FC<CategoryProductListProps> = ({
  products,
  viewMode,
  wishlist,
  toggleWishlist,
  handleAddToCart,
  setActiveQuickViewProduct
}) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-20 bg-white border border-luxury-gold-light/20 rounded-3xl p-8 max-w-md mx-auto space-y-4">
        <p className="text-sm text-slate-500 font-semibold">No items available in this category.</p>
        <Link to="/" className="inline-block px-6 py-2 bg-luxury-gold text-white text-xs font-bold uppercase rounded-full tracking-widest">
          Back to Home
        </Link>
      </div>
    );
  }

  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            isWishlisted={wishlist.includes(p.id)}
            onToggleWishlist={toggleWishlist}
            onAddToCart={handleAddToCart}
            onOpenQuickView={setActiveQuickViewProduct}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {products.map((p) => (
        <div
          key={p.id}
          className="bg-white border border-luxury-gold-light/20 rounded-3xl p-4 flex flex-col sm:flex-row items-center gap-6 transition-all duration-300 hover:shadow-md hover:border-luxury-gold-light/50"
        >
          {/* Image */}
          <div className="relative w-full sm:w-48 aspect-3/4 rounded-2xl overflow-hidden shrink-0 bg-luxury-sand">
            <Link to={`/product/${p.id}`} className="block w-full h-full">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
            </Link>
            {p.discount && (
              <span className="absolute top-3 left-3 bg-luxury-gold text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {p.discount}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 text-left space-y-3 w-full">
            <div className="flex justify-between items-start gap-4">
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
                  {p.colorName}
                </span>
                <Link to={`/product/${p.id}`} className="block mt-1">
                  <h3 className="text-base font-extrabold text-luxury-charcoal hover:text-luxury-gold transition-colors">
                    {p.title}
                  </h3>
                </Link>
              </div>
              {/* Price */}
              <div className="text-right">
                <span className="text-lg font-black text-luxury-gold block">
                  Rs. {p.price.toFixed(2)}
                </span>
                {p.oldPrice && (
                  <span className="text-xs text-slate-400 line-through font-bold">
                    Rs. {p.oldPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
              High-performance technical fabrication and modern tailored aesthetics suited for everyday luxury. Features premium craftsmanship and dynamic swatches.
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-luxury-sand">
              {/* Rating */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="text-amber-400">★</span>
                <span className="font-bold text-luxury-charcoal">{p.rating}</span>
                <span className="text-slate-400">({p.reviewsCount} reviews)</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleWishlist(p.id)}
                  className={`p-2 rounded-full border transition-all cursor-pointer ${
                    wishlist.includes(p.id) ? 'bg-rose-50 border-rose-200 text-rose-500' : 'border-slate-200 text-slate-400 hover:text-rose-500'
                  }`}
                >
                  <Heart size={14} fill={wishlist.includes(p.id) ? '#f43f5e' : 'none'} />
                </button>
                <button
                  onClick={() => setActiveQuickViewProduct(p)}
                  className="px-4 py-2 border border-luxury-gold-light/30 hover:border-luxury-gold text-luxury-charcoal rounded-full text-[10px] font-bold tracking-widest uppercase transition-all bg-white cursor-pointer"
                >
                  Quick View
                </button>
                <button
                  onClick={() => handleAddToCart(p)}
                  className="px-5 py-2 bg-luxury-gold hover:bg-luxury-gold-dark text-white rounded-full text-[10px] font-bold tracking-widest uppercase transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <ShoppingBag size={12} />
                  Add to Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default CategoryProductList;
