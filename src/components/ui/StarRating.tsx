import type React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
  showValue?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, size = 14, showValue, className = '', children }) => (
  <div className={`flex items-center gap-2 text-sm text-slate-500 ${className}`}>
    <div className="flex items-center text-amber-400">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          fill={i < Math.floor(rating) ? '#f59e0b' : 'none'}
          className={i < Math.floor(rating) ? 'text-amber-500' : 'text-slate-300'}
        />
      ))}
    </div>
    {showValue && <span className="font-extrabold text-luxury-charcoal">{rating}</span>}
    {children}
  </div>
);
