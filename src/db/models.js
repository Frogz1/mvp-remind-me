require('dotenv').config();
const mongoose = require('mongoose');
const moment = require('moment');

const CONN_STRING = process.env.MONGO || 'mongodb://127.0.0.1:27017/remindMe';
mongoose.connect(CONN_STRING);

const Reminder = mongoose.model('Reminder', {
  task: String,
  email: String,
  reminderTime: Date,
  expired: Boolean,
});

const insertReminder = (reminder) => {
  return Reminder
    .collection
    .insertOne(reminder);
};

const findRemindersEndingSoon = () => {
  const time = moment.utc();
  return Reminder
    .find({
      reminderTime: { $gt: time.add(1, 's').format() },
    });
};
/*
{ _id: 5abff1730250ba4ce3e3c5d4,
    task: 'Alias libero consequatur necessitatibus in.',
    email: 'Kiera.Miller@hotmail.com',
    reminderTime: 2018-03-31T20:59:07.000Z,
    expired: false,
    __v: 0 },
  { _id: 5abff1730250ba4ce3e3c5d5,
    task: 'Atque recusandae pariatur cum.',
    email: 'Marisa.Ortiz24@hotmail.com',
    reminderTime: 2018-03-31T20:51:07.000Z,
    expired: false,
    __v: 0 },
    */

const momentTester = () => {
  // To determine if need to send an e-mail alert
  // 1. Every 10 seconds go through reminderTimes and perform:
  // moment(reminderTime).fromNow()
  // if value returned is "in a few seconds", trigger alert
};


module.exports = { Reminder, insertReminder, findRemindersEndingSoon };
