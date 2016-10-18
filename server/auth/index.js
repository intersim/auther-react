'use strict';

var router = require('express').Router();
var User = require('../api/users/user.model');

router.post('/login', function (req, res, next) {
  User.findOne({
    where: req.body
  })
  .then(function (user) {
    if (!user) {
      throw new HttpError(401, 'User not found');
    } else {
    	console.log("LOGGED IN???");
      req.session.userId = user.id;
      // req.session.save(function(err) {
      // 	if (err) return console.log("Problem saving session: ", err);

	     //  console.log("SESSION", req.session);
      // });
			res.json(user);
    }
  })
  .catch(next);
});

router.post('/signup', function (req, res, next) {
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

router.get('/logout', function (req, res, next) {
  delete req.session.userId;
  res.sendStatus(204);
});

router.get('/me', function (req, res, next) {
  if (!req.session.userId) return res.status(401).send('You must log in!');
  console.log('userId=', req.session.userId)
  User.findById(req.session.userId)
  .then(function(user) {
  	res.json(user);
  });
});

module.exports = router;