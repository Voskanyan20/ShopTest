const express = require('express')
const control = require('../controllers/controllers')
const verify = require('../middleware/authMiddleweare')
const route = express.Router()

route.get(
  '/getBasketProducts/:id',
  verify.verify,
  control.basketProduct.getBasketProduct
)
route.post(
  '/addToBasket/:id',
  verify.verify,
  control.basketProduct.addBasketToProduct
)
route.post(
  '/changeQuantity/:id',
  verify.verify,
  control.basketProduct.BasketProductQuantityChange
)

route.delete(
  '/deleteBasketProduct/:id',
  verify.verify,
  control.basketProduct.deleteBaksetProduct
)

module.exports = route
