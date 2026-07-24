import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';

export interface Product {
  id: number;
  title: string;
  category: string;
  colorName: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  discount?: string;
  image: string;
  isNew?: boolean;
  swatches?: string[];
}

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (id: number) => void;
  onAddToCart: (title: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart
}) => {
  return (
    <div className="bg-white border border-sky-100/90 rounded-2xl p-4 flex flex-col transition-all duration-300 hover:shadow-2xl hover:border-sky-300/80 hover:-translate-y-1.5 group">
      {/* Product Image Box with Hover Quick Add Overlay */}
      <div className="relative bg-sky-50/50 h-72 w-full rounded-xl overflow-hidden mb-4 border border-sky-100/60">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* Discount Badge */}
        {product.discount && (
          <span className="absolute top-3 left-3 bg-[#0284c7] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            {product.discount}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => onToggleWishlist(product.id)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-sky-100 flex items-center justify-center text-slate-600 hover:text-rose-500 hover:bg-white transition-all cursor-pointer"
          title="Wishlist"
        >
          <Heart size={16} fill={isWishlisted ? '#f43f5e' : 'none'} className={isWishlisted ? 'text-rose-500' : ''} />
        </button>

        {/* Quick Add Hover Slide-Up Overlay */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={() => onAddToCart(product.title)}
            className="w-full bg-[#0284c7]/95 hover:bg-[#0284c7] text-white text-xs font-bold py-2.5 rounded-xl backdrop-blur-md shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <ShoppingCart size={14} />
            Quick Add to Bag
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="flex flex-col flex-1 gap-2">
        {/* Rating & Color Swatches Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
            <span className="flex items-center text-amber-400">
              <Star size={13} fill="#f59e0b" />
            </span>
            <span className="text-[11px] font-bold text-slate-700">{product.rating}</span>
            <span className="text-[10px] text-slate-400">({product.reviewsCount})</span>
          </div>

          {product.swatches && (
            <div className="flex items-center gap-1.5">
              {product.swatches.map((sw, idx) => (
                <span
                  key={idx}
                  className="w-2.5 h-2.5 rounded-full border border-slate-300 shadow-2xs"
                  style={{ backgroundColor: sw }}
                  title={product.colorName}
                ></span>
              ))}
            </div>
          )}
        </div>

        {/* Color Name Subtitle */}
        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
          {product.colorName}
        </span>

        {/* Product Title */}
        <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0284c7] transition-colors leading-snug line-clamp-1">
          {product.title}
        </h3>

        {/* Bottom Price & Add Button */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-sky-100/80">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-black text-[#0284c7]">
              ${product.price.toFixed(2)}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-slate-400 line-through font-semibold">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product.title)}
            className="bg-sky-50 hover:bg-[#0284c7] text-[#0284c7] hover:text-white border border-sky-200 hover:border-[#0284c7] px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <ShoppingCart size={13} />
            + Add
          </button>
        </div>
      </div>
    </div>
  );
};
