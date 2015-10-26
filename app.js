const express = require('express');
const appengine = require('./libs/appengine.js');

const app = express();

app.disable('etag');
app.set('trust proxy', true);

app.use(express.static('dist'));
app.use('/_ah', appengine);


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
