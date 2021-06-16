'use strict';

var server = require('server');
server.extend(module.superModule);
var HookMgr = require('dw/system/HookMgr');



server.append('Confirm',function(req,res,next){

    res.print('Hello');
    HookMgr.callHook('app.order', 'send');
    next();
    
});

module.exports = server.exports();