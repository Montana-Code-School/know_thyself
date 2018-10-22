const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
  title: String,
  body: String,
  user: {type: Schema.Types.ObjectId, ref: 'user'},
  createdAt: Date,
  modifiedAt: Date
})

EntrySchema.pre('save', function(next) {
  if (this.isNew) {
    this.createdAt = new Date()
  } else {
    this.modifiedAt = new Date()
  }
  return next()
})

const PromptSchema = new Schema({
  body: String
})

module.exports = {
   entry: mongoose.model('entry', EntrySchema),
   prompt: mongoose.model('prompt', PromptSchema)
 }
