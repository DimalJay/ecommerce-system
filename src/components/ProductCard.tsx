import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { StarRating } from './ui';

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
  onAddToCart: (product: Product, size: string, color: string) => void;
  onOpenQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onOpenQuickView
}) => {
  return (
    <div className="group bg-white border border-luxury-gold-light/25 hover:border-luxury-gold-light/70 rounded-3xl p-4 flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-luxury-gold/5 hover:-translate-y-1.5 relative overflow-hidden">

      {/* Product Image Box with Overlay */}
      <div className="relative bg-luxury-sand h-72 w-full rounded-2xl overflow-hidden mb-3.5 border border-luxury-gold-light/15">
        <Link to={`/product/${product.id}`} className="block h-full w-full">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </Link>

        {/* Discount / New Badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {product.discount && (
            <span className="bg-luxury-gold text-white text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm backdrop-blur-xs">
              {product.discount}
            </span>
          )}
          {product.isNew && (
            <span className="bg-luxury-charcoal text-luxury-cream text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
              New
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={() => onToggleWishlist(product.id)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white backdrop-blur-md shadow-sm border border-luxury-gold-light/20 flex items-center justify-center text-slate-600 hover:text-rose-500 transition-all duration-200 cursor-pointer z-10 active:scale-90"
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-label="Wishlist"
        >
          <Heart
            size={16}
            fill={isWishlisted ? '#f43f5e' : 'none'}
            className={isWishlisted ? 'text-rose-500' : 'text-slate-600 transition-transform group-hover:scale-110'}
          />
        </button>

        {/* Quick View Button */}
        <button
          type="button"
          onClick={() => onOpenQuickView(product)}
          className="absolute top-14 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white backdrop-blur-md shadow-sm border border-luxury-gold-light/20 flex items-center justify-center text-slate-600 hover:text-luxury-gold transition-all duration-200 cursor-pointer z-10 active:scale-90 lg:opacity-0 lg:group-hover:opacity-100 lg:-translate-x-2 lg:group-hover:translate-x-0"
          title="Quick View"
          aria-label="Quick View"
        >
          <Eye size={16} />
        </button>
      </div>

      {/* Product Details Section */}
      <div className="flex flex-col flex-1 gap-2">
        {/* Rating & Color Swatches Row */}
        <div className="flex items-center justify-between min-h-[20px]">
          <StarRating rating={product.rating} size={12} />

          {product.swatches && (
            <div className="flex items-center gap-1">
              {product.swatches.map((sw, idx) => (
                <span
                  key={idx}
                  className="w-2.5 h-2.5 rounded-full border border-slate-300 shadow-2xs"
                  style={{ backgroundColor: sw }}
                  title={`Color swatch ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Color / Brand Subtitle */}
        <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">
          {product.colorName}
        </span>

        {/* Product Title */}
        <Link to={`/product/${product.id}`} className="block group/title">
          <h3 className="text-xs sm:text-sm font-bold text-luxury-charcoal group-hover/title:text-luxury-gold transition-colors leading-snug line-clamp-1">
            {product.title}
          </h3>
        </Link>

        {/* Bottom Price & Add Button */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-luxury-sand/80">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm sm:text-base font-extrabold text-luxury-gold">
              Rs. {product.price.toFixed(2)}
            </span>
            {product.oldPrice && (
              <span className="text-[10px] text-slate-400 line-through font-semibold">
                Rs. {product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => onAddToCart(product, 'M', product.colorName)}
            className="bg-luxury-sand hover:bg-luxury-gold text-luxury-charcoal hover:text-white border border-luxury-gold-light/50 hover:border-luxury-gold px-3 py-1.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase transition-all duration-200 flex items-center gap-1 cursor-pointer active:scale-95 shadow-2xs"
          >
            <ShoppingBag size={11} />
            + Add
          </button>
        </div>
      </div>
    </div>
  );
};
