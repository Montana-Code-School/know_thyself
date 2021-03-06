const express = require('express');
const router = express.Router();
const passport = require('passport');
const request = require('request');
const { generateToken, sendToken } = require('../utils/token-utils');

require('../passport')();
//first thing first, passport is invoked, see passport.js.
//here we recieve the request from login,
// we have access to the whole request inlcuding the user object and
//access token. we get our token from token utils
//and send it back up to the front end in login.js
router.route('/auth/google')
  .post(passport.authenticate('google-token', {session: false}),
  function(req, res, next) {
    if (!req.user) {
      return res.send(401, 'User Not Authenticated');
    }
    req.auth = {
      id: req.user.id
    };
    next();
  }, generateToken, sendToken);

module.exports = router;
