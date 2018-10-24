'use strict';

require('./models/user-model')
const passport = require('passport');
const User = require('mongoose').model('user');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const config = require('./config/config');

module.exports = function () {
  const googOpts = {
    callbackURL: '/auth/google/redirect',
    clientID: process.env.CLIENT_ID || config.googleAuth.clientID,
    clientSecret: process.env.CLIENT_SECRET || config.googleAuth.clientSecret
  }

    passport.use(new GoogleTokenStrategy(googOpts,
        function (accessToken, refreshToken, profile, done) {
          console.log("---------Google Strategy Passport------------")
            User.upsertGoogleUser(accessToken, refreshToken, profile, function(err, user) {
                return done(err, user);
            });
        }));
};
