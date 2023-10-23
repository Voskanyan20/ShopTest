const jwt = require('jsonwebtoken')
const customOnError = require('../controllers/error')

const verify = (req, res, next) => {
  let token = req.headers['authorization']
  if (!token) {
    return customOnError(req, res, 'No token provided')
  }
  token = token.replace('Bearer ', '')
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return customOnError(req, res, 'Invalid token')
    }
    next()
  })
}

const verifyRole = role => {
  return (checkRole = (req, res, next) => {
    let token = req.headers['authorization']
    if (!token) {
      return customOnError(req, res, 'No token provided')
    }
    token = token.replace('Bearer ', '')
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (decoded.role !== role) {
        return customOnError(req, res, 'Not Access!!!')
      }
      next()
    })
  })
}

module.exports = { verify, verifyRole }
