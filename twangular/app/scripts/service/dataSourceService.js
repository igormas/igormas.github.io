(function (angular) {
    'use strict';

    var dataSourceService = [
        '$http',
        function ($http) {
            var self = this;

            self.logInWithTwitter = function(){
                var oauthReqTokenUrl = 'https://api.twitter.com/oauth/request_token';
                var headers = {
                    Authorization: 'OAuth ' +
                        'oauth_nonce="' + (new Date()).getTime() + '", ' +
                        'oauth_callback="http%3A%2F%2Fmyapp.com%3A3005%2Ftwitter%2Fprocess_callback", ' +
                        'oauth_signature_method="HMAC-SHA1", ' +
                        'oauth_timestamp="' + (new Date()).getTime() + '", ' +
                        'oauth_consumer_key="jdoHhwX1IjmMvZanpSU5TxSyK", ' +
                        'oauth_signature="Pc%2BMLdv028fxCErFyi8KXFM%2BddU%3D", ' +
                        'oauth_version="1.0"'
                    };
/*
                var data = {
                    oauth_callback: "//http%3A%2F%2Figormas.github.io%2Ftwangular%2Fapp%2Findex.html",
                    oauth_consumer_key:"L8qq9PZyRg6ieKGEKhZolGC0vJWLw8iEJ88DRdyOg",
                    oauth_nonce:"ea9ec8429b68d6b77cd5600adbbb0456",
                    oauth_signature:"F1Li3tvehgcraF8DMJ7OyxO4w9Y%3D",
                    oauth_signature_method:"HMAC-SHA1",
                    oauth_timestamp:"1318467427",
                    oauth_version:"1.0"
                };*/

                var prom = $http({
                    url:oauthReqTokenUrl,
                    method: 'POST',
                    headers: headers

                });
                prom.then(function(res){

                });
            };
        }
    ];
    angular.module('twangular').service('dataSourceService', dataSourceService);
})(angular);