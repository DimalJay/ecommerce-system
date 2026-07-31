import React from 'react';
import { ProductCard, type Product } from '../ProductCard';

interface ProductSpotlightSectionProps {
  id?: string;
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
  id,
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
    <section id={id} className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
            {title}
          </h2>
          <p className="text-sm text-text-muted max-w-xl leading-relaxed">
            {description}
          </p>
        </div>
        <button
          onClick={onShopMore}
          className="hidden sm:inline-flex px-5 py-2 bg-text-primary hover:bg-accent text-elevated text-xs font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer shrink-0"
        >
          Shop All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-4 relative rounded-xl overflow-hidden bg-secondary min-h-90 group border border-border">
          <img
            src={spotlightImage}
            alt={spotlightTitle}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-text-primary/50 via-transparent to-transparent flex flex-col justify-end p-5">
            <span className="text-[10px] font-semibold tracking-wider text-elevated uppercase bg-elevated/20 backdrop-blur-sm px-3 py-1 rounded-full self-start mb-2">
              Featured
            </span>
            <h3 className="text-lg font-bold text-elevated leading-tight">
              {spotlightTitle}
            </h3>
          </div>
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
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

      <div className="flex sm:hidden justify-center pt-2">
        <button
          onClick={onShopMore}
          className="px-8 py-3 border-2 border-text-primary hover:bg-text-primary hover:text-elevated text-text-primary text-xs font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer"
        >
          Shop All
        </button>
      </div>
    </section>
  );
};
