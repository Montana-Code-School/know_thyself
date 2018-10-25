const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema for user model
const UserSchema = new Schema({
  email: {
    type: String, required: true,
    trim: true, unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
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
UserSchema.set('toJSON', {getters: true, virtuals: true});

UserSchema.statics.upsertGoogleUser = function(accessToken, refreshToken, profile, cb) {
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
        return cb(error, savedUser);
      });
      }
    else {
      return cb(err, user);
    }
  });
};

module.exports = mongoose.model('user', UserSchema)
