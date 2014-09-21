(function (angular) {
    'use strict';

    var dataSourceService = [
        '$http',
        function ($http) {
            var self = this;

            self.logInWithTwitter = function(){
                var url = 'https://api.twitter.com/oauth/request_token';
                var currTimeInSeconds = (new Date()).getTime();
                var httpMethod = 'POST';
                var consumerSecret = 'L8qq9PZyRg6ieKGEKhZolGC0vJWLw8iEJ88DRdyOg';
                var parameters = {
                    oauth_callback: "http%3A%2F%2Flocalhost%2Fsign-in-with-twitter%2F",
                    oauth_consumer_key: "cChZNFj6T5R0TigYB9yd1w",
                    oauth_nonce: 'ea9ec8429b68d6b77cd5600adbbb0456',
                    oauth_signature_method: "HMAC-SHA1",
                    oauth_timestamp: '1318467427',
                    oauth_version: "1.0"
                };
                var encodedSignature = oauthSignature.generate(httpMethod, url, parameters,consumerSecret);
                console.log(encodedSignature);
                var signature = oauthSignature.generate(httpMethod, url, parameters,consumerSecret);
                console.log(signature);

                /*var headers = {
                    Authorization: 'OAuth ' +
                        'oauth_nonce="' + currTimeInSeconds + '", ' +
                        'oauth_callback="http%3A%2F%2Figormas.github.io%2Ftwangular%2Fapp%2Findex.html", ' +
                        'oauth_signature_method="HMAC-SHA1", ' +
                        'oauth_timestamp="' + currTimeInSeconds + '", ' +
                        'oauth_consumer_key="jdoHhwX1IjmMvZanpSU5TxSyK", ' +
                        'oauth_signature="' + ncodedSignature + '", ' +
                        'oauth_version="1.0"',
                    'Content-Type': 'application/x-www-form-urlencoded'
                };*/

                var headers = {
                    Authorization: 'OAuth ' +
                        'oauth_nonce="ea9ec8429b68d6b77cd5600adbbb0456", ' +
                        'oauth_callback="http%3A%2F%2Flocalhost%2Fsign-in-with-twitter%2F", ' +
                        'oauth_signature_method="HMAC-SHA1", ' +
                        'oauth_timestamp="1318467427", ' +
                        'oauth_consumer_key="cChZNFj6T5R0TigYB9yd1w", ' +
                        'oauth_signature="F1Li3tvehgcraF8DMJ7OyxO4w9Y", ' +
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

            self.searchForTweets = function(searchVal){

            };
        }
    ];
    angular.module('twangular').service('dataSourceService', dataSourceService);
})(angular);