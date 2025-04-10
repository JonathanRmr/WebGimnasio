const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  activity: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  notes: {
    type: String
  }
});

module.exports = mongoose.model('Workout', workoutSchema);
