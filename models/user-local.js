const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

//schema for local-user model
const UserLocal = new Schema({
  email: {
    type: String, required: true
  },
  password: {
    type: String, required: true
  }
  // access: {
  //   token: String
  // }
})

//compare passed password with value in database
UserLocal.methods.comparePassword = function comparePassword(password, callback)
 { bcrypt.compare(password, this.password, callback);
};

//pre-save hook
UserLocal.pre('save', function(next){
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
module.exports = mongoose.model('User', UserLocal)
