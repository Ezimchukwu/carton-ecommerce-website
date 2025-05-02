
const Order = require('../models/order.model');

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
const createOrder = async (req, res) => {
  try {
    const { 
      items, 
      shippingAddress, 
      billingAddress,
      paymentMethod, 
      subtotal, 
      tax,
      shippingCost,
      totalPrice
    } = req.body;
    
    // Check if items array is not empty
    if (items && items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }
    
    const order = new Order({
      user: req.user ? req.user._id : null, // If authenticated user exists
      items,
      shippingAddress,
      billingAddress: billingAddress || shippingAddress, // Use shipping address if billing not provided
      paymentMethod,
      subtotal,
      tax,
      shippingCost,
      totalPrice
    });
    
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private/Admin (for any order) or Private (for user's own order)
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate({
        path: 'items.product',
        select: 'name images price'
      });
    
    // Check if order exists
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if user is authorized to view this order
    if (req.user.role !== 'admin' && (!order.user || order.user.toString() !== req.user._id.toString())) {
      return res.status(403).json({ message: 'Not authorized to access this order' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged-in user's orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders (for admin)
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const query = {};
    
    // Filter by status if provided
    if (status) {
      query.status = status;
    }
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const orders = await Order.find(query)
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);
    
    // Get total count for pagination
    const count = await Order.countDocuments(query);
    
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

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    order.status = status;
    
    // Update related fields based on status
    if (status === 'shipped') {
      order.isShipped = true;
      order.shippedAt = Date.now();
    } else if (status === 'delivered') {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }
    
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private/Admin
const updateOrderToPaid = async (req, res) => {
  try {
    const { paymentResult } = req.body;
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = paymentResult || {
      id: 'manual',
      status: 'completed',
      updateTime: Date.now(),
      email: req.user.email
    };
    
    // Update status to processing if it was pending
    if (order.status === 'pending') {
      order.status = 'processing';
    }
    
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getOrderById,
  getMyOrders,
  getOrders,
  updateOrderStatus,
  updateOrderToPaid
};
