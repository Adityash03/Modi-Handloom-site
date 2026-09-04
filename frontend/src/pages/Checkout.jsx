import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios.js';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import SelvedgeDivider from '../components/SelvedgeDivider.jsx';
import { formatINR } from '../components/ProductCard.jsx';

const emptyAddress = {
  fullName: '',
  phone: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'India',
};

const Checkout = () => {
  const { items, itemsPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState({ ...emptyAddress, fullName: user?.name || '' });
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [placing, setPlacing] = useState(false);

  const shipping = itemsPrice > 2000 || itemsPrice === 0 ? 0 : 99;
  const total = itemsPrice + shipping;

  const handleChange = (e) => setAddress((a) => ({ ...a, [e.target.name]: e.target.value }));

  const placeOrder = async (e) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setPlacing(true);
    try {
      const { data } = await api.post('/orders', {
        orderItems: items.map((i) => ({
          product: i.product,
          quantity: i.quantity,
          color: i.color,
        })),
        shippingAddress: address,
        paymentMethod,
      });
      clearCart();
      toast.success('Order placed!');
      navigate(`/order-confirmation/${data._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not place order');
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="container-page py-12">
      <p className="eyebrow mb-2">Checkout</p>
      <h1 className="font-display text-3xl sm:text-4xl mb-5">Shipping & Payment</h1>
      <SelvedgeDivider className="mb-10" />

      <form onSubmit={placeOrder} className="grid lg:grid-cols-[1fr_360px] gap-12">
        <div className="space-y-8">
          <div>
            <h2 className="font-display text-xl mb-4">Shipping Address</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                name="fullName"
                required
                value={address.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="input-field sm:col-span-2"
              />
              <input
                name="phone"
                required
                value={address.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="input-field"
              />
              <input
                name="postalCode"
                required
                value={address.postalCode}
                onChange={handleChange}
                placeholder="Postal Code"
                className="input-field"
              />
              <input
                name="line1"
                required
                value={address.line1}
                onChange={handleChange}
                placeholder="Address Line 1"
                className="input-field sm:col-span-2"
              />
              <input
                name="line2"
                value={address.line2}
                onChange={handleChange}
                placeholder="Address Line 2 (optional)"
                className="input-field sm:col-span-2"
              />
              <input
                name="city"
                required
                value={address.city}
                onChange={handleChange}
                placeholder="City"
                className="input-field"
              />
              <input
                name="state"
                required
                value={address.state}
                onChange={handleChange}
                placeholder="State"
                className="input-field"
              />
            </div>
          </div>

          <div>
            <h2 className="font-display text-xl mb-4">Payment Method</h2>
            <div className="space-y-2">
              {['Cash on Delivery', 'UPI', 'Card'].map((method) => (
                <label
                  key={method}
                  className={`flex items-center gap-3 border px-4 py-3 text-sm cursor-pointer ${
                    paymentMethod === method ? 'border-indigo' : 'border-line'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  {method}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-surface p-7 h-fit">
          <h2 className="font-display text-xl mb-5">Order Summary</h2>
          <ul className="divide-y divide-line mb-5 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <li key={`${item.product}-${item.color}`} className="flex gap-3 py-3 text-sm">
                <img src={item.image} alt={item.name} className="w-12 h-14 object-cover bg-kora shrink-0" />
                <div className="flex-1">
                  <p className="leading-snug">{item.name}</p>
                  <p className="text-xs text-ink/50">Qty {item.quantity}</p>
                </div>
                <p>{formatINR(item.price * item.quantity)}</p>
              </li>
            ))}
          </ul>
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
          <button type="submit" disabled={placing} className="btn-primary w-full disabled:opacity-50">
            {placing ? 'Placing Order…' : 'Place Order'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
