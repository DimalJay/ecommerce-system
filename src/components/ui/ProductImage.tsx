import React, { useState } from 'react';
import placeholderImage from '../../assets/image-placeholder.svg';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * <img> wrapper that falls back to a bundled placeholder when the
 * remote product image fails to load (blocked host, offline CDN, etc.).
 * Callers should remount via key when src changes.
 */
export const ProductImage: React.FC<ProductImageProps> = ({ src, alt, className }) => {
  const [failed, setFailed] = useState(false);

  return (
    <img
      src={failed ? placeholderImage : src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
};
