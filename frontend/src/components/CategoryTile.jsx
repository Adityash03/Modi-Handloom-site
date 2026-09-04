import { Link } from 'react-router-dom';

const CategoryTile = ({ name, image, to }) => (
  <Link to={to} className="group relative block overflow-hidden aspect-[3/4] bg-surface">
    <img
      src={image}
      alt={name}
      loading="lazy"
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/5 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 p-5">
      <h3 className="font-display text-xl text-kora">{name}</h3>
      <span className="text-xs tracking-widest2 uppercase text-kora/80 mt-1 inline-block border-b border-kora/50 group-hover:border-kora transition-colors">
        Shop Now
      </span>
    </div>
  </Link>
);

export default CategoryTile;
