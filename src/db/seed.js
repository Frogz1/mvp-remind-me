const Reminder = require('./models.js');
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
      email: faker.internet.email(),
      reminderTime: time.add(faker.random.number({ min: 5, max: 60 }), 'minutes').format(),
      expired: false,
    };
    result.push(reminder);
  }
  return result;
};

Reminder.insertMany(fakerGenerator(50))
  .then((success) => {
    console.log(success);
    Reminder.db.close();
  })
  .catch((error) => {
    console.log(error);
    Reminder.db.close();
  });

