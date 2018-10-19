const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
  title: {type: Schema.Types.ObjectId, ref: 'prompt'},
  body: String,
  user: {type: Schema.Types.ObjectId, ref: 'user'},
  date: String
})

const PromptSchema = new Schema({
  body: String
})

module.exports = {
   entry: mongoose.model('entry', EntrySchema),
   prompt: mongoose.model('prompt', PromptSchema)
 }
