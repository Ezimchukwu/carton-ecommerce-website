
const mongoose = require('mongoose');

const posOrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    },
    variant: {
      size: String,
      packagingType: String,
      other: {
        type: Map,
        of: String
      }
    },
    subtotal: {
      type: Number,
      required: true
    }
  }],
  customer: {
    name: String,
    email: String,
    phone: String,
    isRegistered: {
      type: Boolean,
      default: false
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subtotal: {
    type: Number,
    required: true
  },
  tax: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  discountCode: {
    type: String
  },
  totalAmount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'bank_transfer', 'other'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generate unique order number before saving
posOrderSchema.pre('save', async function(next) {
  try {
    if (!this.orderNumber) {
      const date = new Date();
      const prefix = 'POS';
      const year = date.getFullYear().toString().slice(-2);
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      
      const dateStr = `${year}${month}${day}`;
      
      // Find the last order number for today to increment counter
      const lastOrder = await this.constructor.findOne({
        orderNumber: { $regex: `^${prefix}${dateStr}` }
      }).sort({ orderNumber: -1 });
      
      let counter = 1;
      if (lastOrder) {
        const lastCounter = parseInt(lastOrder.orderNumber.slice(-4));
        if (!isNaN(lastCounter)) {
          counter = lastCounter + 1;
        }
      }
      
      this.orderNumber = `${prefix}${dateStr}${counter.toString().padStart(4, '0')}`;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const POSOrder = mongoose.model('POSOrder', posOrderSchema);

module.exports = POSOrder;
