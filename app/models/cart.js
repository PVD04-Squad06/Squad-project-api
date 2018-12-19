// Javascript constructor function of cart model.
// id = view-cart
module.exports = function Cart (oldCart) {
  this.items = oldCart.items || {}
  this.totalQty = oldCart.totalQty || 0
  this.totalPrice = oldCart.totalPrice || 0

  this.add = function (item, id) {
    // see if the same product is being added onto the cart. To update quantity
    // in the new cart being generated from the old cart
    var storedItem = this.items[id]
    if (!storedItem) { // if theres no storedItem, set qty and price to 0
      storedItem = this.items[id] = { item: item, qty: 0, price: 0 }
    }
    storedItem.qty++
    storedItem.price = storedItem.item.price * storedItem.qty
    this.totalQty++
    this.totalPrice += storedItem.item.price
  }
  // put items in cart into an array
  this.generateArray = function () {
    var arr = []
    for (var id in this.items) {
      arr.push(this.items[id])
    }
    return arr
  }
}

// below is the mongoose model if cart is being saved in database.
// const mongoose = require('mongoose')
//
// const cartSchema = new mongoose.Schema({
//   owner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   }
// },
// {
//   timestamps: true,
//   toObject: { virtuals: true },
//   toJSON: { virtuals: true }
// })
//
// cartSchema.virtual('subtotal').get(function () {
//   // add up prices of all products' in cart
//   // return this.
// })
// cartSchema.virtual('tax').get(function () {
//   // multiply subtotal with 0.07 (tax = 7%)
//   // return this.
// })
// cartSchema.virtual('total').get(function () {
//   // subtotal + tax
//   // return this.
// })
//
// module.exports = mongoose.model('Cart', cartSchema)
