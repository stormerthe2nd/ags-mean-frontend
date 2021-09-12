require("dotenv").config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const indexRouter = require('./routes/index');
const postApiRouter = require("./routes/postApi")
const productRouter = require("./routes/product")
const { DB_URL, GOOGLE_APPLICATION_CREDENTIALS } = process.env
var app = express();


// google drive api setup
const { google } = require("googleapis")
const auth = new google.auth.GoogleAuth({
  KeyFile: GOOGLE_APPLICATION_CREDENTIALS,
  scopes: [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/drive.appdata",
    "https://www.googleapis.com/auth/drive.scripts",
    "https://www.googleapis.com/auth/drive.metadata"
  ]
})
const drive = google.drive({
  version: "v3",
  auth: auth
})

// database setup
const mongoose = require("mongoose")
mongoose.connect(DB_URL, {
  useNewUrlParser: true, useUnifiedTopology: true,
  useCreateIndex: true, useFindAndModify: false
}).then(() => console.log("database connected"))
  .catch((err) => console.log(err));

// express app  essentials
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept")
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE,OPTIONS")
  next()
})

// binding routers to path
app.use('/', indexRouter);
app.use("/postApi", (req, res, next) => { req.drive = drive; req.files = []; next() }, postApiRouter)
app.use('/product', productRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.redirect('/');
});

module.exports = app;
