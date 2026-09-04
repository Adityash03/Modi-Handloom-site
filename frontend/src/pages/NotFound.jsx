import { Link } from 'react-router-dom';
import SelvedgeDivider from '../components/SelvedgeDivider.jsx';

const NotFound = () => (
  <div className="container-page py-28 text-center">
    <p className="eyebrow mb-3">404</p>
    <h1 className="font-display text-4xl mb-4">This thread has come loose</h1>
    <p className="text-ink/60 mb-8">We couldn&rsquo;t find the page you were looking for.</p>
    <SelvedgeDivider align="center" className="mb-8" />
    <Link to="/" className="btn-primary inline-flex">Back to Home</Link>
  </div>
);

export default NotFound;
