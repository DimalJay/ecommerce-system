import React from 'react';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';

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
    <div className="bg-white border border-luxury-gold-light/20 rounded-3xl p-4 flex flex-col transition-all duration-500 hover:shadow-xl hover:border-luxury-gold-light/60 hover:-translate-y-1.5 group">
      
      {/* Product Image Box with Hover Quick Add Overlay */}
      <div className="relative bg-luxury-sand h-80 w-full rounded-2xl overflow-hidden mb-4 border border-luxury-gold-light/10">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-1000"
        />

        {/* Discount / Category Badge */}
        {product.discount && (
          <span className="absolute top-3 left-3 bg-luxury-gold text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-2xs">
            {product.discount}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => onToggleWishlist(product.id)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs shadow-2xs border border-luxury-gold-light/10 flex items-center justify-center text-slate-600 hover:text-rose-500 hover:bg-white transition-all cursor-pointer z-10"
          title="Wishlist"
        >
          <Heart 
            size={16} 
            fill={isWishlisted ? '#f43f5e' : 'none'} 
            className={isWishlisted ? 'text-rose-500' : 'text-slate-500 group-hover:scale-110 transition-transform'} 
          />
        </button>

        {/* Quick Add / Quick View Hover slide-up overlay */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-350 flex gap-2">
          {/* Quick View */}
          <button
            onClick={() => onOpenQuickView(product)}
            className="flex-1 bg-white/90 hover:bg-white text-luxury-charcoal text-[10px] font-black py-3 rounded-xl backdrop-blur-xs shadow-md border border-luxury-gold-light/40 flex items-center justify-center gap-1.5 cursor-pointer transition-all uppercase tracking-wider"
          >
            <Eye size={12} />
            Quick View
          </button>
          
          {/* Direct Add */}
          <button
            onClick={() => onAddToCart(product, 'M', product.colorName)}
            className="p-3 bg-luxury-charcoal hover:bg-luxury-gold text-white hover:text-luxury-charcoal rounded-xl shadow-md flex items-center justify-center cursor-pointer transition-all"
            title="Quick Add to Bag"
          >
            <ShoppingBag size={14} />
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="flex flex-col flex-1 gap-2.5">
        {/* Rating & Color Swatches Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <span className="flex items-center text-amber-400">
              <Star size={12} fill="#f59e0b" className="text-amber-500" />
            </span>
            <span className="text-[11px] font-bold text-luxury-charcoal">{product.rating}</span>
            <span className="text-[10px] text-slate-400">({product.reviewsCount})</span>
          </div>

          {product.swatches && (
            <div className="flex items-center gap-1">
              {product.swatches.map((sw, idx) => (
                <span
                  key={idx}
                  className="w-2.5 h-2.5 rounded-full border border-slate-250 shadow-3xs"
                  style={{ backgroundColor: sw }}
                  title={product.colorName}
                ></span>
              ))}
            </div>
          )}
        </div>

        {/* Brand/Color Name Subtitle */}
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
          {product.colorName}
        </span>

        {/* Product Title */}
        <h3 className="text-xs sm:text-sm font-bold text-luxury-charcoal group-hover:text-luxury-gold transition-colors leading-snug line-clamp-1">
          {product.title}
        </h3>

        {/* Bottom Price & Add Button */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-luxury-sand">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-black text-luxury-gold">
              ${product.price.toFixed(2)}
            </span>
            {product.oldPrice && (
              <span className="text-[10px] text-slate-400 line-through font-semibold">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product, 'M', product.colorName)}
            className="bg-luxury-sand hover:bg-luxury-gold text-luxury-charcoal hover:text-white border border-luxury-gold-light/40 hover:border-luxury-gold px-3.5 py-1.5 rounded-full text-[10px] font-black tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ShoppingBag size={11} />
            + Add
          </button>
        </div>
      </div>
    </div>
  );
};
