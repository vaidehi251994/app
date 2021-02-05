const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')
require('dotenv').config()
require('./helpers/init_mongodb')
const { verifyAccessToken } = require('./helpers/jwt_helper')
const AuthRoute = require('./Routes/Auth.route')
const ContactRoute = require('./Routes/contact.route')
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require('path')
const router = require('./Routes/image.route')
const myProfile = require('./Routes/my-profile.route')
const mailer = require('./Routes/mailer.route')

const fs = require('fs')
const route = require('./Routes/image.route')
//const myProfile = require('./Routes/myProfile.route')
const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + 'public'));
app.get('/img', function(req, res) {
 const data = fs.readFileSync('../public/images/image-1610960697942.png')
  res.render('page', (req,res)=> {
     res.sendFile(req.readFileSync);
    image: data.toString('base64')
  }) })

//app.use('/',route,(req,res)=>{
 //res.send("hi upload")
   //  console.log("image shown on postman or server")
//})
 app.get('/', verifyAccessToken, async(req, res, next ) => {
  res.send('Hello from express')
})
app.use('/auth', AuthRoute)
app.use('/con',ContactRoute)
app.use('/' ,myProfile)
app.use('/',mailer)

app.use('/',route,(req,res)=>{
    res.send("hi upload")
       console.log("image shown on postman or server")
   })

app.use(async (req, res, next ) => {
    next(createError.NotFound('This route does not exist'))
})
app.use((err, req, res, next) => {

    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

 const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
