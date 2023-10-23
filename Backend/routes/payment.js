const express = require('express')
const control = require('../controllers/controllers')
const verify = require('../middleware/authMiddleweare')
const route = express.Router()

route.post('/create-checkout-session', verify.verify, control.payment.stripePay)
route.post(
  '/webhook',
  express.raw({ type: '*/*' }),
  control.payment.stripeWebHook
)

module.exports = route
