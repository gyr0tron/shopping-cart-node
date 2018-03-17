var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

//setup csrf protection
var csrfProtection = csrf();
router.use(csrfProtection);

// User profile route
router.get('/profile', isLoggedIn, function (req, res, next) {
  res.render('user/profile');
});

router.get('/logout', isLoggedIn, function (req, res, next) {
  req.logout();
  res.redirect('/');
});

router.use('/', notLoggedIn, function(req, res, next) {
  next();
});

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

module.exports = router;

//logged in identifier middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

//not logged in identifier middleware
function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}