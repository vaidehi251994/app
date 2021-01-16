const multer = require('multer');
const express = require('express')
const userImage = require('../Models/User.model')

const upload = multer({
  limits: {
    fileSize: 4 * 1024 * 1024,
  }
});
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, './public/images');
  },// By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const imageFilter = function(req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      req.fileValidationError = 'Only image files are allowed!';
      return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
}
module.exports = upload,imageFilter;