import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  rating: number;
  review: string;
  avatar: string;
  itemPurchased: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Eleanor Vance',
    role: 'Verified Buyer',
    rating: 5,
    review: 'The quality of the Aether Shell Anorak is unparalleled. The tailoring, stitching, and feel of the technical shell fabric are absolutely premium. Worth every dollar.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    itemPurchased: 'Aether Shell Anorak'
  },
  {
    id: 2,
    name: 'Julian Sterling',
    role: 'Verified Buyer',
    rating: 5,
    review: 'AuraFashion has redefined my everyday look. The cargo pants fit perfectly, and the fabrics feel heavy and luxury. The express shipping took only 2 days.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    itemPurchased: 'Stratus Technical Cargo Pant'
  },
  {
    id: 3,
    name: 'Marcella Cruz',
    role: 'Verified Buyer',
    rating: 5,
    review: 'Extremely content with the customer service and interactive size guide. I ordered an XS and it fits like it was made to measure. The cream tone color is stunning.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    itemPurchased: 'Thermal Core Base Layer'
  }
];

export const TestimonialGrid: React.FC = () => {
  return (
    <section className="py-12 border-y border-luxury-gold-light/20 my-16">
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="text-[10px] font-black text-luxury-gold uppercase tracking-widest block mb-2">
          Customer Voice
        </span>
        <h2 className="text-3xl font-black text-luxury-charcoal tracking-tight font-serif italic">
          Atelier Impressions
        </h2>
        <p className="text-xs text-slate-500 mt-2">
          Read verified experiences from our global community styling AuraFashion.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((t) => (
          <div 
            key={t.id} 
            className="bg-white border border-luxury-gold-light/10 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Rating stars */}
              <div className="flex text-amber-400">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="#f59e0b" className="text-amber-500" />
                ))}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "{t.review}"
              </p>
            </div>

            {/* Profile info */}
            <div className="flex items-center gap-3.5 pt-6 border-t border-luxury-sand mt-6">
              <img 
                src={t.avatar} 
                alt={t.name} 
                className="w-10 h-10 rounded-full object-cover border border-luxury-gold-light/20"
              />
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-luxury-charcoal truncate">{t.name}</h4>
                <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-bold mt-0.5">
                  <ShieldCheck size={12} />
                  <span>{t.role}</span>
                </div>
                <span className="text-[9px] text-slate-400 font-semibold block mt-0.5">
                  Purchased: {t.itemPurchased}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
