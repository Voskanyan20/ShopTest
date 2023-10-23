const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT
const DB_NAME = process.env.DB_NAME
const DB_USERNAME = process.env.DB_USERNAME
const PASSWORD = process.env.PASSWORD
const HOST = process.env.HOST
const JWT_SECRET = process.env.JWT_SECRET

module.exports = {
  PORT,
  DB_NAME,
  DB_USERNAME,
  PASSWORD,
  HOST,
  JWT_SECRET
}
