const express = require('express')
const path = require('path')
const fs = require('fs')
const router = express.Router();
const uploadController = require('../Controllers/uploadMiddleware');
// router.get('/img', function(req, res) {
//   const data = fs.readFileSync('../public/images/image-1610960697942.png')
//   res.render('page', (req,res)=> {
//       res.sendFile(req.readFileSync);
//     image: data.toString('base64')
//   })
// })
router.post('/image', (req,res)=>{
 uploadController(req, res,function (err){
  const imagePath = path.join(__dirname, '/public/images');
  if (err) {
    res.status(401).json({error: 'Please provide an image'});
  }else
  res.json({
     success:true,
    message:'image uploaded' 
           });
          })
      });
module.exports = router