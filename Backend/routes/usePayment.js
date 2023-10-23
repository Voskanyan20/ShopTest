const express = require('express')
const control = require('../controllers/controllers')
const verify = require('../middleware/authMiddleweare')
const route = express.Router()

route.get(
  '/getAllPayments',
  verify.verifyRole('admin'),
  control.usePayment.getAllPayments
)
route.get('/getPaymentsById/:id', control.usePayment.getPaymentsById)
route.delete(
  '/deletePayment/:id',
  verify.verifyRole('admin'),
  control.usePayment.deletePayment
)

module.exports = route
