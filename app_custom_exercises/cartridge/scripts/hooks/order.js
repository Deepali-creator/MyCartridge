'use strict';

var server = require('server');
var OrderMgr = require('dw/order/OrderMgr');
var Order = require('dw/order/Order');
var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var Logger = require('dw/system/Logger');
var Transaction = require('dw/system/Transaction');

var token;
var OrderNoList ='';

function send(){
    
  
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
    

}


var getAccessToken = LocalServiceRegistry.createService('GetAccessTokenServiceD', {
    createRequest: function (svc, args) {
        var url =svc.getConfiguration().getCredential().getURL();
        var user = svc.getConfiguration().getCredential().getUser();
        var password = svc.getConfiguration().getCredential().getPassword();
        
        Logger.warn('url:'+url);
        Logger.warn('user:'+user);
        Logger.warn('password:'+password);

        svc.setRequestMethod('POST');
        svc.setURL(url+'?grant_type=password&client_id=3MVG9fe4g9fhX0E5BsMRUVoSZDxiPg3nWhxxLPZExgmEE4gZ7kTTcAxtSpUdPNoZpjBW5q0bkPqr8nDPbBmvr&client_secret=ECAEF4212A375CAC654E7EE720A2FEEE4DE355B286C7F1E556034C4A5F4C34BB&username='+user+'&password='+password+'JM89jHkTmcniP5EUgddK1oln');        

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
    send: send
}


    
