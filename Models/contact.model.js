const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const { array } = require('@hapi/joi')

const ContactSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    category: {
        type:String,
        enum:['comments','complaints','enquiry','feedback'],
        required: true,

    },
    associty:{
        type:String,
        required:true,

    },
    message:{
        type:String,
        required:true,
    },
    verifycode:{
        type:Number,
        required:true,
    },
    })
const Contact = mongoose.model('contact',ContactSchema)
module.exports =Contact