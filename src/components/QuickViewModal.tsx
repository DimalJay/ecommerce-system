import React, { useState } from 'react';
import { X, Star, ShoppingBag, Ruler, Check } from 'lucide-react';
import type { Product } from './ProductCard';

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
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Initialize selected color once product loads
  React.useEffect(() => {
    if (product) {
      setSelectedColor(product.colorName);
      setSelectedSize('M');
      setQuantity(1);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    onClose();
  };

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
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
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white text-slate-500 hover:text-luxury-charcoal rounded-full transition-all border border-luxury-gold-light/20 cursor-pointer"
          title="Close modal"
        >
          <X size={18} />
        </button>

        {/* Product Image Section */}
        <div className="relative bg-luxury-sand h-72 md:h-full min-h-[350px]">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover"
          />
          {product.discount && (
            <span className="absolute top-4 left-4 bg-luxury-gold text-white text-[10px] font-black px-3.5 py-1.5 rounded-full tracking-wider uppercase shadow-xs">
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
            <div className="flex items-center gap-2 text-xs">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    fill={i < Math.floor(product.rating) ? '#f59e0b' : 'none'} 
                    className={i < Math.floor(product.rating) ? 'text-amber-500' : 'text-slate-300'}
                  />
                ))}
              </div>
              <span className="font-extrabold text-luxury-charcoal">{product.rating}</span>
              <span className="text-slate-400">({product.reviewsCount} customer reviews)</span>
            </div>

            {/* Price tag */}
            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-2xl font-black text-luxury-gold">
                ${product.price.toFixed(2)}
              </span>
              {product.oldPrice && (
                <span className="text-sm text-slate-400 line-through font-bold">
                  ${product.oldPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-xs text-slate-600 leading-relaxed pt-2">
              Designed with performance technical fabrication and modern aesthetics, the {product.title} offers lightweight insulation, elevated draping, and functional luxury suited for every environment.
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
              <div className="flex gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`w-10 h-10 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      selectedSize === s
                        ? 'bg-luxury-charcoal border-luxury-charcoal text-white shadow-md'
                        : 'border-luxury-gold-light/40 hover:border-luxury-gold bg-white text-slate-600'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Swatch Selection */}
            {product.swatches && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-luxury-charcoal uppercase tracking-wider block">
                  Color: <span className="font-medium text-slate-500">{selectedColor}</span>
                </span>
                <div className="flex gap-2">
                  {product.swatches.map((colorVal, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(product.colorName)}
                      className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                        selectedColor === product.colorName
                          ? 'ring-2 ring-luxury-gold border-white'
                          : 'border-slate-300'
                      }`}
                      style={{ backgroundColor: colorVal }}
                      title={product.colorName}
                    >
                      {selectedColor === product.colorName && <Check size={10} className="text-white drop-shadow-xs" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Add actions */}
          <div className="flex gap-4 pt-4 border-t border-luxury-sand">
            {/* Quantity */}
            <div className="flex items-center border border-luxury-gold-light/40 rounded-full px-4 py-2 bg-white">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-slate-500 hover:text-luxury-charcoal text-sm cursor-pointer"
              >
                -
              </button>
              <span className="px-4 text-xs font-bold text-luxury-charcoal min-w-[24px] text-center">
                {quantity}
              </span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="text-slate-500 hover:text-luxury-charcoal text-sm cursor-pointer"
              >
                +
              </button>
            </div>

            {/* Add to Bag */}
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-luxury-gold hover:bg-luxury-gold-dark text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-luxury-gold/15 transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag size={14} />
              Add to Bag
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
