import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail } from 'lucide-react';
import SelvedgeDivider from './SelvedgeDivider.jsx';

const Footer = () => {
  return (
    <footer className="bg-indigo text-kora mt-24">
      <div className="container-page py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2">
          <h3 className="font-display text-2xl mb-3">Modi Handloom</h3>
          <p className="text-sm text-kora/70 max-w-xs leading-relaxed">
            Handwoven cotton, poplin and textiles sourced directly from weaving
            communities across India — Maheshwar, Chanderi, Kota and beyond.
          </p>
          <div className="flex gap-4 mt-5">
            <a href="#" aria-label="Instagram" className="hover:text-turmeric transition-colors">
              <Instagram size={18} />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-turmeric transition-colors">
              <Facebook size={18} />
            </a>
            <a href="mailto:hello@modihandloom.test" aria-label="Email" className="hover:text-turmeric transition-colors">
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div>
          <p className="eyebrow text-kora/60 mb-4">Shop</p>
          <ul className="space-y-2 text-sm text-kora/80">
            <li><Link to="/shop?category=Cotton+Fabric" className="hover:text-turmeric">Cotton Fabric</Link></li>
            <li><Link to="/shop?category=Poplin+Fabric" className="hover:text-turmeric">Poplin Fabric</Link></li>
            <li><Link to="/shop?category=Sarees" className="hover:text-turmeric">Sarees</Link></li>
            <li><Link to="/shop?category=Home+Linen" className="hover:text-turmeric">Home Linen</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-kora/60 mb-4">Account</p>
          <ul className="space-y-2 text-sm text-kora/80">
            <li><Link to="/login" className="hover:text-turmeric">Sign In</Link></li>
            <li><Link to="/signup" className="hover:text-turmeric">Create Account</Link></li>
            <li><Link to="/orders" className="hover:text-turmeric">My Orders</Link></li>
            <li><Link to="/cart" className="hover:text-turmeric">Cart</Link></li>
          </ul>
        </div>
      </div>

      <SelvedgeDivider className="opacity-80" />

      <div className="container-page py-5 text-xs text-kora/50 flex flex-col sm:flex-row justify-between gap-2">
        <p>© {new Date().getFullYear()} Modi Handloom. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
