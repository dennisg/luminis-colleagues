'use strict';

var express = require('express');


var start = function(req, res) {
	console.log('start check');
	res.sendStatus(200);		
}

var stop = function(req, res) {
	console.log('stop check');
	res.sendStatus(200);	
}

var health = function(req, res) {
	console.log('health check');
	res.sendStatus(200);
}

module.exports = function() {

  var router = express.Router();

  router.use(bodyParser.json());

	router.get('/start' , start);
	router.get('/stop'  , stop);
	router.get('/health', health);

	return router;
};