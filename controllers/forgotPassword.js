var nodemailer = require('nodemailer');
const userCredential = require('../keys');
const Fpass = require('../models/forgotPassword');
const User = require('../models/user');
const { JWT_SECRET } = require('../configuration');
const JWT = require('jsonwebtoken');
var smtpTransport = nodemailer.createTransport('smtps://' + userCredential.user  + ':' +userCredential.pass +'@smtp.gmail.com');
var rand,mailOptions,host,link;
exports.forgotPassword = (req,res,next) => {
    rand = Math.floor((Math.random() * 1000000) + 54 );
    host = req.get('host');
    const token = JWT.sign(
        { email: req.body.email},
        JWT_SECRET,
        { expiresIn: "300s" }
      );
    link = "http://localhost:3000" + "/forgotp/"+token
    mailOptions = {
        from: '"Admin" <aluthra1403@gmail.com>',
        to: req.body.email,
        subject: "Click on link to create a new Password",
        html: "Hello,<br> Please Click on the link to create a new password.<br><a href=" + link + ">Clink here to verify</a>"
    }
    smtpTransport.sendMail(mailOptions, (error, info) => {
        if(error) {
            User.deleteOne({"email": req.body.email}).then(response => {
                console.log("User deleted as email not sent!");
            }).catch(erorr => {
                console.log("Error while Deleting!");
            })
            return res.status(500).json({
                message: "Check Email and password of sender!"
              });
        }
        const fpass = new Fpass({
            userID: req.body.email
        });
       fpass
            .save()
            .then(response => {
                res.status(200).json({
                    message: "Email verification link sent!"
                })
            })
            .catch(error => {
                res.status(500).json({
                    message: "Error occured while saving data!"
                  });
            })
        console.log(info.response);
    })

}
//ewoJImVtYWlsIjoiYWx1dGhyYTE0MDNAZ21haWwuY29tIgp9