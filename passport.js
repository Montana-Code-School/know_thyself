'use strict';

require('./models/user-model')
const passport = require('passport');
const User = require('mongoose').model('user');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const config = require('./config/config');

module.exports = function () {
    passport.use(new GoogleTokenStrategy({
            clientID: config.googleAuth.clientID,
            clientSecret: config.googleAuth.clientSecret
        },
        function (accessToken, refreshToken, profile, done) {
            User.upsertGoogleUser(accessToken, refreshToken, profile, function(err, user) {
                return done(err, user);
            });
        }));
};
