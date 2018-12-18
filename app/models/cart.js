const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
},
{
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
})

cartSchema.virtual('subtotal').get(function () {
  // add up prices of all products' in cart
  // return this.
})
cartSchema.virtual('tax').get(function () {
  // multiply subtotal with 0.07 (tax = 7%)
  // return this.
})
cartSchema.virtual('total').get(function () {
  // subtotal + tax
  // return this.
})

module.exports = mongoose.model('Cart', cartSchema)
