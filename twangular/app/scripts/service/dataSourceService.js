(function (angular) {
    'use strict';

    var dataSourceService = [
        '$http',
        function ($http) {
            var self = this;

            function encodeStr(str){
                return encodeURIComponent(str).replace('!','%21');
            }

            function generateSignature(params,httpMethod,url,consumerSecret,OAuthTokenSecret){
                var paramsArr = [];
                for(var prop in params){
                    paramsArr.push(prop);
                }
                paramsArr.sort();

                var encodedParams = '';
                for(var i in paramsArr){
                    prop = paramsArr[i];
                    encodedParams += encodeStr(prop) + '=';
                    encodedParams += encodeStr(params[prop]);
                    if(i < paramsArr.length - 1){
                        encodedParams += '&';
                    }
                }
                var upperCaseHttpMethod = httpMethod.toUpperCase();
                var encodedUrl = encodeStr(url);
                var baseStr = upperCaseHttpMethod + '&' + encodedUrl + '&' + encodeStr(encodedParams);
                console.log(baseStr);
                var signingKey = encodeStr(consumerSecret) + '&' + (OAuthTokenSecret ? encodeStr(OAuthTokenSecret) : '');
                console.log(signingKey);
                var hash = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(baseStr,signingKey));
                console.log(hash);
                return hash;
            }

            self.logInWithTwitter = function(){
/*                //key F1Li3tvehgcraF8DMJ7OyxO4w9Y%3D
                var url = 'https://api.twitter.com/1/statuses/update.json';
                var httpMethod = 'POST';
                var consumerSecret = 'kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw';
                var OAuthTokenSecret = 'LswwdoUaIvS8ltyTt5jkRh4J50vUPVVHtR2YPi5kE';
                var parameters = {
                    status: 'Hello Ladies + Gentlemen, a signed OAuth request!',
                    include_entities: "true",
                    oauth_consumer_key: "xvz1evFS4wEEPTGEFPHBog",
                    oauth_nonce: 'kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg',
                    oauth_signature_method: "HMAC-SHA1",
                    oauth_timestamp: '1318622958',
                    oauth_token: '370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb',
                    oauth_version: "1.0"
                };
                generateSignature(parameters,httpMethod,url,consumerSecret,OAuthTokenSecret);*/
/*

                var url = 'https://api.twitter.com/oauth/request_token';
                var httpMethod = 'POST';
                var consumerSecret = 'L8qq9PZyRg6ieKGEKhZolGC0vJWLw8iEJ88DRdyOg';
                //var OAuthTokenSecret = 'LswwdoUaIvS8ltyTt5jkRh4J50vUPVVHtR2YPi5kE';
                var parameters = {
                    oauth_callback: "http%3A%2F%2Flocalhost%2Fsign-in-with-twitter%2F",
                    oauth_consumer_key: "cChZNFj6T5R0TigYB9yd1w",
                    oauth_nonce: 'ea9ec8429b68d6b77cd5600adbbb0456',
                    oauth_signature_method: "HMAC-SHA1",
                    oauth_timestamp: '1318467427',
                    oauth_version: "1.0"
                };

                var singleEncodedStr = generateSignature(parameters,httpMethod,url,consumerSecret);
*/
                var currTimeStamp = '' + (new Date()).getTime();
                var url = 'https://api.twitter.com/oauth/request_token';
                var httpMethod = 'POST';
                var consumerSecret = 'L8qq9PZyRg6ieKGEKhZolGC0vJWLw8iEJ88DRdyOg';
                //var OAuthTokenSecret = 'LswwdoUaIvS8ltyTt5jkRh4J50vUPVVHtR2YPi5kE';
                var parameters = {
                    oauth_callback: "http%3A%2F%2Flocalhost%3A9001%2Fapp%2Findex.html%23%2Flogin",
                    oauth_consumer_key: "v4hsgAnTCDe47oqiiswRn1APOewHPJ9P1zk48aJuWFLXNOWMiL",
                    oauth_nonce: currTimeStamp,
                    oauth_signature_method: "HMAC-SHA1",
                    oauth_timestamp: currTimeStamp,
                    oauth_version: "1.0"
                };
                parameters.oauth_signature = generateSignature(parameters,httpMethod,url,consumerSecret);

                var oauthHeader = 'OAuth';
                for(var prop in parameters){
                    oauthHeader += ' ' + encodeStr(prop) + '=' + '"' + parameters[prop] + '",';
                }
                oauthHeader = oauthHeader.slice(0,oauthHeader.length-1);
                console.log(oauthHeader);

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

                var prom = $http({
                    url: url,
                    method: 'POST',
                    headers: headers
                });
                prom.then(function(res){

                });

                $.ajax({
                    type: "POST",
                    url: url,
                    headers:{
                        'Authorization': oauthHeader,
                        'Accept': '*/*'
                    }
                });
            };

            self.searchForTweets = function(searchVal){

            };
        }
    ];
    angular.module('twangular').service('dataSourceService', dataSourceService);
})(angular);