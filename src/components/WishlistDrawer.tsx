import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import type { Product } from './ProductCard';
import { PRODUCTS } from '../data';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: number[];
  onRemoveFromWishlist: (productId: number) => void;
  onMoveToCart: (product: Product, size: string, color: string) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  onRemoveFromWishlist,
  onMoveToCart
}) => {
  if (!isOpen) return null;

  // Retrieve matching products from static database
  const wishlistedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-luxury-cream border-l border-luxury-gold-light/40 shadow-2xl flex flex-col h-full z-10 animate-slide-over">
        {/* Header */}
        <div className="p-6 border-b border-luxury-gold-light/30 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Heart className="text-rose-500 fill-rose-500" size={18} />
            <h2 className="text-lg font-black text-luxury-charcoal uppercase tracking-wider">
              Saved Collection ({wishlistIds.length})
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-luxury-sand text-slate-500 hover:text-luxury-charcoal rounded-full transition-colors cursor-pointer"
            aria-label="Close wishlist"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {wishlistedProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-luxury-sand flex items-center justify-center text-rose-400">
                <Heart size={28} />
              </div>
              <div>
                <h3 className="font-bold text-luxury-charcoal">Your wishlist is empty</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-[240px]">
                  Browse our catalog and tap the heart icon on designs you love.
                </p>
              </div>
              <button 
                onClick={onClose}
                className="px-6 py-2.5 border border-luxury-gold hover:bg-luxury-gold hover:text-white text-luxury-gold rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                Explore Catalog
              </button>
            </div>
          ) : (
            wishlistedProducts.map((product) => (
              <div 
                key={product.id}
                className="flex gap-4 p-3 rounded-2xl bg-white border border-luxury-gold-light/20 hover:border-luxury-gold-light/50 transition-all group"
              >
                {/* Image */}
                <div className="w-20 h-24 rounded-xl overflow-hidden bg-luxury-sand shrink-0 border border-luxury-gold-light/10">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-xs font-bold text-luxury-charcoal truncate group-hover:text-luxury-gold transition-colors">
                        {product.title}
                      </h4>
                      <button 
                        onClick={() => onRemoveFromWishlist(product.id)}
                        className="text-slate-300 hover:text-rose-500 transition-colors p-0.5 cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase mt-0.5 block">
                      {product.colorName}
                    </span>
                    <span className="text-xs font-extrabold text-luxury-gold mt-1 block">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Add to Bag Button */}
                  <button 
                    onClick={() => {
                      onMoveToCart(product, 'M', product.swatches ? product.colorName : 'Default');
                      onRemoveFromWishlist(product.id);
                    }}
                    className="mt-2 w-full bg-luxury-sand hover:bg-luxury-gold text-luxury-charcoal hover:text-white border border-luxury-gold-light/50 hover:border-luxury-gold py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <ShoppingBag size={12} />
                    Add to Bag
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
