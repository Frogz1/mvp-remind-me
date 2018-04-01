const db = require('./models.js');
const faker = require('faker');
const moment = require('moment');


/*
task: String,
email: String,
reminderTime: Date,
expired: Boolean
*/


const fakerGenerator = (count) => {
  const result = [];
  for (let i = 0; i < count; i += 1) {
    const time = moment.utc();

    const reminder = {
      task: faker.lorem.sentence(),
      email: 'trevorold1@gmail.com',
      reminderTime: time.add(faker.random.number({ min: 5, max: 60 }), 's').format(),
      expired: false,
    };
    result.push(reminder);
  }
  return result;
};


db.Reminder.insertMany(fakerGenerator(10))
  .then((success) => {
    console.log(success);
    db.Reminder.db.close();
  })
  .catch((error) => {
    console.log(error);
    db.Reminder.db.close();
  });

