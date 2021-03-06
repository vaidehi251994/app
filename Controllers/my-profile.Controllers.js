const createHttpError = require('http-errors')
const { authSchema ,myProfileDelete} = require('../helpers/validation_schema');
const User = require('../Models/User.model');
const {validateHeaderName} = require('http');
const { Mongoose } = require('mongoose');
//const ObjectId = require('mongodb').ObjectID;
module.exports = {
    getProfile: async (req, res, next) => {
        try {
            const userProfiles =await User.find().exec();
            console.log(userProfiles)
            res.send(userProfiles)
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
        },
        getProfileByEmail: async (req, res, next) => {
            try{
                const userProfiles=await User.findOne({email:req.body.email})
                console.log(userProfiles)
                res.send(userProfiles)
            }catch(error){
                if (error.isJoi === true) error.status = 422
                next(error)
            }
        },
        getProfileById : async (req , res, next) => {
            try{
                User.findById(req.params.id)
                .then(result=>{
               res.status(200).json({
               User:result
         })
     })
            }catch(error){
              if (error.isJoi === true) error.status = 422
                next(error)
            }
     }}
    


           
       
        
        
    
    
        



        
    
        

        
                

        
    
 



        
        


                      

        

        
        
