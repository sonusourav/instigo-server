
var nodemailer = require('nodemailer');
const userCredential = require('../keys');
const Vemail = require('../models/verifyemail');
const User = require('../models/user');

var smtpTransport = nodemailer.createTransport('smtps://' + userCredential.user  + ':' +userCredential.pass +'@smtp.gmail.com');
var rand,mailOptions,host,link;

exports.verifyemail = (req,res,next) => {
    rand = Math.floor((Math.random() * 1000000) + 54 );
    host = req.get('host');
    link = "http://localhost:3000" + "/users/verify/"+rand+'/'+ req.userID;
    mailOptions = {
        from: '"Admin" <aluthra1403@gmail.com>',
        to: req.body.email,
        subject: "Please confirm your Email Account",
        html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Clink here to verify</a>"
    }
    smtpTransport.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error);
            User.deleteOne({"email": req.body.email}).then(response => {
                console.log("User deleted as email not sent!");
            }).catch(erorr => {
                console.log("Error while Deleting!");
            })
            return res.status(500).json({
                message: "Check Email and password of sender!"
              });
        }
        const vemail = new Vemail({
            userID: req.userID,
            rand : rand
        });
        vemail
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
