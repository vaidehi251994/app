const express = require('express')
const router = express.Router()
const MyProfileController = require('../Controllers/my-profile.Controllers');
const User = require('../Models/User.model');

router.get('/getProfile', MyProfileController.getProfile);
router.put('/updateProfile', MyProfileController.updateProfile);
router.delete('/deleteProfile', MyProfileController.deleteProfile);
router.get('/getProfileByEmail',MyProfileController.getProfileByEmail);
router.get('/getProfileById/:id', MyProfileController.getProfileById);



module.exports = router