import React from 'react';
import { ProductCard, type Product } from '../ProductCard';

interface ProductSpotlightSectionProps {
  title: string;
  description: string;
  spotlightImage: string;
  spotlightTitle: string;
  products: Product[];
  wishlist: number[];
  onToggleWishlist: (id: number) => void;
  onAddToCart: (product: Product, size?: string, color?: string) => void;
  onOpenQuickView: (product: Product) => void;
  onShopMore: () => void;
}

export const ProductSpotlightSection: React.FC<ProductSpotlightSectionProps> = ({
  title,
  description,
  spotlightImage,
  spotlightTitle,
  products,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onOpenQuickView,
  onShopMore
}) => {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold uppercase tracking-wider text-slate-950">
          {title}
        </h2>
        <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
          {description}
        </p>
        <button 
          onClick={onShopMore}
          className="bg-[#1e293b] hover:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded shadow-xs transition-colors cursor-pointer"
        >
          Shop Now
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Spotlight Large Banner */}
        <div className="lg:col-span-4 relative rounded-2xl overflow-hidden bg-slate-100 min-h-[360px] group border border-slate-200/50">
          <img 
            src={spotlightImage} 
            alt={spotlightTitle} 
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-102"
          />
          <div className="absolute inset-0 bg-slate-950/20 flex flex-col justify-end p-6">
            <span className="text-[10px] font-bold tracking-widest text-white uppercase bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full self-start mb-2">
              Featured Looks
            </span>
            <h3 className="text-xl font-extrabold text-white leading-tight uppercase font-sans">
              {spotlightTitle}
            </h3>
          </div>
        </div>

        {/* Right 3 items */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlist.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
              onOpenQuickView={onOpenQuickView}
            />
          ))}
        </div>
      </div>
      
      <div className="flex justify-center pt-4">
        <button 
          onClick={onShopMore}
          className="px-8 py-3 border-2 border-[#1e293b] hover:bg-[#1e293b] text-[#1e293b] hover:text-white text-[10px] font-bold uppercase tracking-widest rounded-md transition-all cursor-pointer"
        >
          Shop More
        </button>
      </div>
    </section>
  );
};
