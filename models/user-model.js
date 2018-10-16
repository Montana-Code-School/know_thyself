const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//schema for user model
const userSchema = new Schema({
  username: String,
  //so we can see if they have been to website before, and retrieve record, they login with this id
  googleId: String
})

const User = mongoose.model('user', userSchema);

module.exports = User;
