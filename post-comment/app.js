require("dotenv").config
var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user/userRouter');
var postRouter = require('./routes/post/postRouter')
var commentRouter = require("./routes/comment/commentRouter")

mongoose.connect(process.env.MONGO_DB)
.then(()=>{
  console.log("MONGODB CONNECT")
})
.catch((e) =>{
  console.log(e)
});

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/post', postRouter);
app.use('/api/comment', commentRouter);


app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
