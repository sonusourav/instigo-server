
var nodemailer = require('nodemailer');
const userCredential = require('../keys');
const Vemail = require('../models/verifyemail');
const User = require('../models/user');

var smtpTransport = nodemailer.createTransport('smtps://' + userCredential.user  + ':' +userCredential.pass +'@smtp.gmail.com');
var rand,mailOptions,host,link;

exports.verifyemail = (req,res,next) => {
    rand = Math.floor((Math.random() * 1000000) + 54 );
    host = req.get('host');
    link = "https://instigo-server.appspot.com" + "/users/verify/"+rand+'/'+ req.userID;
    mailOptions = {
        from: '"InstiGO" <instigo.iitdh@gmail.com>',
        to: req.body.email,
        subject: "Verify your email for InstiGO",
        html: "Hello,<br> Follow the link to verify your email address.<br><a href=" + link + ">Clink here to verify</a><br>If you didn’t ask to verify this address, you can ignore this email.<br><br>Thanks,<br>Your InstiGO team"
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
                message: "Failure_Check Email and password of sender!"
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
                    message: "Success"
                })
            })
            .catch(error => {
                res.status(500).json({
                    message: "Failure_Error occured while saving data!"
                  });
            })
        console.log(info.response);
    })

}
