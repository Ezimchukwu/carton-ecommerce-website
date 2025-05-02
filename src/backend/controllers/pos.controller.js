
const POSOrder = require('../models/posOrder.model');
const Product = require('../models/product.model');
const { updateInventoryOnOrder } = require('./inventory.controller');

// @desc    Create a new POS order
// @route   POST /api/pos/orders
// @access  Private/Staff
const createPOSOrder = async (req, res) => {
  try {
    const {
      items,
      customer,
      subtotal,
      tax,
      discount,
      discountCode,
      totalAmount,
      paymentMethod,
      notes
    } = req.body;
    
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }
    
    // Calculate totals to verify amounts
    let calculatedSubtotal = 0;
    
    // Fetch products to verify prices and prepare order items with complete data
    const processedItems = await Promise.all(items.map(async (item) => {
      try {
        const product = await Product.findById(item.product);
        if (!product) {
          throw new Error(`Product not found: ${item.product}`);
        }
        
        // Check if variant is provided and get correct price
        let price = product.price;
        if (item.variant && product.hasVariants && product.variants && product.variants.length > 0) {
          const variant = product.variants.find(v => 
            v.size === item.variant.size && v.packagingType === item.variant.packagingType
          );
          
          if (variant) {
            price = variant.price || product.price;
          }
        }
        
        const itemSubtotal = price * item.quantity;
        calculatedSubtotal += itemSubtotal;
        
        return {
          ...item,
          price,
          subtotal: itemSubtotal
        };
      } catch (error) {
        throw new Error(`Error processing item ${item.product}: ${error.message}`);
      }
    }));
    
    // Verify calculated subtotal matches provided subtotal (with small tolerance for rounding errors)
    if (Math.abs(calculatedSubtotal - subtotal) > 0.01) {
      return res.status(400).json({ 
        message: 'Subtotal verification failed', 
        expected: calculatedSubtotal, 
        received: subtotal 
      });
    }
    
    // Calculate total to verify
    const calculatedTotal = calculatedSubtotal + (tax || 0) - (discount || 0);
    if (Math.abs(calculatedTotal - totalAmount) > 0.01) {
      return res.status(400).json({ 
        message: 'Total amount verification failed',
        expected: calculatedTotal,
        received: totalAmount
      });
    }
    
    // Create the POS order
    const order = new POSOrder({
      items: processedItems,
      customer,
      staff: req.user._id,
      subtotal,
      tax,
      discount,
      discountCode,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === 'cash' ? 'completed' : 'pending',
      notes
    });
    
    // Update inventory
    try {
      await updateInventoryOnOrder(items, order._id, req.user._id);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
    
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all POS orders
// @route   GET /api/pos/orders
// @access  Private/Staff
const getPOSOrders = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20,
      startDate,
      endDate,
      paymentMethod,
      paymentStatus,
      staff 
    } = req.query;
    
    const query = {};
    
    // Filter by date range
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        query.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        // Make endDate inclusive by setting it to end of day
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        query.createdAt.$lte = end;
      }
    }
    
    // Filter by payment method
    if (paymentMethod) {
      query.paymentMethod = paymentMethod;
    }
    
    // Filter by payment status
    if (paymentStatus) {
      query.paymentStatus = paymentStatus;
    }
    
    // Filter by staff member
    if (staff) {
      query.staff = staff;
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const orders = await POSOrder.find(query)
      .populate('staff', 'name email')
      .populate({
        path: 'items.product',
        select: 'name images'
      })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);
      
    const count = await POSOrder.countDocuments(query);
    
    res.json({
      orders,
      page: parseInt(page),
      pages: Math.ceil(count / parseInt(limit)),
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get POS order by ID
// @route   GET /api/pos/orders/:id
// @access  Private/Staff
const getPOSOrderById = async (req, res) => {
  try {
    const order = await POSOrder.findById(req.params.id)
      .populate('staff', 'name email')
      .populate({
        path: 'items.product',
        select: 'name images sku'
      });
      
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update POS order payment status
// @route   PUT /api/pos/orders/:id/payment
// @access  Private/Staff
const updatePOSOrderPayment = async (req, res) => {
  try {
    const { paymentStatus, paymentMethod } = req.body;
    
    const order = await POSOrder.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    if (paymentMethod) {
      order.paymentMethod = paymentMethod;
    }
    
    if (paymentStatus) {
      order.paymentStatus = paymentStatus;
    }
    
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get POS sales stats
// @route   GET /api/pos/stats
// @access  Private/Admin
const getPOSSalesStats = async (req, res) => {
  try {
    const { period } = req.query;
    
    // Default to today if no period specified
    let startDate = new Date();
    let endDate = new Date();
    let groupBy = { $dateToString: { format: '%H', date: '$createdAt' } }; // Group by hour for today
    
    // Set date ranges based on period
    if (period === 'week') {
      startDate.setDate(startDate.getDate() - 7);
      groupBy = { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } };
    } else if (period === 'month') {
      startDate.setMonth(startDate.getMonth() - 1);
      groupBy = { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } };
    } else if (period === 'year') {
      startDate.setFullYear(startDate.getFullYear() - 1);
      groupBy = { $dateToString: { format: '%Y-%m', date: '$createdAt' } };
    } else {
      // For today, set start to beginning of day
      startDate.setHours(0, 0, 0, 0);
    }
    
    // Get total sales
    const totalSales = await POSOrder.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
          paymentStatus: 'completed'
        }
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$totalAmount' },
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Get sales by time period
    const salesByPeriod = await POSOrder.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
          paymentStatus: 'completed'
        }
      },
      {
        $group: {
          _id: groupBy,
          totalAmount: { $sum: '$totalAmount' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
    
    // Get sales by payment method
    const salesByPaymentMethod = await POSOrder.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
          paymentStatus: 'completed'
        }
      },
      {
        $group: {
          _id: '$paymentMethod',
          totalAmount: { $sum: '$totalAmount' },
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Get top selling products
    const topProducts = await POSOrder.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
          paymentStatus: 'completed'
        }
      },
      {
        $unwind: '$items'
      },
      {
        $group: {
          _id: '$items.product',
          name: { $first: '$items.product' },
          totalQuantity: { $sum: '$items.quantity' },
          totalSales: { $sum: '$items.subtotal' }
        }
      },
      {
        $sort: { totalSales: -1 }
      },
      {
        $limit: 10
      }
    ]);
    
    // Populate product names
    const populatedTopProducts = await Product.populate(topProducts, {
      path: '_id',
      select: 'name'
    });
    
    // Format top products for response
    const formattedTopProducts = populatedTopProducts.map(item => ({
      _id: item._id._id,
      name: item._id.name,
      totalQuantity: item.totalQuantity,
      totalSales: item.totalSales
    }));
    
    res.json({
      totalSales: totalSales.length > 0 ? {
        amount: totalSales[0].totalAmount,
        count: totalSales[0].count
      } : { amount: 0, count: 0 },
      salesByPeriod,
      salesByPaymentMethod,
      topProducts: formattedTopProducts
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPOSOrder,
  getPOSOrders,
  getPOSOrderById,
  updatePOSOrderPayment,
  getPOSSalesStats
};
