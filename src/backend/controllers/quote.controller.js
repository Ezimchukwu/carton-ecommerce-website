
const Quote = require('../models/quote.model');

// @desc    Create a new quote request
// @route   POST /api/quotes
// @access  Public
const createQuote = async (req, res) => {
  try {
    const {
      name,
      email,
      company,
      phone,
      productType,
      quantity,
      dimensions,
      material,
      printingRequired,
      customDesign,
      additionalComments
    } = req.body;

    const quote = new Quote({
      name,
      email,
      company,
      phone,
      productType,
      quantity,
      dimensions,
      material,
      printingRequired,
      customDesign,
      additionalComments
    });

    const createdQuote = await quote.save();
    res.status(201).json(createdQuote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all quotes
// @route   GET /api/quotes
// @access  Private/Admin
const getQuotes = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const query = {};
    
    // Filter by status if provided
    if (status) {
      query.status = status;
    }
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const quotes = await Quote.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);
    
    // Get total count for pagination
    const count = await Quote.countDocuments(query);
    
    res.json({
      quotes,
      page: parseInt(page),
      pages: Math.ceil(count / parseInt(limit)),
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get quote by ID
// @route   GET /api/quotes/:id
// @access  Private/Admin
const getQuoteById = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    
    if (quote) {
      res.json(quote);
    } else {
      res.status(404).json({ message: 'Quote not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update quote status
// @route   PUT /api/quotes/:id
// @access  Private/Admin
const updateQuoteStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const quote = await Quote.findById(req.params.id);
    
    if (quote) {
      quote.status = status || quote.status;
      
      const updatedQuote = await quote.save();
      res.json(updatedQuote);
    } else {
      res.status(404).json({ message: 'Quote not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete quote
// @route   DELETE /api/quotes/:id
// @access  Private/Admin
const deleteQuote = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    
    if (quote) {
      await quote.deleteOne();
      res.json({ message: 'Quote removed' });
    } else {
      res.status(404).json({ message: 'Quote not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createQuote,
  getQuotes,
  getQuoteById,
  updateQuoteStatus,
  deleteQuote
};
