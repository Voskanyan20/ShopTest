const express = require('express')
const control = require('../controllers/controllers')
const verify = require('../middleware/authMiddleweare')
const route = express.Router()

route.get('/getUsers', verify.verifyRole('admin'), control.user.getUser)
route.get(
  '/getUserById:id',
  verify.verifyRole('admin'),
  control.user.getUserById
)
route.put(
  '/updateUser/:id',
  verify.verifyRole('admin'),
  control.user.updateUser
)
route.delete(
  '/deleteUser/:id',
  verify.verifyRole('admin'),
  control.user.deleteUser
)
route.post('/signUp', control.user.signUp)
route.post('/login', control.user.login)

module.exports = route
