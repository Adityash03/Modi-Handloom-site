import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import api from '../api/axios.js';
import Loader from '../components/Loader.jsx';
import SelvedgeDivider from '../components/SelvedgeDivider.jsx';
import { formatINR } from '../components/ProductCard.jsx';

const OrderConfirmation = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get(`/orders/${id}`);
        setOrder(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <Loader label="Fetching your order…" />;
  if (!order) {
    return (
      <div className="container-page py-24 text-center">
        <p className="font-display text-2xl">Order not found</p>
      </div>
    );
  }

  return (
    <div className="container-page py-16 max-w-2xl mx-auto text-center">
      <CheckCircle2 size={48} className="text-indigo mx-auto mb-5" strokeWidth={1.5} />
      <p className="eyebrow mb-2">Order Confirmed</p>
      <h1 className="font-display text-3xl sm:text-4xl mb-3">Thank you, {order.shippingAddress.fullName.split(' ')[0]}</h1>
      <p className="text-ink/60 mb-8">
        Your order <span className="text-ink">#{order._id.slice(-8).toUpperCase()}</span> has been placed and will
        be shipped to {order.shippingAddress.city}, {order.shippingAddress.state}.
      </p>
      <SelvedgeDivider align="center" className="mb-10" />

      <ul className="divide-y divide-line text-left mb-8">
        {order.orderItems.map((item) => (
          <li key={item.product} className="flex gap-4 py-4">
            <img src={item.image} alt={item.name} className="w-16 h-20 object-cover bg-surface" />
            <div className="flex-1">
              <p className="font-display">{item.name}</p>
              <p className="text-xs text-ink/50 mt-1">Qty {item.quantity}{item.color ? ` · ${item.color}` : ''}</p>
            </div>
            <p className="text-sm">{formatINR(item.price * item.quantity)}</p>
          </li>
        ))}
      </ul>

      <div className="bg-surface p-6 text-left mb-10">
        <div className="flex justify-between text-sm text-ink/70 mb-2">
          <span>Subtotal</span>
          <span>{formatINR(order.itemsPrice)}</span>
        </div>
        <div className="flex justify-between text-sm text-ink/70 mb-4">
          <span>Shipping</span>
          <span>{order.shippingPrice === 0 ? 'Free' : formatINR(order.shippingPrice)}</span>
        </div>
        <div className="flex justify-between font-display text-lg">
          <span>Total</span>
          <span>{formatINR(order.totalPrice)}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/orders" className="btn-secondary">View My Orders</Link>
        <Link to="/shop" className="btn-primary">Continue Shopping</Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
