
const express = require('express');
const router = express.Router();
const { 
  createOrder,
  getOrderById,
  getMyOrders,
  getOrders,
  updateOrderStatus,
  updateOrderToPaid,
  getOrderStats
} = require('../controllers/order.controller');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes for placing orders (can be used with or without authentication)
router.post('/', createOrder);

// Protected routes
router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);

// Protected/Admin routes
router.get('/', protect, admin, getOrders);
router.get('/stats', protect, admin, getOrderStats);
router.put('/:id/status', protect, admin, updateOrderStatus);
router.put('/:id/pay', protect, admin, updateOrderToPaid);

module.exports = router;
