const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
 }
