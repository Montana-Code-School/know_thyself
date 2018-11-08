const mongoose = require('mongoose');
const Schema = mongoose.Schema;
<<<<<<< HEAD

const HabitSchema = new Schema({
  title: String,
  reps: String,
  initial: 0,
  complete: 0,
  finished: false,
  user: {type: Schema.Types.ObjectId, ref: 'user'}
})
s
module.exports = {
   habits: mongoose.model('entry', HabitSchema)
=======
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
  } else {
    this.modifiedAt = new Date()
    this.difference = Math.ceil(Math.abs(this.modifiedAt.getTime() - this.createdAt.getTime()) / (1000 * 3600 * 24))
    if (this.checked[this.checked.length - 1] !== this.difference - 1) {
      this.checked.push(this.difference - 1)
    }
  }
  return next()
})

module.exports = {
   habit: mongoose.model('habit', HabitSchema)
>>>>>>> af0c5b03b6a7c3e868854cc2b64e0d94bc5f7595
 }
