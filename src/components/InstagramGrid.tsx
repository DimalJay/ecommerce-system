import React from 'react';
import { Camera } from 'lucide-react';

const INSTA_POSTS = [
  { id: 1, img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80', tag: '@aurafashion' },
  { id: 2, img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=80', tag: '#AtelierStyle' },
  { id: 3, img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=400&q=80', tag: '@aura_capsule' },
  { id: 4, img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=400&q=80', tag: '#AuraAutumn' },
];

export const InstagramGrid: React.FC = () => {
  return (
    <section className="py-8">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-[10px] font-black text-luxury-gold uppercase tracking-widest block mb-2">
          Social Curation
        </span>
        <h2 className="text-3xl font-black text-luxury-charcoal tracking-tight font-serif italic">
          Shared Journeys
        </h2>
        <p className="text-xs text-slate-500 mt-2">
          Get inspired by our community on Instagram. Use <strong className="text-luxury-charcoal">#AuraAtelier</strong> to be featured.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {INSTA_POSTS.map((post) => (
          <div 
            key={post.id} 
            className="group relative h-64 md:h-72 rounded-3xl overflow-hidden bg-luxury-sand border border-luxury-gold-light/10 shadow-xs"
          >
            <img 
              src={post.img} 
              alt="Social inspiration" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
              <Camera className="text-white animate-pulse" size={24} />
              <span className="text-white text-xs font-bold tracking-wider uppercase">
                {post.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
