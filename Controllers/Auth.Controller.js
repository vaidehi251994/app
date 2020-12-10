const createHttpError = require('http-errors')
const User = require('../Models/User.model')
const { authSchema, loginSchema } = require('../helpers/validation_schema')
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../helpers/jwt_helper')


module.exports = {
register:  async (req, res, next) => {
    try {
        const result = await authSchema.validateAsync(req.body)

         const doesExist = await User.findOne({ email: result.email})
         if (doesExist) 
            throw createHttpError.Conflict(`${result.email} is already been registered`)

         const user = new User(result)
         const savedUser = await user.save()
         const accessToken = await signAccessToken(savedUser.id)
         const refreshToken = await signRefreshToken(savedUser.id)
         res.send({ accessToken, refreshToken })
         
    } catch (error) {
        if (error.isJoi === true) error.status = 422
        next(error)
    }
},

login: async (req, res, next) => {
    try {
        const result = await loginSchema.validateAsync(req.body)
        const user = await User.findOne({ email: result.email })
        if (!user) throw createHttpError.NotFound("user not registered")

        const isMatch = await user.isValidPassword(result.password)
        if (!isMatch)
        throw createHttpError.Unauthorized('Username/password not valid')

        const accessToken = await signAccessToken(user.id)
        const refreshToken = await signRefreshToken(user.id)

        res.send({ accessToken, refreshToken })

    } catch (error) {
        if (error.isJoi === true)
        return next(createHttpError.BadRequest('Invalid Username/Password'))
      next(error)
    }
},

refreshToken: async (req, res, next) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) throw createHttpError.BadRequest()
        const userId = await verifyRefreshToken(refreshToken)

        const accessToken = await signAccessToken(userId)
        const refToken = await signRefreshToken(userId)
        res.send({ accessToken: accessToken, refToken: refreshToken })
    } catch (error) {
        next(error)
    }
},

logout: async (req, res, next) => {
    res.send('logout route')
},
} 