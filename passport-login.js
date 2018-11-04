require('./models/user-model');
const passport = require('passport');
const PassportLocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken')
const User = require('./models/user-model')

module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
    const userData = {
      email: email.trim(),
      password: password.trim()
    };
    //find user by email address
    return User.findOne({email: userData.email }, (err, user) => {
      if (err) {return done(err); }
      if (!user) {
        const error = new Error('Incorrect email or password');
        error.name = 'IncorrectCredentialsError';
        return done(error);
      }
      //check if hashed user's password is in db
      return user.comparePassword(userData.password, (passwordErr, isMatch) => {
        if (err) { return  done(err); }
        if (!isMatch) {
          const error = new Error('Incorrect email or password');
          error.name = 'IncorrectCredentialsError';
          return done(error);
        }
        const payload = {
          sub: user._id
        };
        //create token string
        const token = jwt.sign(payload, process.env.SOME_OTHER_SECRET);
        return done(null, token);
      })
    })
}
);
