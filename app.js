const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require("./routes/users");
const passport = require('passport');
const JWT = require('jsonwebtoken');
mongoose.Promise = global.Promise;
const app = express();
if (process.env.NODE_ENV === 'test') {
  mongoose.connect("mongodb+srv://admin:aluthra1403@cluster0-mrukq.gcp.mongodb.net/api?retryWrites=true&w=majority", { useNewUrlParser: true });
} else {
  //
  mongoose.connect("mongodb+srv://sonusourav:mongopass@instigo-server-ytfvu.gcp.mongodb.net/api?retryWrites=true&w=majority",{useNewUrlParser: true })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log(err);
    console.log("Connection failed!");
  });
}


// Middlewares moved morgan into if for clear tests
if (!process.env.NODE_ENV === 'test') {
  app.use(morgan('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
// Routes
// app.use("/images", express.static(path.join("images")));
app.use(passport.initialize())
app.set('view engine','ejs');
app.get('/',(req,res) =>{
  res.render('home');
});
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}) 
);
app.use('/users', userRoutes);
app.get('/auth/users/oauth/google', passport.authenticate('google'), (req, res) => {
     res.status(200).json({ message: "success" });
});
;
module.exports = app;
