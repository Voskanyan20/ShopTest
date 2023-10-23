const database = require('../conf/db_config')
const customOnError = require('./error')

function getProductById (req, res) {
  if (req.params.id > 0) {
    database.product
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(product => {
        if (product !== null) {
          res.json(product)
        } else {
          customOnError(req, res, 'Not Found')
        }
      })
      .catch(e => customOnError(req, res, e))
  } else {
    customOnError(req, res, 'Not correct id')
  }
}

function getProduct (req, res) {
  database.product
    .findAll({})
    .then(product => res.json(product))
    .catch(e => customOnError(req, res, e.name))
}

async function createProduct (req, res) {
  let name = req.body.name
  let description = req.body.description
  let price = req.body.price
  let image = req.body.imageUrl
  try {
    await database.seq.transaction(async transaction => {
      const product = await database.product.create(
        {
          name: name,
          description: description,
          price: price,
          imageUrl: image
        },
        { transaction: transaction }
      )
      if (product) {
        res.statusCode = 201
        res.json(product)
      } else {
        throw Error('Product not created!!!')
      }
    })
  } catch (e) {
    customOnError(req, res, e.name)
  }
}

async function updateProduct (req, res) {
  let name = req.body.name
  let description = req.body.description
  let price = req.body.price
  let image = req.body.imageUrl
  try {
    await database.seq.transaction(async transaction => {
      try {
        const product = await database.product.update(
          {
            name: name,
            description: description,
            price: price,
            imageUrl: image
          },
          {
            where: {
              id: req.params.id
            }
          },
          { transaction: transaction }
        )
        res.statusCode = 201
        res.json(product)
      } catch (error) {
        transaction.rollback()
        throw error
      }
    })
  } catch (error) {
    customOnError(req, res, error.name)
  }
}

function deleteProduct (req, res) {
  if (req.params.id > 0) {
    database.product
      .destroy({
        where: {
          id: req.params.id
        },
        returning: true
      })
      .then(product => {
        if (product === 0) {
          customOnError(req, res, 'Nothing found')
        } else if (product === 1) {
          res.json({ status: 'Deleted' })
        }
      })
      .catch(e => customOnError(req, res, e))
  } else {
    customOnError(req, res, 'Not correct id')
  }
}

module.exports = {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}
