
const express = require('express');
const app = express();
const cookieparser=require('cookie-parser');
const mongoose = require('mongoose');
const db=require('./config/mongoose');
//const router = express.Router();const session = require('express-session');
// this is used for making the cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportgoogle=require('./config/pasport-google-strategy');
// it is used to store the cookie permanetly so we do not lost cookie in server start
const MongoStore = require('connect-mongo');

const port = 8000;

 // for parsing application/x-www-form-urlencoded

// when we post the form it is helpul in parsing or converting into json
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
// to make the cookie in website
app.use(cookieparser());
app.set('view engine','ejs');
app.set('views','./views');
// making the cookie by using passport local
app.use(session({
  name:'auth',
  secret: 'abc',
  resave: false,
  saveUninitialized: false,
  cookie:{
    maxAge:(1000*60*100)
  },
  store:  new MongoStore({
    mongoUrl: 'mongodb://127.0.0.1/mydatabase', 
}),
  autoRemove:'disabled'
 
}));
// initialise the paassport local
app.use(passport.initialize());
app.use(passport.session());
//passport.use(passportLocal);

app.use('/',require('./routes'));



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})