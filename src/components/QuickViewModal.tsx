import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, Ruler } from 'lucide-react';
import type { Product } from '../types';
import { ProductImage, StarRating, SizeSelector, ColorSwatches, QuantitySelector } from './ui';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string, quantity: number) => void;
  onOpenSizeGuide: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onOpenSizeGuide
}) => {
  const [selectedSize, setSelectedSize] = useState(() => product?.availableSizes?.[0] ?? 'M');
  const [selectedColor, setSelectedColor] = useState(() => product?.swatches?.[0] ?? product?.colorName ?? '');
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    if (product.stock !== undefined && product.stock <= 0) return;
    onAddToCart(product, selectedSize, selectedColor, Math.min(quantity, product.stock ?? quantity));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-luxury-cream border border-luxury-gold-light/40 w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl z-10 animate-scale-up grid grid-cols-1 md:grid-cols-2">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white text-text-secondary hover:text-luxury-charcoal rounded-full transition-all border border-luxury-gold-light/20 cursor-pointer"
          title="Close modal"
        >
          <X size={18} />
        </button>

        {/* Product Image Section */}
        <div className="relative bg-luxury-sand h-56 md:h-full min-h-56 md:min-h-87.5">
          <ProductImage
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
          {product.discount && (
            <span className="absolute top-4 left-4 bg-luxury-gold text-white text-[10px] font-black px-4 py-2 rounded-full tracking-wider uppercase shadow-xs">
              {product.discount}
            </span>
          )}
        </div>

        {/* Product Content Details */}
        <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-[10px] font-black text-luxury-gold uppercase tracking-widest block">
              {product.category} Collection
            </span>
            <h2 className="text-xl md:text-2xl font-black text-luxury-charcoal leading-tight">
              {product.title}
            </h2>

            {/* Ratings and Reviews */}
            <StarRating rating={product.rating} showValue>
              <span className="text-text-muted">({product.reviewsCount} customer reviews)</span>
            </StarRating>

            {/* Price tag */}
            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-2xl font-black text-luxury-gold">
                Rs. {product.price.toFixed(2)}
              </span>
              {product.oldPrice && (
                <span className="text-sm text-text-muted line-through font-bold">
                  Rs. {product.oldPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-xs text-text-secondary leading-relaxed pt-2">
              Crafted from premium materials with attention to detail. {product.title} combines comfort, durability, and effortless style for everyday wear.
            </p>

            {/* Size Selector */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-luxury-charcoal uppercase tracking-wider">Select Size</span>
                <button 
                  onClick={onOpenSizeGuide}
                  className="text-luxury-gold hover:text-luxury-gold-dark font-bold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Ruler size={13} />
                  Size Guide
                </button>
              </div>
              <SizeSelector sizes={product.availableSizes} selectedSize={selectedSize} onSelect={setSelectedSize} />
            </div>

            {/* Color Swatch Selection */}
            {product.swatches && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-luxury-charcoal uppercase tracking-wider block">
                  Color: <span className="font-medium text-text-secondary">{selectedColor}</span>
                </span>
                <ColorSwatches swatches={product.swatches} selectedColor={selectedColor} onSelect={setSelectedColor} />
              </div>
            )}
          </div>

          {/* Add actions */}
          <div className="flex flex-col gap-3 pt-4 border-t border-luxury-sand">
            <div className="flex gap-4">
              {/* Quantity */}
              <QuantitySelector
                quantity={quantity}
                onDecrease={() => setQuantity(Math.max(1, quantity - 1))}
                onIncrease={() => setQuantity(product.stock !== undefined ? Math.min(quantity + 1, product.stock) : quantity + 1)}
                max={product.stock}
                variant="pill"
              />

              {/* Add to Bag */}
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-luxury-gold hover:bg-luxury-gold-dark text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-luxury-gold/15 transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag size={14} />
                Add to Bag
              </button>
            </div>

            {/* View Details Link */}
            <Link
              to={`/product/${product.id}`}
              onClick={onClose}
              className="w-full text-center py-3 border border-luxury-gold-light/40 hover:border-luxury-gold text-luxury-charcoal rounded-full text-xs font-bold uppercase tracking-widest transition-all hover:bg-luxury-sand/50"
            >
              View Full Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
