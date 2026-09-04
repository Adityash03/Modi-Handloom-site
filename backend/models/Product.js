import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    description: { type: String, required: true },
    shortDescription: { type: String },
    category: {
      type: String,
      required: true,
      enum: ['Cotton Fabric', 'Poplin Fabric', 'Sarees', 'Home Linen', 'Stoles & Dupattas', 'Ready to Wear'],
    },
    fabric: { type: String },
    images: [{ type: String, required: true }],
    price: { type: Number, required: true },
    unit: { type: String, default: 'per metre' },
    colors: [{ type: String }],
    stock: { type: Number, required: true, default: 0 },
    isFeatured: { type: Boolean, default: false },
    weaveType: { type: String },
    origin: { type: String },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

productSchema.index({ name: 'text', description: 'text', category: 'text' });

const Product = mongoose.model('Product', productSchema);
export default Product;
