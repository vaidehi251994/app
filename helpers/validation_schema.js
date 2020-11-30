const Joi = require('@hapi/joi')

const authSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
  fname: Joi.string().lowercase().required(),
  lname: Joi.string().lowercase().required(),
  phone: Joi.number(),
  insta: Joi.string(),
  facebook: Joi.string(),
  linkedin: Joi.string(),
  city: Joi.string().required(),
  address: Joi.string()
})

module.exports = {
  authSchema,
}