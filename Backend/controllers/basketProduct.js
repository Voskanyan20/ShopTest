const database = require('../conf/db_config')
const { Op } = require('sequelize')
const customOnError = require('./error')

async function getBasketProduct (req, res) {
  const userId = req.params.id
  if (userId) {
    try {
      const basketResult = await database.basket.findOne({
        where: {
          userId: userId
        }
      })
      if (basketResult) {
        const basketProductResult = await database.basketProduct.findAll({
          where: {
            basketId: basketResult.id
          }
        })

        if (basketProductResult.length > 0) {
          const data = basketProductResult.map(item => item.productId)

          const productResult = await database.product.findAll({
            where: {
              id: {
                [Op.in]: data
              }
            },
            include: [
              {
                model: database.basketProduct,
                attributes: ['quantity', 'id', 'productId'],
                where: { basketId: basketResult.id }
              }
            ]
          })

          res.json({ productResult })
        }
      }
    } catch (error) {
      customOnError(req, res, error.name)
    }
  } else {
    customOnError(req, res, 'error')
  }
}

async function addBasketToProduct (req, res) {
  const userId = req.params.id
  const productId = req.body.productId

  if (userId && productId) {
    try {
      const result = await database.basket.findOne({
        where: {
          userId: userId
        }
      })
      if (result) {
        const existingItem = await database.basketProduct.findOne({
          where: { basketId: result.id, productId: productId }
        })
        if (existingItem) {
          const newQuantity = existingItem.quantity + 1

          await existingItem.update({ quantity: newQuantity })
          if (existingItem) {
            res.statusCode = 201
            res.json('Item quantity updated in the basket.')
          }
        } else {
          await database.seq.transaction(async transaction => {
            await database.basketProduct
              .create(
                {
                  basketId: result.id,
                  productId: productId
                },
                { transaction: transaction }
              )
              .then(result => {
                res.statusCode = 201
                res.json(result)
              })
              .catch(async error => {
                customOnError(req, res, 'Product not created!!!')
              })
          })
        }
      } else {
        customOnError(req, res, 'Something is wrong')
      }
    } catch (e) {
      customOnError(req, res, e.name)
    }
  } else {
    customOnError(req, res, 'Not Found')
  }
}

async function BasketProductQuantityChange (req, res) {
  const userId = req.params.id
  const productId = req.body.productId
  const quantityMethod = req.body.quantityMethod

  if (userId && productId && quantityMethod) {
    try {
      const result = await database.basket.findOne({
        where: {
          userId: userId
        }
      })
      if (result) {
        const existingItem = await database.basketProduct.findOne({
          where: { basketId: result.id, productId: productId }
        })
        if (existingItem) {
          if (quantityMethod == 'increase') {
            const newQuantity = existingItem.quantity + 1
            await existingItem.update({ quantity: newQuantity })
            if (existingItem) {
              res.statusCode = 201
              res.json('Item quantity updated in the basket.')
            }
          } else if (quantityMethod == 'decline') {
            const newQuantity = existingItem.quantity - 1
            await existingItem.update({ quantity: newQuantity })
            if (existingItem) {
              res.statusCode = 201
              res.json('Item quantity updated in the basket.')
            }
          }
        } else {
          customOnError(req, res, 'Product not Found')
        }
      } else {
        customOnError(req, res, 'Bakset Not Found')
      }
    } catch (e) {
      customOnError(req, res, e.name)
    }
  } else {
    customOnError(req, res, 'Not Found')
  }
}

function deleteBaksetProduct (req, res) {
  if (req.params.id > 0) {
    database.basketProduct
      .destroy({
        where: {
          id: req.params.id
        },
        returning: true
      })
      .then(t => {
        if (t === 0) {
          customOnError(req, res, 'Nothing found')
        } else if (t === 1) {
          res.json({ status: 'Deleted' })
        }
      })
      .catch(e => customOnError(req, res, e))
  } else {
    customOnError(req, res, 'Not correct id')
  }
}

module.exports = {
  getBasketProduct,
  addBasketToProduct,
  BasketProductQuantityChange,
  deleteBaksetProduct
}
