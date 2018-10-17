const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//schema for user model
const userSchema = new Schema({
  username: String,
  //so we can see if they have been to website before, and retrieve record, they login with this id
  googleId: String,
  goals: [],
  habits: [],
  entries: [{type: Schema.Types.ObjectId, ref: 'entry'}]
})

const entrySchema = new Schema({
  title: {type: Schema.Types.ObjectId, ref: 'prompt'},
  body: String,
  user: {type: Schema.Types.ObjectId, ref: 'user'}
})

const promptSchema = new Schema({
  body: String
})

module.exports = {
   user: mongoose.model('user', userSchema),
   entry: mongoose.model('entry', entrySchema),
   prompt: mongoose.model('prompt', promptSchema)
 }
