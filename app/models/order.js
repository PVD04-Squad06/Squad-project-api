const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cart: {
    type: Array,
    required: true
  },
  name: {
    type: String,
    required: false
  }
},
{
  timestamps: true
})

module.exports = mongoose.model('Order', orderSchema)
