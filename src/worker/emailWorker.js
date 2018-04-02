require('dotenv').config();
const nodemailer = require('nodemailer');
const moment = require('moment');
const { findRemindersEndingSoon } = require('../db/models');


// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing

// create reusable transporter object using the default SMTP transport
const poolConfig = 'smtps://trevoroldReminderBot@gmail.com:hackreactord@smtp.gmail.com/?pool=true';
// const transporter = nodemailer.createTransport(poolConfig);
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'trevoroldreminderbot@gmail.com', // generated ethereal user
    pass: 'hackreactor', // generated ethereal password
  },
  tls: {
    ciphers: 'SSLv3',

  },
});


// setup email data with unicode symbols
const sendReminder = (reminder) => {
  const reminderMail = {
    from: '"Trevor Old" <trevoroldreminderbot@gmail.com>', // sender address
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
        console.log(`sent reminder for ${reminder}`);
      });
    })
    .catch(error => error);
};


// send mail with defined transport object

module.exports = { sendReminders };
