const createHttpError = require('http-errors')
const { authSchema ,myProfileDelete} = require('../helpers/validation_schema');
const User = require('../Models/User.model');
const {validateHeaderName} = require('http');


module.exports = {

    
    getProfile: async (req, res, next) => {
        try {
            const userProfiles =await User.find().exec();
            console.log(userProfiles)
             
        } catch (error) {
            if (error.isJoi === true) error.status = 422
            next(error)
        }},
    
       updateProfile:  async (req, res, next) => {
            try {
                console.log("req.body",req.body)
                const result = await authSchema.validateAsync(req.body)
                console.log(result)
        
                 const doesExist = await User.findOne({ email: result.email})
                 if (doesExist) 
                    {
                        await User.findByIdAndUpdate(doesExist._id,result,{
                            overwrite:true,
                            new:true
                        });
                        res.send({Userupdated:doesExist})
                        
                    }
                    else{
                        return next (createHttpError.BadRequest('Invalid Username'))
                    }    
                } catch (error) {
                    if (error.isJoi === true) error.status = 422
                    next(error)
                }},
            
   
    


     deleteProfile:  async (req, res, next) => {
      try {
           const result = await myProfileDelete.validateAsync(req.body)
   
            const doesExist = await User.findOne({ email: result.email})
            if (doesExist) 
              {
                await User.deleteOne({email: result.email})
                res.send("user deleted")
               }
            
            
           } catch (error) {
              if (error.isJoi === true) error.status = 422
               next(error)
           }
        }
    }  



        
        


                      

        

        
        
