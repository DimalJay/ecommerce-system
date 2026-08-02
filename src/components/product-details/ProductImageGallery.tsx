import React from 'react';

interface ProductImageGalleryProps {
  activeImage: string;
  setActiveImage: (img: string) => void;
  imageThumbnails: string[];
  title: string;
  discount?: string;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  activeImage,
  setActiveImage,
  imageThumbnails,
  title,
  discount
}) => {
  return (
    <div className="lg:col-span-7 flex flex-col gap-3 lg:grid lg:grid-cols-12 lg:gap-4">
      {/* Mobile: horizontal thumbnail rail below the main image. Tablet/desktop: left sidebar. */}
      <div className="order-2 lg:order-1 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0 lg:col-span-2 shrink-0">
        {imageThumbnails.map((thumb, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImage(thumb)}
            className={`w-16 sm:w-20 shrink-0 lg:w-full aspect-[3/4] rounded-xl overflow-hidden bg-luxury-sand border transition-all cursor-pointer ${
              activeImage === thumb 
                ? 'border-luxury-gold ring-1 ring-luxury-gold/20 shadow-sm' 
                : 'border-luxury-gold-light/20 hover:border-luxury-gold-light/60'
            }`}
          >
            <img src={thumb} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main Image View */}
      <div className="order-1 lg:order-2 lg:col-span-10 relative bg-white border border-luxury-gold-light/20 rounded-3xl overflow-hidden aspect-[3/4] shadow-sm group">
        <img
          src={activeImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
        />
        {discount && (
          <span className="absolute top-4 left-4 bg-luxury-gold text-white text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-md">
            {discount}
          </span>
        )}
      </div>
    </div>
  );
};
