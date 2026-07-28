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
    <div className="lg:col-span-7 grid grid-cols-12 gap-4">
      {/* Thumbnails Sidebar */}
      <div className="col-span-2 space-y-3">
        {imageThumbnails.map((thumb, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImage(thumb)}
            className={`w-full aspect-3/4 rounded-xl overflow-hidden bg-luxury-sand border transition-all cursor-pointer ${
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
      <div className="col-span-10 relative bg-white border border-luxury-gold-light/20 rounded-3xl overflow-hidden aspect-3/4 shadow-sm group">
        <img
          src={activeImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
        />
        {discount && (
          <span className="absolute top-4 left-4 bg-luxury-gold text-white text-[10px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-md">
            {discount}
          </span>
        )}
      </div>
    </div>
  );
};
