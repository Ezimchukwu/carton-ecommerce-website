
const express = require('express');
const router = express.Router();
const { 
  createQuote,
  getQuotes,
  getQuoteById,
  updateQuoteStatus,
  deleteQuote
} = require('../controllers/quote.controller');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.post('/', createQuote);

// Protected/Admin routes
router.get('/', protect, admin, getQuotes);
router.get('/:id', protect, admin, getQuoteById);
router.put('/:id', protect, admin, updateQuoteStatus);
router.delete('/:id', protect, admin, deleteQuote);

module.exports = router;
