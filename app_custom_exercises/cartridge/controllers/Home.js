//This controller shows that the value can come before (prepend) or after (append) the route runs. 
'use strict';

var server = require('server');
//TODO inherit functionality with module.superModule by using the extend method
server.extend(module.superModule);

//TODO insert functionality before the Show Route using server.prepend
server.prepend('Show', function (req, res, next) {
    //TODO in the code below, get ViewDta from  res
    var viewData = res.getViewData(); 
    //TODO set a variable value in the code below as 'General Company Details, no promo at this time'
    viewData.noPromo = 'General Company Details';
    res.setViewData(viewData);
    next();
});


/*checks the query string for promo and the value after the question mark in the URL. 
If the query string does not have ?promo=1, then it appends the route with different promoInfo data. 
*/
//TODO modify the Show Route by adding functionality using server.append

server.append('Show', function (req, res, next) {

    if (req.querystring.promo != 1) {
        //TODO get the value  of noPromoParam from the viewData from the prepend route and load it on view data on variable promoInfo
        res.setViewData(
        { promoInfo: res.getViewData().noPromo }
        );
        res.render('home/homePage',{param1:res.getViewData().noPromo});

    }
    else {
        res.setViewData(
            { promoInfo: 'Home with Promo (All Bags for Sale this week).' }
        );
        var viewData = res.getViewData(); 
        res.render('home/homePage',{param1:viewData.promoInfo});
        
    }

    next();
});

module.exports = server.exports();
