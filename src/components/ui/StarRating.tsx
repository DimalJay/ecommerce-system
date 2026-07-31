import type React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
  showValue?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, size = 12, showValue, className = '', children }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          fill={i < Math.floor(rating) ? '#d97706' : 'none'}
          className={i < Math.floor(rating) ? 'text-warning' : 'text-text-disabled'}
        />
      ))}
    </div>
    {showValue && <span className="text-xs font-semibold text-text-primary">{rating}</span>}
    {children}
  </div>
);
