var appController = require('app/appController.js');
var CronJob = require('cron').CronJob;

var job = new CronJob('0 0 0 * * *', function() {
  console.log('You will see this message every day');
  appController.createRecurringHabitCompletion();
}, null, false, 'America/Los_Angeles');

module.exports = job;
