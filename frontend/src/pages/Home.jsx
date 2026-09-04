import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Feather, Droplets, HandHeart, Truck } from 'lucide-react';
import api from '../api/axios.js';
import ProductCard from '../components/ProductCard.jsx';
import CategoryTile from '../components/CategoryTile.jsx';
import SelvedgeDivider from '../components/SelvedgeDivider.jsx';
import Loader from '../components/Loader.jsx';
import { media, categoryImages } from '../data/media.js';

const categories = [
  'Cotton Fabric',
  'Poplin Fabric',
  'Sarees',
  'Home Linen',
  'Stoles & Dupattas',
  'Ready to Wear',
];

const values = [
  { icon: Feather, label: 'Handwoven', text: 'Every piece carries the mark of the loom it was made on.' },
  { icon: Droplets, label: 'Natural Dyes', text: 'Indigo, madder and turmeric — colour drawn from the earth.' },
  { icon: HandHeart, label: 'Fair Trade', text: 'Weavers are paid directly, above market rate.' },
  { icon: Truck, label: 'Pan-India Shipping', text: 'Delivered to your door, wherever you are.' },
];

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/products', { params: { featured: true, limit: 8 } });
        setFeatured(data.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[78vh] min-h-[520px] flex items-end overflow-hidden">
        <img
          src={media.heroWeaverAtLoom}
          alt="A weaver working at a traditional handloom in Varanasi, India"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/10" />
        <div className="relative container-page pb-16 text-kora">
          <h1 className="font-display text-4xl sm:text-6xl leading-[1.05] max-w-2xl text-white">
            Woven by hand,
            <br />
            worn for generations.
          </h1>
          <p className="text-kora/80 max-w-md mt-5 text-sm sm:text-base leading-relaxed">
            Cotton, poplin and handloom textiles sourced directly from weaving
            families across Maheshwar, Chanderi, Kota and beyond.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link to="/shop?category=Cotton+Fabric" className="btn-primary">
              Shop Cotton Fabric <ArrowRight size={15} />
            </Link>
            <Link to="/shop" className="btn-secondary !border-kora !text-kora hover:!bg-kora hover:!text-ink">
              Explore All
            </Link>
          </div>
          <SelvedgeDivider className="mt-10" />
        </div>
      </section>

      {/* Category grid */}
      <section className="container-page py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="eyebrow mb-2">Shop by category</p>
            <h2 className="font-display text-3xl">Find your fabric</h2>
          </div>
          <Link to="/shop" className="hidden sm:flex items-center gap-1.5 text-sm text-indigo hover:text-madder transition-colors">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((c) => (
            <CategoryTile
              key={c}
              name={c}
              image={categoryImages[c]}
              to={`/shop?category=${encodeURIComponent(c)}`}
            />
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-surface py-20">
        <div className="container-page">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="eyebrow mb-2">Handpicked</p>
              <h2 className="font-display text-3xl">Featured pieces</h2>
            </div>
          </div>
          {loading ? (
            <Loader label="Gathering featured pieces…" />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
              {featured.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Loom story */}
      <section className="container-page py-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={media.weaverPortrait}
            alt="An Assamese weaver working at a traditional handloom"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="eyebrow mb-3">The loom story</p>
          <h2 className="font-display text-3xl sm:text-4xl leading-tight mb-5">
            Every thread has a weaver&rsquo;s name behind it.
          </h2>
          <p className="text-ink/70 leading-relaxed mb-4">
            Modi Handloom works directly with weaving families across India —
            in Maheshwar, Chanderi, Kota and Kannur — rather than through
            middlemen. That means fairer prices for the artisans who spend
            days, sometimes weeks, on a single length of cloth.
          </p>
          <p className="text-ink/70 leading-relaxed mb-8">
            Small irregularities in weave and dye aren&rsquo;t flaws to us —
            they&rsquo;re proof that a real person, not a machine, made what
            you&rsquo;re holding.
          </p>
          <SelvedgeDivider className="mb-8" />
          <Link to="/shop" className="btn-secondary">
            Shop the collection
          </Link>
        </div>
      </section>

      {/* Full-bleed banner */}
      <section className="relative h-[50vh] min-h-[380px] flex items-center overflow-hidden">
        <img
          src={media.maheshwarLooms}
          alt="Rows of traditional looms at a handloom weavers' society in Maheshwar"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-indigo/60" />
        <div className="relative container-page text-kora text-center mx-auto">
          <p className="eyebrow text-kora/80 mb-3">Maheshwar, Madhya Pradesh</p>
          <h2 className="font-display text-3xl sm:text-4xl max-w-xl mx-auto leading-tight">
            Handwoven on looms that have run for three generations.
          </h2>
          <Link
            to="/shop?category=Sarees"
            className="btn-madder mt-8 inline-flex"
          >
            Shop Handloom Sarees <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* Value props */}
      <section className="container-page py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {values.map(({ icon: Icon, label, text }) => (
            <div key={label} className="text-center sm:text-left">
              <Icon size={22} className="text-madder mx-auto sm:mx-0 mb-3" strokeWidth={1.5} />
              <h3 className="font-display text-lg mb-1.5">{label}</h3>
              <p className="text-sm text-ink/60 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-ink text-kora py-20">
        <div className="container-page text-center max-w-xl mx-auto">
          <p className="eyebrow text-kora/60 mb-3">Stay woven in</p>
          <h2 className="font-display text-3xl mb-4">Get first access to new weaves</h2>
          <p className="text-kora/60 text-sm mb-8">
            One email a month, new arrivals and notes from the loom. No spam.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="flex-1 bg-transparent border border-kora/30 px-4 py-3 text-sm placeholder:text-kora/40 focus:outline-none focus:border-turmeric"
            />
            <button type="submit" className="btn-madder">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
