'use strict';
var server = require('server');
var Logger = require('dw/system/Logger');
var BasketMgr = require('dw/order/BasketMgr');
var cartHelper = require('*/cartridge/scripts/cart/cartHelpers');
var CartModel = require('*/cartridge/models/cart');
var Transaction = require('dw/system/Transaction');
var URLUtils = require('dw/web/URLUtils');


server.get('Start', function (req, res, next)
{
    var productId=req.querystring.pid;
    var quantity=parseInt(1, 10);
    quantity=parseInt(req.querystring.quantity, 10);
    var result={};
    var currentBasket = BasketMgr.getCurrentOrNewBasket();
    if (currentBasket)
    {
     
     Logger.warn('BasketId'+currentBasket);
     Transaction.wrap(function () {
        result = cartHelper.addProductToCart(
            currentBasket,
            productId,
            quantity,
            2
        );

    });

   res.redirect(URLUtils.url('Cart-Show'));
 }

 next();
});
module.exports = server.exports();