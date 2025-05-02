
const express = require('express');
const router = express.Router();
const { 
  getCombinedSalesStats,
  getAllSales
} = require('../controllers/sales.controller');
const { protect, admin } = require('../middleware/authMiddleware');

// All routes require admin permissions
router.use(protect);
router.use(admin);

router.route('/')
  .get(getAllSales);

router.route('/stats')
  .get(getCombinedSalesStats);

module.exports = router;
