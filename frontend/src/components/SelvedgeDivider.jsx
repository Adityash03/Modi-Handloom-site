const stripes = [
  { color: '#22405E', w: 'w-10' }, // indigo
  { color: '#A6462F', w: 'w-4' }, // madder
  { color: '#C68A2E', w: 'w-6' }, // turmeric
  { color: '#2A241C', w: 'w-3' }, // ink
  { color: '#B98D4E', w: 'w-8' }, // gold
];

const SelvedgeDivider = ({ align = 'left', className = '' }) => {
  return (
    <div
      className={`flex h-[3px] gap-1 ${
        align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start'
      } ${className}`}
      aria-hidden="true"
    >
      {stripes.map((s, idx) => (
        <span key={idx} className={`${s.w} h-full`} style={{ backgroundColor: s.color }} />
      ))}
    </div>
  );
};

export default SelvedgeDivider;
