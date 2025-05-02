
const Inventory = require('../models/inventory.model');
const InventoryLog = require('../models/inventoryLog.model');
const Product = require('../models/product.model');

// @desc    Get inventory for all products
// @route   GET /api/inventory
// @access  Private/Admin
const getAllInventory = async (req, res) => {
  try {
    const { low_stock, category, search } = req.query;
    
    const query = {};
    
    // Filter by low stock
    if (low_stock === 'true') {
      query.isLowStock = true;
    }
    
    const inventory = await Inventory.find(query)
      .populate({
        path: 'product',
        select: 'name slug category price images sku barcode',
        populate: {
          path: 'category',
          select: 'name'
        }
      })
      .sort({ isLowStock: -1, 'product.name': 1 });
    
    // Filter by category or search term if provided
    let filteredInventory = inventory;
    
    if (category) {
      filteredInventory = filteredInventory.filter(
        item => item.product.category && item.product.category._id.toString() === category
      );
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredInventory = filteredInventory.filter(
        item => 
          item.product.name.toLowerCase().includes(searchLower) ||
          (item.product.sku && item.product.sku.toLowerCase().includes(searchLower)) ||
          (item.product.barcode && item.product.barcode.toLowerCase().includes(searchLower))
      );
    }
    
    res.json(filteredInventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get inventory for a specific product
// @route   GET /api/inventory/:productId
// @access  Private/Admin
const getProductInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find({ product: req.params.productId })
      .populate({
        path: 'product',
        select: 'name slug price images variants sku barcode'
      });
      
    if (inventory.length === 0) {
      return res.status(404).json({ message: 'Inventory not found for this product' });
    }
    
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add inventory for a product
// @route   POST /api/inventory
// @access  Private/Admin
const addInventory = async (req, res) => {
  try {
    const { productId, quantity, variant, lowStockThreshold, reason } = req.body;
    
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Find if inventory already exists for this product/variant
    const query = { product: productId };
    if (variant) {
      if (variant.size) query['variant.size'] = variant.size;
      if (variant.packagingType) query['variant.packagingType'] = variant.packagingType;
    }
    
    let inventory = await Inventory.findOne(query);
    let previousQuantity = 0;
    
    if (inventory) {
      previousQuantity = inventory.quantity;
      inventory.quantity += parseInt(quantity);
      if (lowStockThreshold) {
        inventory.lowStockThreshold = lowStockThreshold;
      }
      await inventory.save();
    } else {
      // Create new inventory record
      inventory = await Inventory.create({
        product: productId,
        quantity,
        variant,
        lowStockThreshold: lowStockThreshold || 10
      });
    }
    
    // Update product stock for quick access (main product stock field)
    if (!variant || Object.keys(variant).length === 0) {
      product.stock = inventory.quantity;
      await product.save();
    } else {
      // Update variant stock
      if (product.hasVariants && product.variants && product.variants.length > 0) {
        const variantIndex = product.variants.findIndex(v => 
          v.size === variant.size && v.packagingType === variant.packagingType
        );
        
        if (variantIndex >= 0) {
          product.variants[variantIndex].stock = inventory.quantity;
          await product.save();
        }
      }
    }
    
    // Create inventory log
    await InventoryLog.create({
      product: productId,
      type: 'added',
      quantity: parseInt(quantity),
      previousQuantity,
      newQuantity: inventory.quantity,
      variant,
      reason,
      performedBy: req.user._id
    });
    
    res.status(201).json(inventory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update inventory quantity
// @route   PUT /api/inventory/:id
// @access  Private/Admin
const updateInventory = async (req, res) => {
  try {
    const { quantity, lowStockThreshold, reason } = req.body;
    
    const inventory = await Inventory.findById(req.params.id);
    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }
    
    const previousQuantity = inventory.quantity;
    const quantityDiff = parseInt(quantity) - previousQuantity;
    
    // Update inventory
    inventory.quantity = parseInt(quantity);
    if (lowStockThreshold) {
      inventory.lowStockThreshold = lowStockThreshold;
    }
    
    await inventory.save();
    
    // Update product stock
    const product = await Product.findById(inventory.product);
    if (product) {
      if (!inventory.variant || Object.keys(inventory.variant).length === 0) {
        product.stock = inventory.quantity;
        await product.save();
      } else {
        // Update variant stock
        if (product.hasVariants && product.variants && product.variants.length > 0) {
          const variantIndex = product.variants.findIndex(v => 
            v.size === inventory.variant.size && v.packagingType === inventory.variant.packagingType
          );
          
          if (variantIndex >= 0) {
            product.variants[variantIndex].stock = inventory.quantity;
            await product.save();
          }
        }
      }
    }
    
    // Create inventory log
    await InventoryLog.create({
      product: inventory.product,
      type: 'adjusted',
      quantity: quantityDiff,
      previousQuantity,
      newQuantity: inventory.quantity,
      variant: inventory.variant,
      reason,
      performedBy: req.user._id
    });
    
    res.json(inventory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get inventory logs
// @route   GET /api/inventory/logs
// @access  Private/Admin
const getInventoryLogs = async (req, res) => {
  try {
    const { productId, type, startDate, endDate, page = 1, limit = 20 } = req.query;
    
    const query = {};
    
    if (productId) {
      query.product = productId;
    }
    
    if (type) {
      query.type = type;
    }
    
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        query.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        query.createdAt.$lte = new Date(endDate);
      }
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const logs = await InventoryLog.find(query)
      .populate({
        path: 'product',
        select: 'name slug images'
      })
      .populate({
        path: 'performedBy',
        select: 'name email'
      })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);
      
    const count = await InventoryLog.countDocuments(query);
    
    res.json({
      logs,
      page: parseInt(page),
      pages: Math.ceil(count / parseInt(limit)),
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get low stock products
// @route   GET /api/inventory/low-stock
// @access  Private/Admin
const getLowStockProducts = async (req, res) => {
  try {
    const lowStock = await Inventory.find({ isLowStock: true })
      .populate({
        path: 'product',
        select: 'name slug category price images',
        populate: {
          path: 'category',
          select: 'name'
        }
      })
      .sort({ quantity: 1 });
      
    res.json(lowStock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Check and update inventory when an order is placed
// @route   Not directly exposed as API
// @access  Internal function
const updateInventoryOnOrder = async (items, orderId, userId) => {
  try {
    const updates = [];
    
    for (const item of items) {
      const { product: productId, quantity, variant } = item;
      
      // Create query to find the inventory item
      const query = { product: productId };
      if (variant) {
        if (variant.size) query['variant.size'] = variant.size;
        if (variant.packagingType) query['variant.packagingType'] = variant.packagingType;
      }
      
      const inventory = await Inventory.findOne(query);
      
      if (!inventory) {
        throw new Error(`No inventory found for product ID: ${productId}`);
      }
      
      if (inventory.quantity < quantity) {
        throw new Error(`Insufficient inventory for product ID: ${productId}`);
      }
      
      const previousQuantity = inventory.quantity;
      inventory.quantity -= quantity;
      await inventory.save();
      
      // Update product stock
      const product = await Product.findById(productId);
      if (product) {
        if (!variant || Object.keys(variant).length === 0) {
          product.stock = inventory.quantity;
          await product.save();
        } else if (product.hasVariants && product.variants && product.variants.length > 0) {
          const variantIndex = product.variants.findIndex(v => 
            v.size === variant.size && v.packagingType === variant.packagingType
          );
          
          if (variantIndex >= 0) {
            product.variants[variantIndex].stock = inventory.quantity;
            await product.save();
          }
        }
      }
      
      // Create inventory log
      await InventoryLog.create({
        product: productId,
        type: 'sold',
        quantity: -quantity,
        previousQuantity,
        newQuantity: inventory.quantity,
        variant,
        reference: orderId,
        performedBy: userId
      });
      
      updates.push({
        product: productId,
        previousQuantity,
        newQuantity: inventory.quantity
      });
    }
    
    return updates;
  } catch (error) {
    throw new Error(`Failed to update inventory: ${error.message}`);
  }
};

module.exports = {
  getAllInventory,
  getProductInventory,
  addInventory,
  updateInventory,
  getInventoryLogs,
  getLowStockProducts,
  updateInventoryOnOrder
};
