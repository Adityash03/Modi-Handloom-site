import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import SelvedgeDivider from '../components/SelvedgeDivider.jsx';
import { formatINR } from '../components/ProductCard.jsx';

const Cart = () => {
  const { items, updateQuantity, removeItem, itemsPrice } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const shipping = itemsPrice > 2000 || itemsPrice === 0 ? 0 : 99;
  const total = itemsPrice + shipping;

  const goToCheckout = () => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="container-page py-28 text-center">
        <p className="font-display text-3xl mb-3">Your cart is empty</p>
        <p className="text-ink/60 mb-8">Looks like you haven&rsquo;t added any fabric yet.</p>
        <Link to="/shop" className="btn-primary inline-flex">
          Start Shopping <ArrowRight size={15} />
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-12">
      <p className="eyebrow mb-2">Your Bag</p>
      <h1 className="font-display text-3xl sm:text-4xl mb-5">Shopping Cart</h1>
      <SelvedgeDivider className="mb-10" />

      <div className="grid lg:grid-cols-[1fr_360px] gap-12">
        <ul className="divide-y divide-line">
          {items.map((item) => (
            <li key={`${item.product}-${item.color}`} className="flex gap-4 py-6">
              <Link to={`/product/${item.slug}`} className="w-24 sm:w-28 aspect-[4/5] bg-surface overflow-hidden shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between gap-3">
                  <div>
                    <Link to={`/product/${item.slug}`} className="font-display text-base sm:text-lg hover:text-indigo">
                      {item.name}
                    </Link>
                    {item.color && <p className="text-xs text-ink/50 mt-1">Colour: {item.color}</p>}
                    <p className="text-sm text-ink/70 mt-1">
                      {formatINR(item.price)} <span className="text-xs text-ink/40">{item.unit}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.product, item.color)}
                    className="text-ink/40 hover:text-madder transition-colors h-fit"
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex items-center border border-line w-fit">
                    <button
                      onClick={() => updateQuantity(item.product, item.color, Math.max(1, item.quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center hover:bg-surface"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product, item.color, Math.min(item.stock || 99, item.quantity + 1))
                      }
                      className="w-8 h-8 flex items-center justify-center hover:bg-surface"
                      aria-label="Increase quantity"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <p className="text-sm font-medium">{formatINR(item.price * item.quantity)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="bg-surface p-7 h-fit">
          <h2 className="font-display text-xl mb-5">Order Summary</h2>
          <div className="space-y-3 text-sm text-ink/70">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatINR(itemsPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatINR(shipping)}</span>
            </div>
          </div>
          <SelvedgeDivider className="my-5" />
          <div className="flex justify-between font-display text-lg mb-6">
            <span>Total</span>
            <span>{formatINR(total)}</span>
          </div>
          <button onClick={goToCheckout} className="btn-primary w-full">
            Checkout <ArrowRight size={15} />
          </button>
          <Link to="/shop" className="block text-center text-xs text-ink/50 hover:text-indigo mt-4">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
