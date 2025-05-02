
const Product = require('../models/product.model');

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      price,
      originalPrice,
      stock,
      images,
      features,
      specifications,
      isNew,
      isBestseller,
      customizable,
      minQuantity,
      maxQuantity,
      estimatedDelivery
    } = req.body;

    // Create slug from name
    const slug = name.toLowerCase().replace(/\s+/g, '-');

    // Check if slug already exists
    const existingProduct = await Product.findOne({ slug });
    if (existingProduct) {
      return res.status(400).json({ message: 'A product with this name already exists' });
    }

    const product = new Product({
      name,
      slug,
      description,
      category,
      price,
      originalPrice,
      stock,
      images,
      features,
      specifications,
      isNew,
      isBestseller,
      customizable,
      minQuantity,
      maxQuantity,
      estimatedDelivery
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const { category, limit = 10, page = 1, sort, search } = req.query;
    
    const query = { active: true };
    
    // Filter by category if provided
    if (category) {
      query.category = category;
    }
    
    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Sorting options
    let sortOption = {};
    if (sort === 'price-asc') {
      sortOption = { price: 1 };
    } else if (sort === 'price-desc') {
      sortOption = { price: -1 };
    } else if (sort === 'newest') {
      sortOption = { createdAt: -1 };
    } else if (sort === 'rating') {
      sortOption = { 'rating.average': -1 };
    } else {
      // Default sort
      sortOption = { createdAt: -1 };
    }
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const products = await Product.find(query)
      .sort(sortOption)
      .limit(parseInt(limit))
      .skip(skip)
      .populate('category', 'name slug');
    
    // Get total count for pagination
    const count = await Product.countDocuments(query);
    
    res.json({
      products,
      page: parseInt(page),
      pages: Math.ceil(count / parseInt(limit)),
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name slug');
    
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get product by slug
// @route   GET /api/products/slug/:slug
// @access  Public
const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate('category', 'name slug');
    
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      price,
      originalPrice,
      stock,
      images,
      features,
      specifications,
      isNew,
      isBestseller,
      customizable,
      minQuantity,
      maxQuantity,
      estimatedDelivery,
      active
    } = req.body;
    
    const product = await Product.findById(req.params.id);
    
    if (product) {
      // Update fields
      product.name = name || product.name;
      product.description = description || product.description;
      product.category = category || product.category;
      product.price = price !== undefined ? price : product.price;
      product.originalPrice = originalPrice !== undefined ? originalPrice : product.originalPrice;
      product.stock = stock !== undefined ? stock : product.stock;
      
      // Only update arrays if provided
      if (images) product.images = images;
      if (features) product.features = features;
      if (specifications) product.specifications = specifications;
      
      // Update boolean fields only if explicitly provided
      if (isNew !== undefined) product.isNew = isNew;
      if (isBestseller !== undefined) product.isBestseller = isBestseller;
      if (customizable !== undefined) product.customizable = customizable;
      if (active !== undefined) product.active = active;
      
      // Update other fields if provided
      if (minQuantity) product.minQuantity = minQuantity;
      if (maxQuantity) product.maxQuantity = maxQuantity;
      if (estimatedDelivery) product.estimatedDelivery = estimatedDelivery;
      
      // Only update slug if name changes
      if (name && name !== product.name) {
        product.slug = name.toLowerCase().replace(/\s+/g, '-');
      }
      
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
  createProduct,
  getProducts,
  getProductById,
  getProductBySlug,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  getBestsellerProducts,
  getNewProducts
};
