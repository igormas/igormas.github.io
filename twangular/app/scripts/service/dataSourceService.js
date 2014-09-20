(function (angular) {
    'use strict';

    var dataSourceService = [
        '$http',
        function ($http) {
            var self = this;

            self.logInWithTwitter = function(){
                var oauthReqTokenUrl = 'http://api.twitter.com/oauth/request_token';
                var headers = {
                    Authorization:{
                        'OAuth oauth_callback':"http%3A%2F%2Flocalhost%2Fsign-in-with-twitter%2F",
                        oauth_consumer_key:"cChZNFj6T5R0TigYB9yd1w",
                        oauth_nonce:"ea9ec8429b68d6b77cd5600adbbb0456",
                        oauth_signature:"F1Li3tvehgcraF8DMJ7OyxO4w9Y%3D",
                        oauth_signature_method:"HMAC-SHA1",
                        oauth_timestamp:"1318467427",
                        oauth_version:"1.0"
                    }
                };


/*                var prom = $http({
                    url: oauthReqTokenUrl,
                    method:"POST",
                    headers: {
                        'Authorization': 'Basic dGVzdDp0ZXN0',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });*/
                /*.post(oauthReqTokenUrl,undefined,{headers: headers});*/
                var prom = $http.post(oauthReqTokenUrl,undefined,{headers: headers});
                prom.then(function(res){

                });
            };
        }
    ];
    angular.module('twangular').service('dataSourceService', dataSourceService);
})(angular);