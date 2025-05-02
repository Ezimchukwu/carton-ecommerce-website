
const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  productType: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  dimensions: {
    length: {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    }
  },
  material: {
    type: String,
    required: true
  },
  printingRequired: {
    type: Boolean,
    default: false
  },
  customDesign: {
    type: Boolean,
    default: false
  },
  additionalComments: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'quoted', 'accepted', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;
