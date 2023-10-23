const database = require('../conf/db_config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const customOnError = require('./error')

function getUserById (req, res) {
  if (req.params.id > 0) {
    database.user
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(result => {
        if (result !== null) {
          res.json(result)
        } else {
          customOnError(req, res, 'Not Found')
        }
      })
      .catch(e => customOnError(req, res, e))
  } else {
    customOnError(req, res, 'Not correct id')
  }
}

function getUser (req, res) {
  database.user
    .findAll({})
    .then(result => res.json(result))
    .catch(e => customOnError(req, res, e.name))
}

async function updateUser (req, res) {
  const { login, role } = req.body
  try {
    await database.seq.transaction(async transaction => {
      try {
        const user = await database.user.update(
          {
            login: login,
            role: role
          },
          {
            where: {
              id: req.params.id
            }
          },
          { transaction: transaction }
        )
        res.statusCode = 201
        res.json(user)
      } catch (e) {
        transaction.rollback()
        throw e
      }
    })
  } catch (e) {
    customOnError(req, res, e.name)
  }
}

function deleteUser (req, res) {
  if (req.params.id > 0) {
    database.user
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
          const result = database.findOne({ where: { userId: req.params.id } })
          if (result) {
            database.basket.destroy({
              where: {
                id: result.id
              },
              returning: true
            })
          }
          res.json({ status: 'Deleted' })
        }
      })
      .catch(e => customOnError(req, res, e))
  } else {
    customOnError(req, res, 'Not correct id')
  }
}

const generateJwt = (id, login, role) => {
  return jwt.sign({ id, login, role }, process.env.JWT_SECRET, {
    expiresIn: '24h'
  })
}

const signUp = async (req, res) => {
  try {
    const { login, password } = req.body
    if (login && password) {
      const candidate = await database.user.findOne({ where: { login } })
      if (candidate) {
        return next(ApiError.badRequest('User Login Already exist!!!'))
      }
      const hashPassword = await bcrypt.hash(password, 5)
      database.user
        .create({
          login: login,
          password: hashPassword,
          role: 'client'
        })
        .catch(e => console.log(e))
        .then(user => {
          res.statusCode = 201
          database.basket.create({ userId: user.id })
          const token = generateJwt(user.id, user.login, user.role)
          res.json(token)
        })
    } else {
      customOnError(req, res, 'Incorect input')
    }
  } catch (error) {
    customOnError(req, res, 'Internal server error')
  }
}

const login = async (req, res) => {
  try {
    const { login, password } = req.body

    if (!login || !password) {
      return customOnError(req, res, 'Invalid login or password')
    }
    const user = await database.user.findOne({ where: { login } })
    if (user) {
      let comparePassword = bcrypt.compareSync(password, user.password)
      if (comparePassword) {
        const token = generateJwt(user.id, user.email, user.role)
        return res.status(200).json({ token, user })
      }
    } else {
      return customOnError(req, res, 'Invalid login or password')
    }
  } catch (error) {
    customOnError(req, res, 'Internal server error')
  }
}

const check = async (req, res, next) => {
  const token = generateJwt(req.user.id, req.user.email, req.user.role)
  return res.json({ token })
}

module.exports = {
  login,
  signUp,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
  check
}
