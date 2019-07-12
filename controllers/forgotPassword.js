var nodemailer = require('nodemailer');
const userCredential = require('../keys');
const Fpass = require('../models/forgotPassword');
const User = require('../models/user');
const { JWT_SECRET } = require('../configuration');
const JWT = require('jsonwebtoken');
var fs = require('fs');
var handlebars = require('handlebars');
var readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};

var smtpTransport = nodemailer.createTransport('smtps://' + userCredential.user  + ':' +userCredential.pass +'@smtp.gmail.com');
exports.forgotPassword = (req,res,next) => {
    var rand,mailOptions,host,link;
    User.findOne({'email':req.body.email}).then(user =>{
   if(user){
    rand = Math.floor((Math.random() * 1000000) + 54 );
    host = req.get('host');
    const token = JWT.sign(
        { email: req.body.email},
        JWT_SECRET,
        { expiresIn: "300s" }
      );
    link = " https://instigo-project.appspot.com" + "/forgotp/"+rand+'/'+token
    readHTMLFile(__dirname + '/index.html', function(err, html) {
    var template = handlebars.compile(html);
    var replacements = {
         rand: rand,
         token: token
    };
    var htmlToSend = template(replacements);
    mailOptions = {
        from: '"InstiGO" <instigo.iitdh@gmail.com>',
        to: req.body.email,
        subject: "Reset your password for InstiGO",
        html: htmlToSend
    }
    smtpTransport.sendMail(mailOptions, (error, info) => {
        if(error) {
            User.deleteOne({"email": req.body.email}).then(response => {
                console.log("User deleted as email not sent!");
            }).catch(erorr => {
                console.log("Error while Deleting!");
            })
            return res.status(500).json({
                message: "Failure_Check Email and password of sender!"
              });
        }
        const fpass = new Fpass({
            userID: req.body.email,
            rand : rand
        });
       fpass
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
    });
});
}else{
 res.status(404).json({message :"Failure_User Not Found"});
}
})
}
//ewoJImVtYWlsIjoiYWx1dGhyYTE0MDNAZ21haWwuY29tIgp9