import { Star } from 'lucide-react';

const StarRating = ({ rating = 0, count, size = 14 }) => (
  <div className="flex items-center gap-1">
    <div className="flex">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          className={n <= Math.round(rating) ? 'fill-turmeric text-turmeric' : 'text-line'}
        />
      ))}
    </div>
    {typeof count === 'number' && (
      <span className="text-xs text-ink/50">({count})</span>
    )}
  </div>
);

export default StarRating;
