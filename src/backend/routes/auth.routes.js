
const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  updateUserProfile,
  createStaffUser,
  getStaffUsers,
  updateStaffUser
} = require('../controllers/auth.controller');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Admin routes for staff management
router.route('/staff')
  .post(protect, admin, createStaffUser)
  .get(protect, admin, getStaffUsers);

router.route('/staff/:id')
  .put(protect, admin, updateStaffUser);

module.exports = router;
