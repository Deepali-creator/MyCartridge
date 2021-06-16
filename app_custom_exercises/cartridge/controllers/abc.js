'use strict';

var server = require('server');
var OrderMgr = require('dw/order/OrderMgr');
var Order = require('dw/order/Order');
var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var Logger = require('dw/system/Logger');
var Transaction = require('dw/system/Transaction');

var token;
var OrderNoList ='';

server.get('Start', function (req, res, next) {
    
    res.print('Hello');
    getAccessToken.call();

    var orderList = OrderMgr.queryOrders("custom.shipped = false or custom.shipped = null ",null,OrderMgr);
    Logger.warn("Order List :  "+orderList.getCount());

    Transaction.wrap(function()
    {

    
        while(orderList.hasNext())
        {
            var Order = orderList.next();
            Logger.warn("Order No :  "+Order.orderNo);
            OrderNoList+=Order.orderNo+',';
            Order.custom.shipped= true;
        }

    });

    Logger.warn('Order numbers list:  '+OrderNoList);

    postOrder.call();
    next();

});


var getAccessToken = LocalServiceRegistry.createService('GetAccessTokenServiceD', {
    createRequest: function (svc, args) {
        var url =svc.getConfiguration().getCredential().getURL();
        var user = svc.getConfiguration().getCredential().getUser();
        var password = svc.getConfiguration().getCredential().getPassword();
        
        Logger.warn('url:'+url);
        Logger.warn('user:'+user);
        Logger.warn('password:'+password);

        svc.setRequestMethod('POST');
        svc.setURL(url+'?grant_type=password&client_id=3MVG9fe4g9fhX0E5BsMRUVoSZD_4K.ZqQinWpVTb6.aA2sfXdTWKi80svlsnFlGjoMTF6R3DaWr3qBMF.iV.X&client_secret=299ACF24DD39AF22F527E85DC4CBEF4453FA301BCC7E07262CEC054D7B039487&username='+user+'&password='+password+'JM89jHkTmcniP5EUgddK1oln');        

    },
    parseResponse:function (svc, output){
        var obj=JSON.parse(output.text);
        token=obj.access_token;
        Logger.warn('token:'+token);
        return output;
    }     
    
});

server.get('Show',function (req, res, next) {
    var svcResult = getAccessToken.call();
    res.print(svcResult);
    res.print(token);
    if (svcResult.status === 'OK') {
        res.print('</br><h1>Helloooo</h1></br></body></html>');
    }
    else
    {
        res.print('<h1>Hello world</h1></body></html>');
    } 
    next();
	 
});



var postOrder = LocalServiceRegistry.createService('getOrderServiceD', {
    createRequest: function (svc,args) {
        var url =svc.getConfiguration().getCredential().getURL();
        Logger.warn('url-:'+url);
        svc.setRequestMethod('POST');
        svc.addHeader('Authorization', 'Bearer '+token);
        svc.addHeader('Content-Type', 'application/json;charset=UTF-8');
        svc.setURL(url);
        svc.setEncoding('Done');
        
        svc.addParam("OrderNo",OrderNoList);
        
    },
    parseResponse:function (svc, output) {
        Logger.warn(output.text);
        return output;
    }
});




module.exports = {
    getAccessToken: getAccessToken
}

module.exports = server.exports();
    
