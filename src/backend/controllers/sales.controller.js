
const Order = require('../models/order.model');
const POSOrder = require('../models/posOrder.model');
const Product = require('../models/product.model');

// @desc    Get combined sales statistics from online and POS
// @route   GET /api/sales/stats
// @access  Private/Admin
const getCombinedSalesStats = async (req, res) => {
  try {
    const { period, startDate: startDateParam, endDate: endDateParam } = req.query;
    
    // Set date ranges based on period or custom range
    let startDate, endDate;
    let groupBy;
    
    if (startDateParam && endDateParam) {
      startDate = new Date(startDateParam);
      endDate = new Date(endDateParam);
      // Set end date to end of day
      endDate.setHours(23, 59, 59, 999);
      
      // Determine grouping based on date range
      const daysDiff = Math.abs(endDate - startDate) / (1000 * 60 * 60 * 24);
      if (daysDiff <= 2) {
        groupBy = { $dateToString: { format: '%H', date: '$createdAt' } }; // Hours
      } else if (daysDiff <= 60) {
        groupBy = { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }; // Days
      } else {
        groupBy = { $dateToString: { format: '%Y-%m', date: '$createdAt' } }; // Months
      }
    } else {
      // Default periods
      startDate = new Date();
      endDate = new Date();
      
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
        groupBy = { $dateToString: { format: '%H', date: '$createdAt' } };
      }
    }
    
    // Get web orders stats
    const webOrdersStats = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
          isPaid: true
        }
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$totalPrice' },
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Get POS orders stats
    const posOrdersStats = await POSOrder.aggregate([
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
    
    // Get web orders by period
    const webOrdersByPeriod = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
          isPaid: true
        }
      },
      {
        $group: {
          _id: groupBy,
          totalAmount: { $sum: '$totalPrice' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
    
    // Get POS orders by period
    const posOrdersByPeriod = await POSOrder.aggregate([
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
    
    // Get top selling products across both channels
    // First from web orders
    const webTopProducts = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
          isPaid: true
        }
      },
      {
        $unwind: '$items'
      },
      {
        $group: {
          _id: '$items.product',
          totalQuantity: { $sum: '$items.quantity' },
          totalSales: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
          source: { $literal: 'web' }
        }
      }
    ]);
    
    // Next from POS orders
    const posTopProducts = await POSOrder.aggregate([
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
          totalQuantity: { $sum: '$items.quantity' },
          totalSales: { $sum: '$items.subtotal' },
          source: { $literal: 'pos' }
        }
      }
    ]);
    
    // Combine top products
    const combinedProducts = {};
    
    // Process web products
    webTopProducts.forEach(product => {
      const productId = product._id.toString();
      if (!combinedProducts[productId]) {
        combinedProducts[productId] = {
          _id: product._id,
          totalQuantity: 0,
          totalSales: 0,
          webQuantity: 0,
          webSales: 0,
          posQuantity: 0,
          posSales: 0
        };
      }
      combinedProducts[productId].totalQuantity += product.totalQuantity;
      combinedProducts[productId].totalSales += product.totalSales;
      combinedProducts[productId].webQuantity += product.totalQuantity;
      combinedProducts[productId].webSales += product.totalSales;
    });
    
    // Process POS products
    posTopProducts.forEach(product => {
      const productId = product._id.toString();
      if (!combinedProducts[productId]) {
        combinedProducts[productId] = {
          _id: product._id,
          totalQuantity: 0,
          totalSales: 0,
          webQuantity: 0,
          webSales: 0,
          posQuantity: 0,
          posSales: 0
        };
      }
      combinedProducts[productId].totalQuantity += product.totalQuantity;
      combinedProducts[productId].totalSales += product.totalSales;
      combinedProducts[productId].posQuantity += product.totalQuantity;
      combinedProducts[productId].posSales += product.totalSales;
    });
    
    // Convert to array and sort
    const topProductsArray = Object.values(combinedProducts)
      .sort((a, b) => b.totalSales - a.totalSales)
      .slice(0, 10);
    
    // Populate product names
    const populatedTopProducts = await Product.populate(topProductsArray, {
      path: '_id',
      select: 'name images'
    });
    
    // Format top products for response
    const formattedTopProducts = populatedTopProducts.map(item => ({
      _id: item._id._id,
      name: item._id.name,
      image: item._id.images && item._id.images.length > 0 ? item._id.images[0] : null,
      totalQuantity: item.totalQuantity,
      totalSales: item.totalSales,
      webQuantity: item.webQuantity,
      webSales: item.webSales,
      posQuantity: item.posQuantity,
      posSales: item.posSales
    }));
    
    // Calculate combined totals
    const webTotal = webOrdersStats.length > 0 ? {
      amount: webOrdersStats[0].totalAmount,
      count: webOrdersStats[0].count
    } : { amount: 0, count: 0 };
    
    const posTotal = posOrdersStats.length > 0 ? {
      amount: posOrdersStats[0].totalAmount,
      count: posOrdersStats[0].count
    } : { amount: 0, count: 0 };
    
    const combinedTotal = {
      amount: webTotal.amount + posTotal.amount,
      count: webTotal.count + posTotal.count
    };
    
    // Combine period data
    const periodData = {};
    
    webOrdersByPeriod.forEach(item => {
      const period = item._id;
      if (!periodData[period]) {
        periodData[period] = {
          period,
          webAmount: 0,
          webCount: 0,
          posAmount: 0,
          posCount: 0,
          totalAmount: 0,
          totalCount: 0
        };
      }
      periodData[period].webAmount = item.totalAmount;
      periodData[period].webCount = item.count;
      periodData[period].totalAmount += item.totalAmount;
      periodData[period].totalCount += item.count;
    });
    
    posOrdersByPeriod.forEach(item => {
      const period = item._id;
      if (!periodData[period]) {
        periodData[period] = {
          period,
          webAmount: 0,
          webCount: 0,
          posAmount: 0,
          posCount: 0,
          totalAmount: 0,
          totalCount: 0
        };
      }
      periodData[period].posAmount = item.totalAmount;
      periodData[period].posCount = item.count;
      periodData[period].totalAmount += item.totalAmount;
      periodData[period].totalCount += item.count;
    });
    
    const salesByPeriod = Object.values(periodData).sort((a, b) => a.period.localeCompare(b.period));
    
    res.json({
      webTotal,
      posTotal,
      combinedTotal,
      salesByPeriod,
      topProducts: formattedTopProducts
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all sales (both web and POS)
// @route   GET /api/sales
// @access  Private/Admin
const getAllSales = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20,
      startDate,
      endDate,
      source
    } = req.query;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Build date filter if provided
    const dateFilter = {};
    if (startDate || endDate) {
      dateFilter.createdAt = {};
      if (startDate) {
        dateFilter.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        // Make endDate inclusive by setting it to end of day
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        dateFilter.createdAt.$lte = end;
      }
    }
    
    let webOrders = [];
    let posOrders = [];
    let webCount = 0;
    let posCount = 0;
    
    // Fetch data based on source filter
    if (!source || source === 'web') {
      const webQuery = {
        ...dateFilter,
        isPaid: true
      };
      
      webOrders = await Order.find(webQuery)
        .populate('user', 'name email')
        .select('_id user totalPrice createdAt status isPaid paidAt')
        .sort({ createdAt: -1 })
        .limit(source ? parseInt(limit) : Math.ceil(parseInt(limit) / 2))
        .skip(source ? skip : 0);
        
      webCount = await Order.countDocuments(webQuery);
    }
    
    if (!source || source === 'pos') {
      const posQuery = {
        ...dateFilter,
        paymentStatus: 'completed'
      };
      
      posOrders = await POSOrder.find(posQuery)
        .populate('staff', 'name email')
        .select('_id orderNumber staff totalAmount createdAt paymentMethod paymentStatus')
        .sort({ createdAt: -1 })
        .limit(source ? parseInt(limit) : Math.ceil(parseInt(limit) / 2))
        .skip(source ? skip : 0);
        
      posCount = await POSOrder.countDocuments(posQuery);
    }
    
    // Format and combine results
    const webOrdersFormatted = webOrders.map(order => ({
      _id: order._id,
      orderNumber: order._id,
      date: order.createdAt,
      amount: order.totalPrice,
      customer: order.user ? `${order.user.name}` : 'Guest Customer',
      status: order.isPaid ? (order.status || 'Paid') : 'Awaiting Payment',
      paymentDate: order.paidAt,
      source: 'web'
    }));
    
    const posOrdersFormatted = posOrders.map(order => ({
      _id: order._id,
      orderNumber: order.orderNumber,
      date: order.createdAt,
      amount: order.totalAmount,
      customer: order.customer?.name || 'Walk-in Customer',
      staff: order.staff ? order.staff.name : 'Unknown',
      status: order.paymentStatus,
      paymentMethod: order.paymentMethod,
      source: 'pos'
    }));
    
    let combinedOrders;
    let totalCount;
    
    // Combine and sort if needed
    if (!source) {
      combinedOrders = [...webOrdersFormatted, ...posOrdersFormatted]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, parseInt(limit));
      totalCount = webCount + posCount;
    } else if (source === 'web') {
      combinedOrders = webOrdersFormatted;
      totalCount = webCount;
    } else {
      combinedOrders = posOrdersFormatted;
      totalCount = posCount;
    }
    
    res.json({
      sales: combinedOrders,
      page: parseInt(page),
      pages: Math.ceil(totalCount / parseInt(limit)),
      total: totalCount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCombinedSalesStats,
  getAllSales
};
