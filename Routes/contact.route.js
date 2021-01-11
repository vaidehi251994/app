const express = require('express')
const router = express.Router()
const contactController = require('../Controllers/contact.controller')

// POST /login gets urlencoded bodies
router.post('/createContact', contactController.createContact)

//router.get('/get',contactController.getContact)
module.exports=router