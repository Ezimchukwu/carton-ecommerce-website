
const express = require('express');
const router = express.Router();
const { 
  submitContactForm,
  getContactMessages,
  getContactById,
  updateContactStatus,
  deleteContact
} = require('../controllers/contact.controller');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.post('/', submitContactForm);

// Protected/Admin routes
router.get('/', protect, admin, getContactMessages);
router.get('/:id', protect, admin, getContactById);
router.put('/:id', protect, admin, updateContactStatus);
router.delete('/:id', protect, admin, deleteContact);

module.exports = router;
