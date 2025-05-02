
const Product = require('../../models/product.model');

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

module.exports = {
  createProduct,
  getProductById,
  getProductBySlug,
  updateProduct,
  deleteProduct
};
