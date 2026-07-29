import React from 'react';
import { Star, ShoppingBag, Heart, Minus, Plus } from 'lucide-react';
import type { Product } from '../ProductCard';

interface ProductInfoSectionProps {
  product: Product;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  wishlisted: boolean;
  onToggleWishlist: () => void;
  onAddToBag: () => void;
  onOpenSizeGuide: () => void;
}

export const ProductInfoSection: React.FC<ProductInfoSectionProps> = ({
  product,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity,
  wishlisted,
  onToggleWishlist,
  onAddToBag,
  onOpenSizeGuide
}) => {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-luxury-gold block">
          {product.category} COLLECTION
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-luxury-charcoal">
          {product.title}
        </h1>

        {/* Rating Summary */}
        <div className="flex items-center gap-2 text-sm text-slate-500 pt-1">
          <div className="flex items-center text-amber-400">
            <Star size={14} fill="#f59e0b" className="text-amber-500" />
          </div>
          <span className="font-extrabold text-luxury-charcoal">{product.rating}</span>
          <span>&bull;</span>
          <span className="font-semibold text-slate-400 hover:text-luxury-gold transition-colors cursor-pointer">
            {product.reviewsCount} customer reviews
          </span>
        </div>
      </div>

      {/* Price Indicator */}
      <div className="flex items-baseline gap-3 border-y border-luxury-gold-light/20 py-4">
        <span className="text-3xl font-black text-luxury-gold">
          Rs. {product.price.toFixed(2)}
        </span>
        {product.oldPrice && (
          <span className="text-sm text-slate-400 line-through font-bold">
            Rs. {product.oldPrice.toFixed(2)}
          </span>
        )}
        {product.oldPrice && (
          <span className="text-[10px] font-extrabold uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
            SAVE Rs. {(product.oldPrice - product.price).toFixed(2)}
          </span>
        )}
      </div>

      {/* Swatch & Color Selector */}
      <div className="space-y-3 text-left">
        <span className="text-xs font-extrabold text-slate-600 uppercase tracking-widest block">
          Color: <strong className="text-luxury-charcoal font-black">{selectedColor}</strong>
        </span>
        {product.swatches && (
          <div className="flex items-center gap-2.5">
            {product.swatches.map((sw, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedColor(sw)}
                className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all cursor-pointer hover:scale-105 ${
                  selectedColor === sw ? 'border-luxury-gold ring-1 ring-luxury-gold/30' : 'border-slate-300'
                }`}
                style={{ backgroundColor: sw }}
                title={sw}
              />
            ))}
          </div>
        )}
      </div>

      {/* Size Selector */}
      <div className="space-y-3 text-left">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-slate-600 uppercase tracking-widest">
            Size: <strong className="text-luxury-charcoal font-black">{selectedSize}</strong>
          </span>
          <button
            type="button"
            onClick={onOpenSizeGuide}
            className="text-xs font-bold text-luxury-gold hover:text-luxury-gold-dark transition-colors uppercase tracking-wider underline cursor-pointer"
          >
            Size Guide
          </button>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {['XS', 'S', 'M', 'L', 'XL'].map((sz) => (
            <button
              key={sz}
              type="button"
              onClick={() => setSelectedSize(sz)}
              className={`py-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                selectedSize === sz
                  ? 'border-luxury-gold bg-luxury-sand text-luxury-charcoal'
                  : 'border-luxury-gold-light/20 bg-white hover:border-luxury-gold-light/50 text-slate-600'
              }`}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity Selector & Action Buttons */}
      <div className="space-y-4 pt-2">
        <div className="flex gap-4">
          {/* Quantity Controls */}
          <div className="flex items-center border border-luxury-gold-light/40 rounded-2xl px-4 py-2 bg-white">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="p-1 text-slate-500 hover:text-luxury-charcoal transition-colors cursor-pointer"
            >
              <Minus size={14} />
            </button>
            <span className="px-4 text-sm font-black text-luxury-charcoal min-w-[24px] text-center">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="p-1 text-slate-500 hover:text-luxury-charcoal transition-colors cursor-pointer"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Add to Cart */}
          <button
            type="button"
            onClick={onAddToBag}
            className="flex-1 py-4 bg-luxury-gold hover:bg-luxury-gold-dark text-white rounded-2xl text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-luxury-gold/25 flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
          >
            <ShoppingBag size={15} />
            Add to Atelier Bag
          </button>

          {/* Add to Wishlist */}
          <button
            type="button"
            onClick={onToggleWishlist}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-center ${
              wishlisted
                ? 'bg-rose-50 border-rose-200 text-rose-500'
                : 'border-luxury-gold-light/30 hover:border-luxury-gold text-slate-400 hover:text-luxury-charcoal bg-white'
            }`}
            title="Add to saved collection"
          >
            <Heart size={18} fill={wishlisted ? '#f43f5e' : 'none'} />
          </button>
        </div>
      </div>
    </div>
  );
};
