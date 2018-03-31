const mongoose = require('mongoose');
const moment = require('moment');

mongoose.connect('mongodb://127.0.0.1:27017/remindMe');

const Reminder = mongoose.model('Reminder', {
  task: String,
  email: String,
  reminderTime: Date,
  expired: Boolean,
});

const insertReminder = (reminder) => {
  Reminder
    .collection
    .insertOne(reminder)
    .then((data) => {
      console.log(data);
    })
    .catch(error => console.error(error));
};

const findRemindersEndingSoon = () => {
  const time = moment.utc();
  return Reminder
    .find({
      reminderTime: { $gt: time.subtract(60, 'h').format() },
    });
};

module.exports = { Reminder, insertReminder, findRemindersEndingSoon };
