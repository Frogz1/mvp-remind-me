require('dotenv').config();
const express = require('express');
const db = require('../db/models');
const bodyParser = require('body-parser');
const moment = require('moment');
const worker = require('../worker/emailWorker');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/v1/reminders', (req, res) => {
  db.findRemindersEndingSoon()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((error) => {
      res.statusCode = 404;
      res.send(`got ${error}`);
    });
});

app.post('/v1/reminders', (req, res) => {
  const time = moment.utc();
  const reminder = {
    task: req.body.task,
    email: req.body.email,
    reminderTime: moment(time.add(Number(req.body.reminderTime), 'm').format())._d,
    expired: false,
  };

  db.insertReminder(reminder)
    .then(data => res.send(data))
    .catch(error => res.send(error));
});
setInterval(() => {
  console.log('sending');
  worker.sendReminders();
}, 60000);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
