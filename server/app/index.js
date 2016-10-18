'use strict'; 

var app = require('express')();
var path = require('path');
var User = require('../api/users/user.model');
var session = require('express-session');
var HttpError = require('../utils/HttpError');

// app.use(session({
//   secret: 'secretissecret',
//   cookie: {}
// }));
// app.use(function (req, res, next) {
//   Object.defineProperty(req, 'session', {
//     set: function(newValue) {
//       console.log('will set session')
//       console.log('old session', this._sess)
//       console.log('new session', newValue)
//       this._sess = newValue
//     },
//     get: function() {
//       return this._sess
//     }
//   })
//   next()
// })

app.use(require('cookie-session')({
  name: 'session',
  keys: ['taco cat'],
}))

// place right after the session setup middleware
app.use(function (req, res, next) {
  //console.log('session', req.session);
  next();
});

app.use('/api', function (req, res, next) {
  if (!req.session.counter) req.session.counter = 0;
  console.log('counter', ++req.session.counter);
  next();
});

app.use(require('./logging.middleware'));
app.use(require('./request-state.middleware'));
app.use(require('./statics.middleware'));

app.use('/auth', require('../auth'));

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
