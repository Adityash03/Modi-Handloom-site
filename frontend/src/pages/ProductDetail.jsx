import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Minus, Plus, ShoppingBag, MapPin, Layers } from 'lucide-react';
import api from '../api/axios.js';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import Loader from '../components/Loader.jsx';
import StarRating from '../components/StarRating.jsx';
import SelvedgeDivider from '../components/SelvedgeDivider.jsx';
import { formatINR } from '../components/ProductCard.jsx';

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/products/${slug}`);
      setProduct(data);
      setSelectedColor(data.colors?.[0] || null);
      setActiveImage(0);
      setQuantity(1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    window.scrollTo({ top: 0 });
  }, [slug]);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedColor);
    toast.success(`Added ${quantity} × ${product.name} to your cart`);
  };

  const handleBuyNow = () => {
    addItem(product, quantity, selectedColor);
    navigate('/cart');
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to leave a review');
      navigate('/login');
      return;
    }
    setSubmittingReview(true);
    try {
      await api.post(`/products/${slug}/reviews`, { rating: reviewRating, comment: reviewComment });
      toast.success('Thank you for your review!');
      setReviewComment('');
      setReviewRating(5);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) return <Loader label="Unrolling the fabric…" />;
  if (!product) {
    return (
      <div className="container-page py-24 text-center">
        <p className="font-display text-2xl mb-3">Product not found</p>
        <Link to="/shop" className="text-indigo underline">Back to shop</Link>
      </div>
    );
  }

  return (
    <div className="container-page py-12">
      <p className="text-xs text-ink/50 mb-8">
        <Link to="/" className="hover:text-indigo">Home</Link> /{' '}
        <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-indigo">
          {product.category}
        </Link>{' '}
        / <span className="text-ink/80">{product.name}</span>
      </p>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        {/* Gallery */}
        <div>
          <div className="aspect-[4/5] bg-surface overflow-hidden mb-3">
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={img + idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-20 aspect-[4/5] overflow-hidden border ${
                    activeImage === idx ? 'border-indigo' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <p className="eyebrow mb-2">{product.category}</p>
          <h1 className="font-display text-3xl sm:text-4xl leading-tight mb-3">{product.name}</h1>

          {product.numReviews > 0 ? (
            <StarRating rating={product.rating} count={product.numReviews} />
          ) : (
            <p className="text-xs text-ink/50">No reviews yet</p>
          )}

          <p className="text-2xl font-display mt-5">
            {formatINR(product.price)}{' '}
            <span className="text-sm text-ink/45 font-body">{product.unit}</span>
          </p>

          <p className="text-ink/70 leading-relaxed mt-5">{product.description}</p>

          <div className="flex flex-wrap gap-x-8 gap-y-3 mt-6 text-sm text-ink/70">
            {product.fabric && (
              <div className="flex items-center gap-2">
                <Layers size={15} className="text-indigo" />
                {product.fabric}
              </div>
            )}
            {product.origin && (
              <div className="flex items-center gap-2">
                <MapPin size={15} className="text-indigo" />
                {product.origin}
              </div>
            )}
          </div>

          <SelvedgeDivider className="my-7" />

          {product.colors?.length > 0 && (
            <div className="mb-6">
              <p className="eyebrow mb-3">Colour: <span className="text-ink normal-case tracking-normal">{selectedColor}</span></p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-4 py-2 text-xs border ${
                      selectedColor === c ? 'border-indigo text-indigo' : 'border-line text-ink/60'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-8">
            <p className="eyebrow mb-3">Quantity</p>
            <div className="flex items-center border border-line w-fit">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center hover:bg-surface"
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span className="w-10 text-center text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock || 1, q + 1))}
                className="w-10 h-10 flex items-center justify-center hover:bg-surface"
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>
            {product.stock > 0 && product.stock <= 5 && (
              <p className="text-xs text-madder mt-2">Only {product.stock} left</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="btn-secondary flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ShoppingBag size={16} /> Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className="btn-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {product.stock === 0 ? 'Sold Out' : 'Buy Now'}
            </button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-20 max-w-2xl">
        <h2 className="font-display text-2xl mb-6">Reviews ({product.numReviews})</h2>

        {product.reviews?.length > 0 ? (
          <ul className="space-y-6 mb-10">
            {product.reviews.map((r, idx) => (
              <li key={idx} className="border-b border-line pb-5">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium">{r.name}</p>
                  <StarRating rating={r.rating} size={12} />
                </div>
                {r.comment && <p className="text-sm text-ink/70">{r.comment}</p>}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-ink/60 mb-10">Be the first to review this piece.</p>
        )}

        <form onSubmit={submitReview} className="space-y-4">
          <h3 className="font-display text-lg">Write a review</h3>
          <div>
            <p className="eyebrow mb-2">Your Rating</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  type="button"
                  key={n}
                  onClick={() => setReviewRating(n)}
                  className={`text-2xl ${n <= reviewRating ? 'text-turmeric' : 'text-line'}`}
                  aria-label={`${n} stars`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <textarea
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            placeholder="Share your thoughts on the fabric, fit or finish…"
            rows={4}
            className="input-field"
          />
          <button type="submit" disabled={submittingReview} className="btn-secondary">
            {submittingReview ? 'Submitting…' : 'Submit Review'}
          </button>
        </form>
      </section>
    </div>
  );
};

export default ProductDetail;
