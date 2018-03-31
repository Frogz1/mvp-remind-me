const express = require('express');
const db = require('../db/models');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('public'));

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

app.listen(PORT, () => console.log(`listening on ${PORT}`));
