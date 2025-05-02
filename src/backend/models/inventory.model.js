
const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  variant: {
    size: String,
    packagingType: String,
    other: {
      type: Map,
      of: String
    }
  },
  lowStockThreshold: {
    type: Number,
    default: 10
  },
  isLowStock: {
    type: Boolean,
    default: false
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Set isLowStock flag when quantity changes
inventorySchema.pre('save', function(next) {
  if (this.isModified('quantity')) {
    this.isLowStock = this.quantity <= this.lowStockThreshold;
    this.lastUpdated = Date.now();
  }
  next();
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
