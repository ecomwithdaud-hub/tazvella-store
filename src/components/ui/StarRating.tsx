import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: number;
  className?: string;
  showScore?: boolean;
}

export function StarRating({
  rating,
  max = 5,
  size = 14,
  className,
  showScore = false,
}: StarRatingProps) {
  return (
    <div className={cn('inline-flex items-center gap-1', className)}>
      <div className="flex items-center text-caramel-500">
        {Array.from({ length: max }).map((_, i) => {
          const filled = i + 1 <= Math.floor(rating);
          const half = !filled && i < rating;
          return (
            <Star
              key={i}
              size={size}
              className={cn(
                'fill-current transition-colors',
                filled || half ? 'text-caramel-500' : 'text-espresso-200'
              )}
            />
          );
        })}
      </div>
      {showScore && (
        <span className="text-xs font-semibold text-espresso-800 ml-1">
          {rating.toFixed(2)}
        </span>
      )}
    </div>
  );
}
