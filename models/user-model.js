const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

//schema for user model
const UserSchema = new Schema({
  email: {
    type: String, required: true,
    trim: true, unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  password: {
    type: String, required: true
  },
  googleProvider: {
    type: {
      id: String,
      token: String
    },
    select: false
  },
  goals: [],
  habits: [],
  entries: [{type: Schema.Types.ObjectId, ref: 'entry'}]
})

//check if user has been to site before, if not make a new profile
//with information from google response, including profile object
//returns user, used in passport.js.
UserSchema.set('toJSON', {getters: true, virtuals: true});

UserSchema.statics.upsertGoogleUser = function(accessToken, refreshToken, profile, cb) {
  console.log("user-model")
  let that = this;
  return this.findOne({
    'googleProvider.id': profile.id
  }, function(err, user) {
      // no user was found, lets create a new one
    if (!user) {
      let newUser = new that({
        fullName: profile.displayName,
        email: profile.emails[0].value,
        googleProvider: {
          id: profile.id,
          token: accessToken
        }
      });
      newUser.save(function(error, savedUser) {
        if (error) {
          console.log(error);
        }
        console.log("saving new user in user-model")
        return cb(error, savedUser);
      });
      }
    else {
      console.log("return user")
      return cb(err, user);
    }
  });
};

//compare passed password with value in database
UserSchema.methods.comparePassword = function comparePassword(password, callback)
 { bcrypt.compare(password, this.password, callback);
};
//pre-save hook
UserSchema.pre('save', function(next){
  const user = this;

  //proceed further if the user is new
  if (user.isNew) {
    console.log("new user")
  }

  return bcrypt.genSalt((saltError, salt) => {
    console.log("Insalt")
    if (saltError) {return next(saltError) }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      console.log("in hash")
      if (hashError) {return next(hashError) }

      //hash Password
      user.password = hash;

      return next();
    });
  });
});

//need to change user to lowercase user in user-local refs
module.exports = mongoose.model('user', UserSchema)
