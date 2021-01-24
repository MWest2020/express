const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require("./models/user");

//Workshop
const passport = require('passport');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(session);

passport.serializeUser((user, done) =>{done(null, users._id)}
);

passport.deserializeUser(( value, done ) => {
  User.findById(userId, (err, user) => {
    done(err, user);
  });
});





const routes = require('./routes/index');
const { findById } = require('./models/user');







const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// mongodb connection
mongoose.connect("mongodb://localhost:27017/bookworm-oauth");
const db = mongoose.connection;





//Session config for Passport and MongoDB
const sessionOptions = {
  secret: "this is a super-super secret. Like REALLY secret",
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: db
  })
};

app.use(session(sessionOptions));

//Initialize Passport
app.use(passport.initialize());

//Restore Passport session(restores prev session)
app.use(passport.session());






// mongo error
db.on('error', console.error.bind(console, 'connection error:'));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
