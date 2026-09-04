import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import api from '../api/axios.js';
import ProductCard from '../components/ProductCard.jsx';
import Loader from '../components/Loader.jsx';
import SelvedgeDivider from '../components/SelvedgeDivider.jsx';

const categories = [
  'Cotton Fabric',
  'Poplin Fabric',
  'Sarees',
  'Home Linen',
  'Stoles & Dupattas',
  'Ready to Wear',
];

const sortOptions = [
  { value: '', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const category = searchParams.get('category') || '';
  const keyword = searchParams.get('keyword') || '';
  const sort = searchParams.get('sort') || '';
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/products', {
          params: { category: category || undefined, keyword: keyword || undefined, sort: sort || undefined, page },
        });
        setProducts(data.products);
        setPages(data.pages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [category, keyword, sort, page]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete('page');
    setSearchParams(next);
    setFiltersOpen(false);
  };

  const clearFilters = () => setSearchParams({});

  return (
    <div className="container-page py-12">
      <div className="mb-8">
        <p className="eyebrow mb-2">Shop</p>
        <h1 className="font-display text-3xl sm:text-4xl">
          {category || (keyword ? `Results for “${keyword}”` : 'All Products')}
        </h1>
        <SelvedgeDivider className="mt-5" />
      </div>

      <div className="flex justify-between items-center mb-6 md:hidden">
        <button
          onClick={() => setFiltersOpen((o) => !o)}
          className="flex items-center gap-2 text-sm border border-ink/30 px-4 py-2"
        >
          <SlidersHorizontal size={14} /> Filters
        </button>
        {(category || keyword) && (
          <button onClick={clearFilters} className="text-xs text-madder flex items-center gap-1">
            Clear <X size={12} />
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-[220px_1fr] gap-10">
        <aside className={`${filtersOpen ? 'block' : 'hidden'} md:block`}>
          <div className="sticky top-32">
            <div className="mb-8">
              <p className="eyebrow mb-4">Category</p>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => updateParam('category', '')}
                    className={`text-sm hover:text-indigo transition-colors ${!category ? 'text-indigo font-medium' : 'text-ink/70'}`}
                  >
                    All Categories
                  </button>
                </li>
                {categories.map((c) => (
                  <li key={c}>
                    <button
                      onClick={() => updateParam('category', c)}
                      className={`text-sm hover:text-indigo transition-colors text-left ${category === c ? 'text-indigo font-medium' : 'text-ink/70'}`}
                    >
                      {c}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow mb-4">Sort By</p>
              <ul className="space-y-2">
                {sortOptions.map((s) => (
                  <li key={s.value}>
                    <button
                      onClick={() => updateParam('sort', s.value)}
                      className={`text-sm hover:text-indigo transition-colors text-left ${sort === s.value ? 'text-indigo font-medium' : 'text-ink/70'}`}
                    >
                      {s.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {(category || keyword) && (
              <button
                onClick={clearFilters}
                className="hidden md:inline-block mt-8 text-xs text-madder hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        </aside>

        <div>
          {loading ? (
            <Loader label="Bringing in the fabric…" />
          ) : products.length === 0 ? (
            <div className="py-24 text-center">
              <p className="font-display text-xl mb-2">No products found</p>
              <p className="text-sm text-ink/60">Try a different category or search term.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
                {products.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>

              {pages > 1 && (
                <div className="flex justify-center gap-2 mt-14">
                  {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => {
                        const next = new URLSearchParams(searchParams);
                        next.set('page', p);
                        setSearchParams(next);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-9 h-9 text-sm border ${
                        page === p ? 'bg-indigo text-kora border-indigo' : 'border-line text-ink/70 hover:border-indigo'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
