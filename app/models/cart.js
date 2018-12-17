const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // owner: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Product',
  //   required: true
  // },
  // maybe subtotal should actually be a virtual of summation of product prices
  subtotal: {
    type: Number
  },
  tax: {
    type: Number
  },
  total: {
    type: Number
  }
},
{
  timestamps: true
})

module.exports = mongoose.model('Cart', cartSchema)
// needs a link to product
