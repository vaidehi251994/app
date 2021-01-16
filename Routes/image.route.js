const express = require('express')
const path = require('path')
const router = express.Router();
const upload = require('../Controllers/uploadMiddleware');

router.post('/', upload.single('image'), async function (req, res) {
  const imagePath = path.join(__dirname, '/public/images');
  if (!req.file) {
    res.status(401).json({error: 'Please provide an image'});
  }
  return res.status(200).json({ name:req.file });
});

module.exports = router