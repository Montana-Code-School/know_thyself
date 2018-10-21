//passport library
const passport = require('passport');
//strategy to use google+
const GoogleStrategy = require('passport-google-oauth20');
const config = require('./config/config');
const User = require('./models/user-model');
//create cookie with id send it to browser
passport.serializeUser((user, done) => {
  done(null, user.id);
});
//when cookie comes back from browswer find user from id
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});
//2 parameters, strategy and...
passport.use(
  new GoogleStrategy({
  //options for google strategy
  callbackURL: '/auth/google/redirect',
  clientID: config.googleAuth.clientID,
  clientSecret: config.googleAuth.clientSecret
  //access token allows us to see users data
  //refresh token refreshes access, profile brings back profile info, done is done
  }, (accessToken, refreshToken, profile, done) => {
  //check if user already exists within db
  User.findOne({googleId: profile.id}).then((currentUser) => {
    if(currentUser){
      //already has the user
      console.log('user is:', currentUser);
      done(null, currentUser);
    } else {
      //if not, create user in db
  //...passport callback function to crete new instance of Schema
    console.log(profile);
    new User({
      //getting info to create User from Google info
      username: profile.displayName,
      googleId: profile.id,
    }).save().then((newUser) => {
      //save returns a promise, it's asynch so add .then
      console.log('new user created:' + newUser)
      done(null, newUser);
      })
    }
  })
  })
)
