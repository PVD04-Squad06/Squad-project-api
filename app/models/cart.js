const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
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
