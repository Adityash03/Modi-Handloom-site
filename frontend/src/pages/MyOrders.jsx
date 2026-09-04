import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronDown } from 'lucide-react';
import api from '../api/axios.js';
import Loader from '../components/Loader.jsx';
import SelvedgeDivider from '../components/SelvedgeDivider.jsx';
import { formatINR } from '../components/ProductCard.jsx';

const statusStyles = {
  Processing: 'bg-turmeric/20 text-turmeric-light text-turmeric',
  Shipped: 'bg-indigo/10 text-indigo',
  Delivered: 'bg-green-100 text-green-700',
  Cancelled: 'bg-madder/10 text-madder',
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/orders/mine');
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Loader label="Retrieving your orders…" />;

  return (
    <div className="container-page py-12">
      <p className="eyebrow mb-2">Account</p>
      <h1 className="font-display text-3xl sm:text-4xl mb-5">My Orders</h1>
      <SelvedgeDivider className="mb-10" />

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <Package size={36} className="mx-auto mb-4 text-ink/30" strokeWidth={1.3} />
          <p className="font-display text-xl mb-2">No orders yet</p>
          <p className="text-sm text-ink/60 mb-6">When you place an order, it will show up here.</p>
          <Link to="/shop" className="btn-primary inline-flex">Start Shopping</Link>
        </div>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order._id} className="border border-line">
              <button
                onClick={() => setExpanded(expanded === order._id ? null : order._id)}
                className="w-full flex flex-wrap items-center justify-between gap-3 p-5 text-left"
              >
                <div>
                  <p className="text-xs text-ink/50">Order #{order._id.slice(-8).toUpperCase()}</p>
                  <p className="text-sm mt-1">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-xs px-3 py-1 tracking-wide ${statusStyles[order.status] || 'bg-surface'}`}>
                    {order.status}
                  </span>
                  <p className="font-display">{formatINR(order.totalPrice)}</p>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${expanded === order._id ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>

              {expanded === order._id && (
                <div className="border-t border-line p-5">
                  <ul className="divide-y divide-line mb-5">
                    {order.orderItems.map((item) => (
                      <li key={item.product} className="flex gap-4 py-3">
                        <img src={item.image} alt={item.name} className="w-14 h-18 object-cover bg-surface shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm">{item.name}</p>
                          <p className="text-xs text-ink/50 mt-1">
                            Qty {item.quantity}{item.color ? ` · ${item.color}` : ''}
                          </p>
                        </div>
                        <p className="text-sm">{formatINR(item.price * item.quantity)}</p>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-ink/60">
                    Shipping to: {order.shippingAddress.line1}, {order.shippingAddress.city},{' '}
                    {order.shippingAddress.state} {order.shippingAddress.postalCode}
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;
