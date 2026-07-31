import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { StarRating } from './ui';
import type { Product } from '../types';

export type { Product };

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
    <div className="group bg-elevated border border-border hover:border-accent-light/60 rounded-xl p-4 flex flex-col transition-all duration-300 hover:shadow-md hover:-translate-y-1 relative overflow-hidden">

      {/* Product Image Box with Overlay */}
      <div className="relative bg-secondary h-72 w-full rounded-lg overflow-hidden mb-4">
        <Link to={`/product/${product.id}`} className="block h-full w-full">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </Link>

        {/* Discount / New Badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10 pointer-events-none">
          {product.discount && (
            <span className="bg-accent text-elevated text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              {product.discount}
            </span>
          )}
          {product.isNew && (
            <span className="bg-text-primary text-bg-primary text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              New
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={() => onToggleWishlist(product.id)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-elevated/90 hover:bg-elevated backdrop-blur-sm shadow-sm border border-border flex items-center justify-center text-text-secondary hover:text-danger transition-all duration-200 cursor-pointer z-10 active:scale-90"
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-label="Wishlist"
        >
          <Heart
            size={15}
            fill={isWishlisted ? '#dc2626' : 'none'}
            className={isWishlisted ? 'text-danger' : 'text-text-secondary'}
          />
        </button>

        {/* Quick View & Quick Add Hover Slide-up Overlay */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 ease-out flex gap-2 z-10">
          <button
            type="button"
            onClick={() => onOpenQuickView(product)}
            className="flex-1 bg-elevated/95 hover:bg-elevated text-text-primary text-xs font-medium py-3 px-3 rounded-lg backdrop-blur-sm shadow-md border border-border flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
          >
            <Eye size={13} />
            Quick View
          </button>

          <button
            type="button"
            onClick={() => onAddToCart(product, 'M', product.colorName)}
            className="p-3 bg-text-primary hover:bg-accent text-elevated hover:text-text-primary rounded-lg shadow-md flex items-center justify-center cursor-pointer transition-all duration-200 active:scale-[0.98]"
            title="Quick Add to Bag"
            aria-label="Quick Add to Bag"
          >
            <ShoppingBag size={14} />
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="flex flex-col flex-1 gap-1 sm:gap-2">
        {/* Rating & Color Swatches Row */}
        <div className="flex items-center justify-between">
          <StarRating rating={product.rating} size={11} />

          {product.swatches && (
            <div className="flex items-center gap-0.5 sm:gap-1">
              {product.swatches.map((sw, idx) => (
                <span
                  key={idx}
                  className="w-2.5 h-2.5 rounded-full border border-border"
                  style={{ backgroundColor: sw }}
                  title={`Color swatch ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider">
          {product.colorName}
        </span>

        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-sm font-semibold text-text-primary hover:text-accent transition-colors leading-snug line-clamp-1">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/60">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold text-accent">
              Rs. {product.price.toFixed(2)}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-text-muted line-through">
                Rs. {product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => onAddToCart(product, 'M', product.colorName)}
            className="bg-secondary hover:bg-accent text-text-secondary hover:text-elevated border border-border hover:border-accent px-3 py-2 rounded-lg text-xs font-semibold tracking-wider transition-all duration-200 flex items-center gap-1 cursor-pointer active:scale-95"
          >
            <ShoppingBag size={11} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
