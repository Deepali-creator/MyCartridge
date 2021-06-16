

























































/*var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var Logger = require('dw/system/Logger');

var salesforceApiService = LocalServiceRegistry.createService('SalesforceIntegration', {
    createRequest: function (svc, params) {
        var url =svc.getConfiguration().getCredential().getURL();
        var user = svc.getConfiguration().getCredential().getUser();
        var password =svc.getConfiguration().getCredential().getPassword();
        
        password = password+'';
        Logger.warn('url:'+url);
        Logger.warn('user:'+user);
        Logger.warn('password:'+password);
        svc.setRequestMethod('POST');
        svc.setURL(url+'?grant_type=password&client_id=3MVG9fe4g9fhX0E5BsMRUVoSZDyQQ59WkzggoLMJs.4JarbJpCo3WImhyXDXRS8Gx5AjkbSZwNFrtQiyDt2ZU&client_secret=3BB61C9B3973FE9486460FDA7E8ED220279E451C519E1DA5F007DC61E57A5504&username='+user+'&password='+password+'FPtN48gTl3d9ZEfUW8B5Mw8Z');        
    },
    parseResponse: function (svc, httpClient) {
       var result;

        try {
            result = JSON.parse(httpClient.text);
           
        } catch (e) {
            result = httpClient.text;
        }
        return result;
        

       /* var obj=JSON.parse(output.text);
        token=obj.access_token;
        Logger.warn('token:'+token);
        return output;
        */
 //   }
//});

/*module.exports = {
    salesforceApiService: salesforceApiService
}
*/











