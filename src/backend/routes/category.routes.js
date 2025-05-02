
const express = require('express');
const router = express.Router();
const { 
  createCategory,
  getCategories,
  getCategoryById,
  getCategoryBySlug,
  updateCategory,
  deleteCategory
} = require('../controllers/category.controller');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.get('/slug/:slug', getCategoryBySlug);

// Protected/Admin routes
router.post('/', protect, admin, createCategory);
router.put('/:id', protect, admin, updateCategory);
router.delete('/:id', protect, admin, deleteCategory);

module.exports = router;
