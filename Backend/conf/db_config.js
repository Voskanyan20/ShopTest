const { Sequelize } = require('sequelize')
const { DB_NAME, DB_USERNAME, PASSWORD, HOST } = require('../configGlobal.js')

const seq = new Sequelize(DB_NAME, DB_USERNAME, PASSWORD, {
  host: HOST,
  dialect: 'postgres',
  alias: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

seq
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(error => {
    console.error('Unable to connect to the database: ', error)
  })

const database = {}

database.Sequelize = Sequelize
database.seq = seq
database.product = require('../models/product.js')(seq, Sequelize)
database.user = require('../models/user.js')(seq, Sequelize)
database.basket = require('../models/basket.js')(seq, Sequelize)
database.basketProduct = require('../models/basketProduct.js')(seq, Sequelize)
database.order = require('../models/payment.js')(seq, Sequelize)

database.initAssosciacion = () => {
  database.user.hasOne(database.basket)
  database.basket.belongsTo(database.user)

  database.basket.hasMany(database.basketProduct)
  database.basketProduct.belongsTo(database.basket)

  database.product.hasMany(database.basketProduct)
  database.basketProduct.belongsTo(database.product)
}

module.exports = database
