import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';
import type { Product } from '../ProductCard';

interface ProductReviewsProps {
  product: Product;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({ product }) => {
  return (
    <section className="space-y-8 pt-10 border-t border-luxury-gold-light/20">
      <div className="text-center max-w-xl mx-auto">
        <span className="text-[10px] font-black text-luxury-gold uppercase tracking-widest block mb-2">
          Customer Voices
        </span>
        <h2 className="text-3xl font-black text-luxury-charcoal tracking-tight font-sans">
          Reviews &amp; Ratings
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Overview Summary Box */}
        <div className="bg-white border border-luxury-gold-light/20 p-6 rounded-3xl text-center space-y-3">
          <span className="text-5xl font-black text-luxury-charcoal">{product.rating}</span>
          <div className="flex justify-center text-amber-500">
            <Star size={18} fill="#f59e0b" className="text-amber-500" />
            <Star size={18} fill="#f59e0b" className="text-amber-500" />
            <Star size={18} fill="#f59e0b" className="text-amber-500" />
            <Star size={18} fill="#f59e0b" className="text-amber-500" />
            <Star size={18} fill="#f59e0b" className="text-amber-500" />
          </div>
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
            Overall score based on {product.reviewsCount} reviews
          </p>
          <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-800 font-bold bg-emerald-50 px-3 py-1.5 rounded-full mt-2">
            <ShieldCheck size={14} />
            <span>100% Verified Purchases</span>
          </div>
        </div>

        {/* List of Mock Reviews */}
        <div className="md:col-span-2 space-y-6">
          {[
            {
              name: 'Alexander V.',
              date: 'July 14, 2026',
              rating: 5,
              title: 'Impeccable Fit and Finish',
              comment: "The quality of the stitching and the material structure feels exceptionally premium. Truly represents the luxury design principles of the brand. I'm buying a second one in Slate.",
            },
            {
              name: 'Clara S.',
              date: 'June 29, 2026',
              rating: 4.8,
              title: 'Beautiful addition to my wardrobe',
              comment: 'Extremely clean silhouette. Fits exactly to size and works perfectly in layers. The delivery was fast and arrived in premium box packaging.',
            },
          ].map((rev, idx) => (
            <div key={idx} className="bg-white border border-luxury-gold-light/20 p-6 rounded-3xl space-y-3 shadow-xs text-left">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-luxury-charcoal">{rev.name}</h4>
                  <p className="text-[10px] text-slate-400 font-medium">{rev.date}</p>
                </div>
                <div className="flex text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} fill={i < Math.floor(rev.rating) ? '#f59e0b' : 'none'} className="text-amber-500" />
                  ))}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-luxury-charcoal">{rev.title}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{rev.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
