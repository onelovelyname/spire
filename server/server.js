var express = require('express');
var app = express();

var middleware = require('./config/middleware.js');
var db = require('./db.js');

var job = require('./config/cron.js');

middleware(app, express);

module.exports = app;

job.start();
