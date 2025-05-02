
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  originalPrice: {
    type: Number,
    default: 0
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  images: [
    {
      type: String
    }
  ],
  features: [
    {
      type: String
    }
  ],
  specifications: {
    type: Map,
    of: String
  },
  isNew: {
    type: Boolean,
    default: false
  },
  isBestseller: {
    type: Boolean,
    default: false
  },
  customizable: {
    type: Boolean,
    default: false
  },
  minQuantity: {
    type: Number,
    default: 1
  },
  maxQuantity: {
    type: Number,
    default: 1000
  },
  estimatedDelivery: {
    type: String
  },
  rating: {
    average: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  active: {
    type: Boolean,
    default: true
  },
  barcode: {
    type: String,
    unique: true,
    sparse: true
  },
  sku: {
    type: String,
    unique: true,
    sparse: true
  },
  hasVariants: {
    type: Boolean,
    default: false
  },
  variants: [{
    name: String,
    size: String,
    packagingType: String,
    price: Number,
    sku: String,
    stock: {
      type: Number,
      default: 0
    },
    other: {
      type: Map,
      of: String
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
