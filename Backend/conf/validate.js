const joi = require('joi')
exports.validate = (req, res, next) => {
  const schema = joi.object().keys({
    moduleId: joi.number().positive(),
    accessId: joi.number().positive(),
    currentAccessId: joi.number().positive(),
    newAccessId: joi.number().positive()
  })
  if (schema.validate(req.params).error) {
    return res.status(400).json({ err: 'bad request' })
  } else {
    return next()
  }
}
