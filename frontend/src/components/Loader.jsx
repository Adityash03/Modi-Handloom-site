const Loader = ({ label = 'Loading…' }) => (
  <div className="flex flex-col items-center justify-center py-24 gap-3">
    <div className="w-8 h-8 border-2 border-line border-t-indigo rounded-full animate-spin" />
    <p className="eyebrow">{label}</p>
  </div>
);

export default Loader;
