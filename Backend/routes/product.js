const express = require('express')
const control = require('../controllers/controllers')
const verify = require('../middleware/authMiddleweare')
const route = express.Router()

route.get('/getProducts', control.product.getProduct)
route.get('/getProductById/:id', control.product.getProductById)
route.post(
  '/createProduct',
  verify.verifyRole('admin'),
  control.product.createProduct
)
route.put(
  '/updateProduct/:id',
  verify.verifyRole('admin'),
  control.product.updateProduct
)
route.delete(
  '/deleteProduct/:id',
  verify.verifyRole('admin'),
  control.product.deleteProduct
)

module.exports = route
