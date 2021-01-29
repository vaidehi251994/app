const createHttpError = require('http-errors')
const nodemailer = require("nodemailer")
const nodemailMailgun = require("nodemailer-mailgun-transport")




 //step 1

module.exports={
    mailer: async (req,res,next) => {
    try{
       const auth = {
        auth:{
              api_key: 'key-e3b05da4a39555648c36935b3e712533',
              domain: 'https://api.mailgun.net/v3/sandbox60d47c20b65c4dcaa6d6340f71ee950a.mailgun.org',
        }}
        //step 2
    let transporter=nodemailer.createTransport({
        host : "smtp.mailgun.org",
        port : 587,
        auth : {
            user :"postmaster@sandbox60d47c20b65c4dcaa6d6340f71ee950a.mailgun.org" ,
            pass :"97a0e9bddcff06e9b1ea12a245c74e82",
        }})

   //step 3
    const mailOptions = {
     from : req.body.from,
     to : req.body.to,
     subject : req.body.subject,
     text :req.body.text
}

//step 4
transporter.sendMail(mailOptions, function(err,data){
    if (err) {
        console.log('Error:',err)
    }
    else {
        console.log('message sent')
    }
})
}catch (error) {
    res.send('message not sent')
}} 
}   



    

        
    



