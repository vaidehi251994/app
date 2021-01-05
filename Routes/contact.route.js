const express = require('express')
const router = express.Router()
const contactController = require('../Controllers/contact.controller')

// POST /login gets urlencoded bodies
router.post('/contact', contactController.createContact)
module.exports=router
