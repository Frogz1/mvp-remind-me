const express = require('express');
const db = require('../db/models');
const bodyParser = require('body-parser');

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
  const reminder = {
    task: req.body.task,
    email: req.body.email,
    reminderTime: req.body.reminderTime,
  };
  db.insertReminder(reminder)
    .then(data => res.send(data))
    .catch(error => res.send(error));
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
