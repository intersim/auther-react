'use strict'; 

var app = require('express')();
var path = require('path');
var User = require('../api/users/user.model');
var session = require('express-session');
var HttpError = require('../utils/HttpError');

app.use(session({
  secret: 'secretissecret'
}));

// place right after the session setup middleware
app.use(function (req, res, next) {
  console.log('session', req.session);
  next();
});

// app.use('/api', function (req, res, next) {
//   if (!req.session.counter) req.session.counter = 0;
//   console.log('counter', ++req.session.counter);
//   next();
// });

app.use(require('./logging.middleware'));
app.use(require('./request-state.middleware'));
app.use(require('./statics.middleware'));

app.post('/login', function (req, res, next) {
  User.findOne({
    where: req.body
  })
  .then(function (user) {
    if (!user) {
      throw new HttpError(401, 'User not found');
    } else {
      req.session.userId = user.id;
      res.json(user);
    }
  })
  .catch(next);
});

app.post('/signup', function (req, res, next) {
  User.findOrCreate({
    where: req.body
  })
  .then(function (user) {
    if (!user) {
      throw new HttpError(500, 'Error creating user');
    } else {
      req.session.userId = user.id;
      res.json(user);
    }
  })
  .catch(next);
});

app.use('/api', require('../api/api.router'));

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'browser', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});

app.use(require('./error.middleware'));

module.exports = app;
