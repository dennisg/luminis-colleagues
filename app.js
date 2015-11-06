'use strict'

var express = require('express');
var appengine = require('./libs/appengine.js');
var app = express();


app.use('/_ah', appengine);
app.use(express.static('dist'));

// Basic error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

var server = app.listen(process.env.PORT || 8080, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});
