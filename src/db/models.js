const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/remindMe');

const Reminder = mongoose.model('Reminder', {
  task: String,
  email: String,
  reminderTime: Date,
  expired: Boolean,
});

module.exports = Reminder;
