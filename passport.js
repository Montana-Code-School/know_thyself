'use strict';

require('./models/user-model');
const passport = require('passport');
const User = require('mongoose').model('user');
const GoogleTokenStrategy = require('passport-google-token').Strategy;

//here a user is exported, see the user schema in user-model, from the google
//response on the front end, a new GoogleTokenStrategy is created
//here where we can use the google the posted response from login,
// with profile id to search our db for a user, when we make a new user
//we include google profile id in our schema. move back to index.js

module.exports = function () {
  const googOpts = {
    callbackURL: '/auth/google/redirect',
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  }
  passport.use(new GoogleTokenStrategy(googOpts,
    function (accessToken, refreshToken, profile, done) {
      User.upsertGoogleUser(accessToken, refreshToken, profile, function(err, user) {
        console.log(user, "in passport")
        return done(err, user);
      });
    }));
};
