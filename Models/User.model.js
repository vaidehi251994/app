const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        lowercase: true
    },
    fname: {
        type: String,
        lowercase: true,
        required: true,
    },
    lname: {
        type: String,
        lowercase: true,
        required:true,
    },
    phone: {
        type: Number,
    },
    insta: {
        type: String,
    },
    facebook: {
        type: String,
    },
    linkedin: {
        type: String,
    },
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
       bio : {
        type : String ,
        required: true,
        lowercase: true,
     },
     dateOfBirth : {
        type : Date,
        requried: true,
     },
    gender : {
        type : String,
        enum : ["male","female"],
        requried: true,
    },
    designation : {
        type : String,
        requried : true,
    },
     image : {
            data : Buffer,
           type : String,
            requried : true,
    },
},
 {   timestamps: true
    })
UserSchema.pre('save', async function (next)  {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
    } catch (error) {
        next(error)
    }
})

UserSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        throw error
    }
}


const User = mongoose.model('user', UserSchema)
module.exports = User