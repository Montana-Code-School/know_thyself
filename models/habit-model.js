const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dateFormat = require('dateformat')


const HabitSchema = new Schema({
  title: String,
  reps: Number,
  initial: 0,
  complete: 0,
  createdAt: Date,
  modifiedAt: Date,
  difference: 0,
  checked: [],
  finished: false,
  user: {type: Schema.Types.ObjectId, ref: 'user'}
})

HabitSchema.pre('save', function(next) {
  if (this.isNew) {
    this.createdAt = new Date()
    this.difference = 0
  } else {
    this.modifiedAt = new Date()
    this.difference = Math.floor(Math.abs(this.modifiedAt.getTime() - this.createdAt.getTime()) / (1000 * 3600 * 24))
  }
  return next()
})

module.exports = {
   habit: mongoose.model('habit', HabitSchema)
 }
