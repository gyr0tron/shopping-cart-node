var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

//setup csrf protection
var csrfProtection = csrf();
router.use(csrfProtection);

// User management: signup
router.get('/signup', function (req, res, next) {
  var messages = req.flash('error');
  res.render('user/signup', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));

// User management: signin
router.get('/signin', function (req, res, next) {
  var messages = req.flash('error');
  res.render('user/signin', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
});

router.post('/signin', passport.authenticate('local.signin', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true
}));

// User profile route
router.get('/profile', function (req, res, next) {
  res.render('user/profile');
});

module.exports = router;