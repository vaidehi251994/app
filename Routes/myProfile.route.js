const express = require('express')
const router = express.Router();
const myProfileController = require('../Controllers/my-profile.Controllers')
 
router.get('/getProfile' ,myProfileController.getProfile )
router.put('/updateProfile' ,myProfileController.updateProfile )
router.delete('/deleteProfile' ,myProfileController.deleteProfile )

module.exports=router