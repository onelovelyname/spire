var express = require('express');
var middleware = require('./config/middleware.js');
var app = express();
var job = require('./config/cron.js');

middleware(app, express);

var db = require('./db.js');

module.exports = app;

job.start();
