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

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
})

const myProfile = Joi.object({
  email: Joi.string().email().lowercase().required(),
  bio: Joi.string().min(50).required(),
  dateOfBirth: Joi.date(),
  image:Joi.string().required(),
  gender:Joi.string(),
  designation:Joi.string(),
  fname: Joi.string().lowercase().required(),
  lname: Joi.string().lowercase().required(),
  phone: Joi.number(),
  insta: Joi.string(),
  facebook: Joi.string(),
  linkedin: Joi.string(),
  city: Joi.string().required(),
  address: Joi.string()
})

const myProfileDelete = Joi.object({
  email: Joi.string().email().lowercase().required()
})


module.exports = {
  authSchema, loginSchema,myProfile,myProfileDelete
}