// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for examples
const Order = require('../models/order')

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
const requireOwnership = customErrors.requireOwnership

// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `res.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// CREATE
// POST /examples
router.post('/orders', requireToken, (req, res) => {
  // req.body is an array of product objects
  console.log(req.body)

  // req.body = JSON.parse(req.body)
  // console.log(req.body)
  // req.body.order.owner = req.user.id
  Order.create({cart: req.body, owner: req.user.id})
    // respond to succesful `create` with status 201 and JSON of new "example"
    .then(order => {
      res.status(201).json({ order: order.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(err => handle(err, res))
})

// INDEX
// GET /examples
router.get('/orders', requireToken, (req, res) => {
  Order.find()
    .then(orders => {
      // `examples` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return orders.map(order => order.toObject())
    })
    // respond with status 200 and JSON of the examples
    .then(orders => {
      res.status(200).json({ orders: orders })
      // if an error occurs, pass it to the handler
        .catch(err => handle(err, res))
    })
})

// SHOW
// GET /examples/5a7db6c74d55bc51bdf39793
router.get('/orders/:id', requireToken, (req, res) => {
  // req.params.id will be set based on the `:id` in the route
  Order.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "example" JSON
    .then(order => res.status(200).json({ order: order.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res))
})

module.exports = router
