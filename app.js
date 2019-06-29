const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'test') {
  mongoose.connect("mongodb+srv://admin:aluthra1403@cluster0-mrukq.gcp.mongodb.net/api?retryWrites=true&w=majority", { useNewUrlParser: true });
} else {
  mongoose.connect("mongodb+srv://sonusourav:mongopass@instigo-server-ytfvu.gcp.mongodb.net/api?retryWrites=true&w=majority",{ useNewUrlParser: true })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log(err);
    console.log("Connection failed!");
  });
}

const app = express();

// Middlewares moved morgan into if for clear tests
if (!process.env.NODE_ENV === 'test') {
  app.use(morgan('dev'));
}

app.use(bodyParser.json());

// Routes
app.use('/users', require('./routes/users'));

module.exports = app;
