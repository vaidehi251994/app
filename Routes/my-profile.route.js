const express = require('express')
const router = express.Router()
const MyProfileController = require('../Controllers/my-profile.Controllers')

router.get('/getProfile', MyProfileController.getProfile);
router.put('/updateProfile', MyProfileController.updateProfile);
router.delete('/deleteProfile', MyProfileController.deleteProfile);
router.get('/getProfileByEmail',MyProfileController.getProfileByEmail);


module.exports = router