var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const routes = require('./routes/');
const middlewars = require('./middlewars');
var app = express();

app.use(logger('dev'));
app.use(middlewars.unsupportedMediaTypes(['application/xml']));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const urls = routes.stack.filter(elem => elem.route.path === req.url)
  if (urls) {
    return next({status: 405, message: "Not Allowed"})
  }
  console.log(app._router.stack.filter((route) => route.name === 'router'));
  next({status: 404, message: "Not Found"});
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  console.log(err);
  res.status(err.status || 500);
  res.send({message: err.message});
});

module.exports = app;
