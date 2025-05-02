
const express = require('express');
const router = express.Router();
const { 
  getAllInventory,
  getProductInventory,
  addInventory,
  updateInventory,
  getInventoryLogs,
  getLowStockProducts
} = require('../controllers/inventory.controller');
const { protect, admin, staff } = require('../middleware/authMiddleware');

// Admin only routes
router.route('/')
  .get(protect, staff, getAllInventory)
  .post(protect, admin, addInventory);

router.route('/logs')
  .get(protect, staff, getInventoryLogs);

router.route('/low-stock')
  .get(protect, staff, getLowStockProducts);

router.route('/:id')
  .get(protect, staff, getProductInventory)
  .put(protect, admin, updateInventory);

module.exports = router;
