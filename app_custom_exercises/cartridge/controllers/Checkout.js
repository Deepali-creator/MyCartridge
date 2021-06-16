'use strict'

var server = require('server');
server.extend(module.superModule);

server.get('', function(req, res, next)
{
    res.render('checkout');
    next();
})

module.exports = server.exports();