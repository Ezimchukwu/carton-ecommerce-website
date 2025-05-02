
const express = require('express');
const router = express.Router();
const { 
  createPOSOrder,
  getPOSOrders,
  getPOSOrderById,
  updatePOSOrderPayment,
  getPOSSalesStats
} = require('../controllers/pos.controller');
const { protect, staff, admin } = require('../middleware/authMiddleware');

// All routes require at least staff permissions
router.use(protect);
router.use(staff);

router.route('/orders')
  .get(getPOSOrders)
  .post(createPOSOrder);

router.route('/stats')
  .get(admin, getPOSSalesStats);

router.route('/orders/:id')
  .get(getPOSOrderById);

router.route('/orders/:id/payment')
  .put(updatePOSOrderPayment);

module.exports = router;
