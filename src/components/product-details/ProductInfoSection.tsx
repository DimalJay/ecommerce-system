import type React from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import type { Product } from '../../types';
import { StarRating, ColorSwatches, SizeSelector, QuantitySelector } from '../ui';

interface ProductInfoSectionProps {
  product: Product;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  sizes?: string[];
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
  sizes,
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

        <StarRating rating={product.rating} showValue>
          <span>&bull;</span>
          <span className="font-semibold text-text-muted hover:text-luxury-gold transition-colors cursor-pointer">
            {product.reviewsCount} customer reviews
          </span>
        </StarRating>
      </div>

      {/* Price Indicator */}
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2 border-y border-luxury-gold-light/20 py-4">
        <span className="text-3xl font-black text-luxury-gold">
          Rs. {product.price.toFixed(2)}
        </span>
        {product.oldPrice && (
          <>
            <span className="text-sm text-text-muted line-through font-bold">
              Rs. {product.oldPrice.toFixed(2)}
            </span>
            <span className="text-[10px] font-extrabold uppercase text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
              Save Rs. {(product.oldPrice - product.price).toFixed(2)}
            </span>
          </>
        )}

        {product.stock !== undefined && (
          <span
            className={`inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg sm:ml-auto ${
              product.stock <= 0
                ? 'bg-rose-50 text-rose-600'
                : product.stock <= 10
                ? 'bg-amber-50 text-amber-700'
                : 'bg-emerald-50 text-emerald-700'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                product.stock <= 0 ? 'bg-rose-500' : product.stock <= 10 ? 'bg-amber-500' : 'bg-emerald-500'
              }`}
            />
            {product.stock <= 0
              ? 'Out of Stock'
              : product.stock <= 10
              ? `Only ${product.stock} left in stock`
              : 'In Stock'}
          </span>
        )}
      </div>

      {/* Swatch & Color Selector */}
      <div className="space-y-3 text-left">
        <span className="text-xs font-extrabold text-text-secondary uppercase tracking-widest block">
          Color: <strong className="text-luxury-charcoal font-black">{selectedColor}</strong>
        </span>
        {product.swatches && (
          <ColorSwatches swatches={product.swatches} selectedColor={selectedColor} onSelect={setSelectedColor} />
        )}
      </div>

      {/* Size Selector */}
      <div className="space-y-3 text-left">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-text-secondary uppercase tracking-widest">
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
        <SizeSelector sizes={sizes} selectedSize={selectedSize} onSelect={setSelectedSize} />
      </div>

      {/* Quantity Selector & Action Buttons */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <QuantitySelector
            quantity={quantity}
            onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
            onIncrease={() => setQuantity((q) => (product.stock !== undefined ? Math.min(q + 1, product.stock) : q + 1))}
            max={product.stock}
          />

          <button
            type="button"
            onClick={onAddToBag}
            disabled={product.stock !== undefined && product.stock <= 0}
            className="flex-1 min-w-[160px] py-3.5 sm:py-4 bg-luxury-gold hover:bg-luxury-gold-dark text-white rounded-2xl text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-luxury-gold/25 flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:bg-luxury-gold"
          >
            <ShoppingBag size={15} />
            {product.stock !== undefined && product.stock <= 0 ? 'Out of Stock' : 'Add to Bag'}
          </button>

          <button
            type="button"
            onClick={onToggleWishlist}
            className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-center shrink-0 ${
              wishlisted
                ? 'bg-rose-50 border-rose-200 text-rose-500'
                : 'border-luxury-gold-light/30 hover:border-luxury-gold text-text-muted hover:text-luxury-charcoal bg-white'
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
