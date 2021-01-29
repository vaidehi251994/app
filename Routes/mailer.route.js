const express = require('express')
const router = express.Router()
const mailerController = require('../Controllers/mailer.Controller')

router.post('/mailer', mailerController.mailer)
module.exports=router