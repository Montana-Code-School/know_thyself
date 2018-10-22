'use strict';

require('./models/user-model')
const passport = require('passport');
const User = require('mongoose').model('user');
const GoogleTokenStrategy = require('passport-google-token').Strategy;

module.exports = function () {
  const googOpts = {
    callbackURL: '/auth/google/redirect',
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  }

    passport.use(new GoogleTokenStrategy(googOpts,
        function (accessToken, refreshToken, profile, done) {
            User.upsertGoogleUser(accessToken, refreshToken, profile, function(err, user) {
                return done(err, user);
            });
        }));
};
