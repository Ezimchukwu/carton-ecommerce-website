
const Product = require('../../models/product.model');

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
const getFeaturedProducts = async (req, res) => {
  try {
    const { limit = 8 } = req.query;
    
    const featuredProducts = await Product.find({ active: true })
      .sort({ 'rating.average': -1, createdAt: -1 })
      .limit(parseInt(limit))
      .populate('category', 'name slug');
      
    res.json(featuredProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get bestseller products
// @route   GET /api/products/bestsellers
// @access  Public
const getBestsellerProducts = async (req, res) => {
  try {
    const { limit = 8 } = req.query;
    
    const bestsellerProducts = await Product.find({ 
      active: true,
      isBestseller: true
    })
      .limit(parseInt(limit))
      .populate('category', 'name slug');
      
    res.json(bestsellerProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get new products
// @route   GET /api/products/new
// @access  Public
const getNewProducts = async (req, res) => {
  try {
    const { limit = 8 } = req.query;
    
    const newProducts = await Product.find({ 
      active: true,
      isNew: true 
    })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .populate('category', 'name slug');
      
    res.json(newProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFeaturedProducts,
  getBestsellerProducts,
  getNewProducts
};
