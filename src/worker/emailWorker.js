require('dotenv').config()
const nodemailer = require('nodemailer');


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
const mailOptions = {
  from: '"MVP 👻" <trevoroldReminderBot@gmail.com>', // sender address
  to: 'trevorold1@gmail.com', // list of receivers
  subject: 'Hello ✔', // Subject line
  text: 'Hello world Email', // plain text body
  html: '<b>Hello world?</b>', // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Message sent: %s', info.messageId);
});

console.log(process.env.EMAIL)