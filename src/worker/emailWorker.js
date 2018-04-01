require('dotenv').config();
const nodemailer = require('nodemailer');
const moment = require('moment');
const { findRemindersEndingSoon } = require('../db/models');


// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    // || 'trevoroldReminderBot@gmail.com', // generated ethereal user
    pass: process.env.PASS,
    // || 'hackreactor', // generated ethereal password
  },
});

// setup email data with unicode symbols
const sendReminder = (reminder) => {
  const reminderMail = {
    from: '"MVP 👻" <trevoroldReminderBot@gmail.com>', // sender address
    to: `${reminder.email}`, // list of receivers
    subject: 'Hello ✔', // Subject line
    text: `${reminder.task}`, // plain text body
    html: `<b>A friendly reminder from mvp-remind-me: ${reminder.task} 🙌</b>`, // html body
  };
  transporter.sendMail(reminderMail, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
};

const sendReminders = () => {
  findRemindersEndingSoon()
    .then((data) => {
      const reminders = data.filter(value =>
        moment(value.reminderTime).fromNow() === 'in a few seconds');
      reminders.forEach((reminder) => {
        sendReminder(reminder);
      });
    })
    .catch(error => error);
};

sendReminders();
// send mail with defined transport object
