
const mongoose = require('mongoose');

const inventoryLogSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  type: {
    type: String,
    enum: ['added', 'sold', 'adjusted', 'returned'],
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  previousQuantity: {
    type: Number,
    required: true
  },
  newQuantity: {
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
  reason: {
    type: String
  },
  performedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reference: {
    // Can refer to an order ID or POS order ID
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const InventoryLog = mongoose.model('InventoryLog', inventoryLogSchema);

module.exports = InventoryLog;
