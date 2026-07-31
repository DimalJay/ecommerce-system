import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Product } from '../ProductCard';

interface ProductSpecsAccordionProps {
  product: Product;
}

export const ProductSpecsAccordion: React.FC<ProductSpecsAccordionProps> = ({ product }) => {
  const [openTab, setOpenTab] = useState<'details' | 'care' | 'shipping' | null>('details');

  return (
    <div className="border-t border-luxury-gold-light/20 pt-4 space-y-2 text-left">
      {/* Details & Fit */}
      <div className="border-b border-luxury-gold-light/10 pb-2">
        <button
          type="button"
          onClick={() => setOpenTab(openTab === 'details' ? null : 'details')}
          className="w-full py-3 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-luxury-charcoal"
        >
          <span>Details &amp; Fit</span>
          <ChevronDown size={14} className={`transition-transform duration-300 ${openTab === 'details' ? 'rotate-180' : ''}`} />
        </button>
        {openTab === 'details' && (
          <div className="pb-3 text-xs text-text-secondary leading-relaxed space-y-2 animate-fade-in">
            <p>Thoughtfully designed for comfort and style. {product.title} is crafted to fit seamlessly into your wardrobe.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Premium quality materials and construction</li>
              <li>Fits true to size</li>
              <li>Model is wearing size M</li>
            </ul>
          </div>
        )}
      </div>

      {/* Fabric & Care */}
      <div className="border-b border-luxury-gold-light/10 pb-2">
        <button
          type="button"
          onClick={() => setOpenTab(openTab === 'care' ? null : 'care')}
          className="w-full py-3 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-luxury-charcoal"
        >
          <span>Fabric &amp; Care Guide</span>
          <ChevronDown size={14} className={`transition-transform duration-300 ${openTab === 'care' ? 'rotate-180' : ''}`} />
        </button>
        {openTab === 'care' && (
          <div className="pb-3 text-xs text-text-secondary leading-relaxed space-y-1 animate-fade-in">
            <p><strong>Composition:</strong> 85% Organic Cotton, 15% Stratus Poly Blend.</p>
            <p><strong>Care Instructions:</strong> Dry clean recommended or machine wash cold inside out. Lay flat to dry. Cool iron only.</p>
          </div>
        )}
      </div>

      {/* Shipping & Returns */}
      <div className="pb-2">
        <button
          type="button"
          onClick={() => setOpenTab(openTab === 'shipping' ? null : 'shipping')}
          className="w-full py-3 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-luxury-charcoal"
        >
          <span>Shipping &amp; Returns</span>
          <ChevronDown size={14} className={`transition-transform duration-300 ${openTab === 'shipping' ? 'rotate-180' : ''}`} />
        </button>
        {openTab === 'shipping' && (
          <div className="pb-3 text-xs text-text-secondary leading-relaxed space-y-1 animate-fade-in">
            <p>Complimentary worldwide shipping on orders exceeding Rs. 300.</p>
            <p>Standard delivery window is 2-5 business days. Free returns within 30 days of receiving your package.</p>
          </div>
        )}
      </div>
    </div>
  );
};
