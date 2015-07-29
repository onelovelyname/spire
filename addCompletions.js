var appController = require('server/app/appController.js');

console.log('If you see this message, the scheduled Heroku job works!');
appController.createRecurringHabitCompletion();
