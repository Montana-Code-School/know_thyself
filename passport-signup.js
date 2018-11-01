const User = require ('./models/user-local')
const PassportLocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

//return passport local strategy Object
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    _id: mongoose.Types.ObjectId(),
    email: email.trim(),
    password: password.trim(),
  };

  const newUser = new User(userData);
  newUser.save((err, user) => {
    if (err) { return done(err); }
    const payload = {
        sub: user._id
      }
    const token = jwt.sign(payload, process.env.SOME_OTHER_SECRET);
    return done(null, token);
  });
});
