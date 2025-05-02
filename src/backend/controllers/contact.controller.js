
const Contact = require('../models/contact.model');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const contact = new Contact({
      name,
      email,
      subject,
      message
    });

    const createdContact = await contact.save();
    res.status(201).json({
      success: true,
      message: 'Your message has been received. We will get back to you shortly.',
      id: createdContact._id
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private/Admin
const getContactMessages = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const query = {};
    
    // Filter by status if provided
    if (status) {
      query.status = status;
    }
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const messages = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);
    
    // Get total count for pagination
    const count = await Contact.countDocuments(query);
    
    res.json({
      messages,
      page: parseInt(page),
      pages: Math.ceil(count / parseInt(limit)),
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get contact message by ID
// @route   GET /api/contact/:id
// @access  Private/Admin
const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (contact) {
      // If status is 'new', update to 'read'
      if (contact.status === 'new') {
        contact.status = 'read';
        await contact.save();
      }
      
      res.json(contact);
    } else {
      res.status(404).json({ message: 'Contact message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update contact status
// @route   PUT /api/contact/:id
// @access  Private/Admin
const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const contact = await Contact.findById(req.params.id);
    
    if (contact) {
      contact.status = status || contact.status;
      
      const updatedContact = await contact.save();
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: 'Contact message not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Private/Admin
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (contact) {
      await contact.deleteOne();
      res.json({ message: 'Contact message removed' });
    } else {
      res.status(404).json({ message: 'Contact message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  submitContactForm,
  getContactMessages,
  getContactById,
  updateContactStatus,
  deleteContact
};
