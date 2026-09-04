import express from 'express';
import {
  getProducts,
  getCategories,
  getProductBySlug,
  createProductReview,
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/categories', getCategories);
router.get('/:slug', getProductBySlug);
router.post('/:slug/reviews', protect, createProductReview);

export default router;
