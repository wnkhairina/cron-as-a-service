const Joi = require('@hapi/joi')

module.exports = (req) => {
  return new Promise((resolve, reject) => {
    Joi.validate(req.body, Joi.object().keys({
      // ---------------------------- BODY TO VALIDATE ---------------------------
      endpoint: Joi.string().required(),
      interval: Joi.number().required(),
      email: Joi.string().email().required()
      // -------------------------------------------------------------------------
    }), (error, value) => {
      if (error) return reject(error) // Reject if error
      return resolve(value) // Resolve value if no error
    })
  })
}
