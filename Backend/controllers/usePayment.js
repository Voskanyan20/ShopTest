const database = require('../conf/db_config')
const customOnError = require('./error')

function getAllPayments (req, res) {
  database.order
    .findAll()
    .then(result => res.json(result))
    .catch(e => customOnError(req, res, e.name))
}

function getPaymentsById (req, res) {
  if (req.params.id > 0) {
    database.order
      .findAll({
        where: {
          user_id: req.params.id
        }
      })
      .then(result => res.json(result))
      .catch(err => customOnError(req, res, err.name))
  } else {
    customOnError(req, res, 'Not correct id')
  }
}

function deletePayment (req, res) {
  if (req.params.id > 0) {
    database.order
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

module.exports = { getAllPayments, getPaymentsById, deletePayment }
