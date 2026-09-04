import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import SelvedgeDivider from './SelvedgeDivider.jsx';

const categories = [
  { name: 'Cotton Fabric', slug: 'Cotton Fabric' },
  { name: 'Poplin Fabric', slug: 'Poplin Fabric' },
  { name: 'Sarees', slug: 'Sarees' },
  { name: 'Home Linen', slug: 'Home Linen' },
  { name: 'Stoles & Dupattas', slug: 'Stoles & Dupattas' },
  { name: 'Ready to Wear', slug: 'Ready to Wear' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const submitSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?keyword=${encodeURIComponent(query.trim())}`);
      setQuery('');
      setMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-kora">
      <div className="bg-indigo text-kora text-center text-xs tracking-widest2 uppercase py-2 px-4">
        Handwoven with care — free shipping across India on orders over ₹2,000
      </div>

      <div className="container-page flex items-center justify-between py-4">
        <button
          className="md:hidden text-ink"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
         
        <Link to="/" >
          <div class="font-serif font-semibold tracking-[0.01em] text-[23px]">
              MODI <em class="italic text-madder">Handloom</em>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to={`/shop?category=${encodeURIComponent(c.slug)}`}
              className="text-sm text-ink/80 hover:text-indigo transition-colors"
            >
              {c.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <form onSubmit={submitSearch} className="hidden lg:flex items-center border-b border-ink/30 focus-within:border-indigo transition-colors">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search fabric, sarees…"
              className="bg-transparent text-sm py-1 px-1 w-40 focus:outline-none placeholder:text-ink/40"
            />
            <button type="submit" aria-label="Search">
              <Search size={16} className="text-ink/60" />
            </button>
          </form>

          <Link
            to={user ? '/orders' : '/login'}
            className="text-ink/80 hover:text-indigo transition-colors"
            aria-label="Account"
          >
            <User size={20} />
          </Link>

          <Link to="/cart" className="relative text-ink/80 hover:text-indigo transition-colors" aria-label="Cart">
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-madder text-kora text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>

          {user && (
            <button
              onClick={logout}
              className="hidden sm:inline text-xs tracking-widest2 uppercase text-ink/60 hover:text-madder transition-colors"
            >
              Log Out
            </button>
          )}
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden container-page pb-4 flex flex-col gap-3 border-t border-line pt-4">
          <form onSubmit={submitSearch} className="flex items-center border-b border-ink/30 mb-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search fabric, sarees…"
              className="bg-transparent text-sm py-2 px-1 w-full focus:outline-none placeholder:text-ink/40"
            />
            <button type="submit" aria-label="Search">
              <Search size={16} className="text-ink/60" />
            </button>
          </form>
          {categories.map((c) => (
            <Link
              key={c.slug}
              to={`/shop?category=${encodeURIComponent(c.slug)}`}
              onClick={() => setMenuOpen(false)}
              className="text-sm text-ink/80"
            >
              {c.name}
            </Link>
          ))}
          {user && (
            <button onClick={logout} className="text-left text-sm text-madder">
              Log Out
            </button>
          )}
        </nav>
      )}

      <SelvedgeDivider />
    </header>
  );
};

export default Navbar;
