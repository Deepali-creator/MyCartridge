'use strict';

var server = require('server');

server.get('Start', function (req, res, next) {

	res.render('hello', {param1:"Hello from ISML"});
	
	next();
	
});

module.exports = server.exports();