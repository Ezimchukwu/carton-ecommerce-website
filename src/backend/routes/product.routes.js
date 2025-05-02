
const express = require('express');
const router = express.Router();
const { 
  createProduct,
  getProducts,
  getProductById,
  getProductBySlug,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  getBestsellerProducts,
  getNewProducts
} = require('../controllers/product');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/bestsellers', getBestsellerProducts);
router.get('/new', getNewProducts);
router.get('/:id', getProductById);
router.get('/slug/:slug', getProductBySlug);

// Protected/Admin routes
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;
