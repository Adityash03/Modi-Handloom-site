import { Link } from 'react-router-dom';
import StarRating from './StarRating.jsx';

const formatINR = (value) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(
    value
  );

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.slug}`} className="group block">
      <div className="relative overflow-hidden bg-surface aspect-[4/5]">
        <img
          src={product.images?.[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.stock === 0 && (
          <span className="absolute top-3 left-3 bg-ink text-kora text-[10px] tracking-widest2 uppercase px-2 py-1">
            Sold Out
          </span>
        )}
      </div>
      <div className="pt-3">
        <p className="eyebrow mb-1">{product.category}</p>
        <h3 className="font-display text-base text-ink leading-snug">{product.name}</h3>
        <div className="flex items-center justify-between mt-1.5">
          <p className="text-sm text-ink/80">
            {formatINR(product.price)}{' '}
            <span className="text-xs text-ink/45">{product.unit}</span>
          </p>
          {product.numReviews > 0 && (
            <StarRating rating={product.rating} count={product.numReviews} size={12} />
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
export { formatINR };
