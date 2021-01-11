const createHttpError = require('http-errors')
const Contact = require('../Models/contact.model')
const {contactSchema } = require('../helpers/validation_schema')
module.exports = {

    createContact: async (req, res, next) => {
        try {
            const result = await contactSchema.validateAsync(req.body)
             const contact = new Contact(result)
             const savedContact = await contact.save()
            console.log(savedContact);
             res.send({savedContact })
             
        } catch (error) {
            if (error.isJoi === true) error.status = 422
            next(error)
        }
    }
}