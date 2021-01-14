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
const imagehelper = require('./helpers/image_helper')
const router = require('./Routes/image.route')

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', verifyAccessToken, async(req, res, next ) => {
    res.send('Hello from express')
})
app.use('/auth', AuthRoute)
app.use('/con',ContactRoute)

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
app.use(express.static( __dirname+'public'));

app.use('/upload', router);

 const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
