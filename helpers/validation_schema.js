const Joi = require('@hapi/joi')

const authSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
  username:Joi.string().lowercase().required(),
  fname: Joi.string().lowercase().required(),
  lname: Joi.string().lowercase().required(),
  phone: Joi.number(),
  insta: Joi.string(),
  facebook: Joi.string(),
  linkedin: Joi.string(),
  city: Joi.string().required(),
  address: Joi.string(),
  bio: Joi.string().min(20).required(),
  dateOfBirth: Joi.date(),
  image:Joi.string().required(),
  gender:Joi.string(),
  designation:Joi.string()
})

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required()
})
const myProfileDelete = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required()
})

const contactSchema = Joi.object({
  username:Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  category:Joi.string().required(),
  associty:Joi.string().required(),
  message:Joi.string().required(),
  verifycode:Joi.number().required(),

})


module.exports = {
  authSchema,loginSchema,contactSchema,myProfileDelete
}