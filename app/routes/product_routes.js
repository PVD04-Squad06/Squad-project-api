// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for examples
const Product = require('../models/product')

// we'll use this to intercept any errors that get thrown and send them
// back to the client with the appropriate status code
const handle = require('../../lib/error_handler')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
// const requireOwnership = customErrors.requireOwnership

// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `res.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /examples
router.get('/products', requireToken, (req, res) => {
  Product.find()
    .then(products => {
      // `examples` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return products.map(product => product.toObject())
    })
    // respond with status 200 and JSON of the examples
    .then(products => res.status(200).json({ products: products }))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res))
})
// Get all womens-clothing
router.get('/products/womens-clothing', (req, res) => {
  console.log('got here')
  Product.find({gender: 'Women'})
    .then(products => {
      return products.map(product => product.toObject())
    })
    .then(products => res.status(200).json({ products: products }))
    .catch(err => handle(err, res))
})

// Get all mens-clothing
router.get('/products/mens-clothing', (req, res) => {
  console.log('got here')
  Product.find({gender: 'Men'})
    .then(products => {
      return products.map(product => product.toObject())
    })
    .then(products => res.status(200).json({ products: products }))
    .catch(err => handle(err, res))
})

// SHOW
// GET /examples/5a7db6c74d55bc51bdf39793
router.get('/products/:id', requireToken, (req, res) => {
  // req.params.id will be set based on the `:id` in the route
  Product.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "example" JSON
    .then(product => res.status(200).json({ product: product.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res))
})



// CREATE  - user will not be able to create products
// UPDATE - user will not be able to create products
// DESTROY - user will not be able to create products

module.exports = router
