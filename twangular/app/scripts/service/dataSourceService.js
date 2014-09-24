(function (angular) {
    'use strict';

    var dataSourceService = [
        '$http','$location',
        function ($http,$location) {
            var self = this;
            var oauth = OAuth({
                consumer: {
                    public: 'SiFGAL0RUuMzMhVh4hdrxuKn4',
                    secret: 'ivAkxlSk25cE6ZXJikBPHFKXnD1CJKttUjMMRv7iKjmH9RdbB0'
                }
            });
            function queryStringParamToobject(str){
                var strArr = str.split('&');
                var queryObj = {};
                for(var i in strArr){
                    var item = strArr[i];
                    item = item.split('=');
                    queryObj[item[0]] = item[1];
                }
                return queryObj;
            }

            function redirectToTwitterLogin(res){
                var resObject = queryStringParamToobject(res.data);
                window.location.assign("https://api.twitter.com/oauth/authenticate?oauth_token=" + resObject.oauth_token);
            }
            self.logInWithTwitter = function(){
                var request_data = {
                    url: 'https://api.twitter.com/oauth/request_token',
                    method: 'POST',
                    data: {
                        oauth_callback: "http://igormas.github.io/twangular/app/index.html"
                    }
                };
                var headers = oauth.toHeader(oauth.authorize(request_data));
                var prom = $http.post(request_data.url,undefined,{headers: headers});
                prom.then(function(res){
                    redirectToTwitterLogin(res);
                });
            };

            var accessTokens;
            var search;
            self.accessToken = function(){
                var absUrl = $location.absUrl();
                var indexofQMark = absUrl.indexOf('?');
                var searchStr = absUrl.slice(indexofQMark+1,absUrl.length-2);
                search = queryStringParamToobject(searchStr);

                var request_data = {
                    url: 'https://api.twitter.com/oauth/access_token',
                    method: 'POST',
                    data: {
                        oauth_token: search.oauth_token,
                        oauth_verifier: search.oauth_verifier
                    }
                };
                var headers = oauth.toHeader(oauth.authorize(request_data));
                /*headers.oauth_verifier = search.oauth_verifier;*/
                var prom = $http.post(request_data.url,undefined,{headers: headers});
                return prom.then(function(res){
                    accessTokens = queryStringParamToobject(res.data);
                    return accessTokens;
                },
                function(){
                    $location.path('/login');
                });
            };

            self.searchForTweets = function(query){
                var request_data = {
                    url: 'https://api.twitter.com/1.1/search/tweets.json',
                    method: 'GET',
                    data: {
                        oauth_token: accessTokens.oauth_token
                    }
                };
                var headers = oauth.toHeader(oauth.authorize(request_data));
                var params = {};
                params.count = 20;
                params.q = query;
                return $http.get(request_data.url,{params: params,headers: headers});
            }
        }
    ];
    angular.module('twangular').service('dataSourceService', dataSourceService);
})(angular);

//my implemention
/*            function myImp(){
 //my App
 function nonceGenerator(){
 var nonce = '';
 for (var i = 0; i < 41 ; i++) {
 var character = Math.floor(Math.random() * 61);
 nonce += "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".substring(character, character + 1);
 }
 return nonce;
 }
 var currTimeStamp = '' + (new Date()).getTime();
 var url = 'https://api.twitter.com/oauth/request_token';
 var httpMethod = 'POST';
 var consumerSecret = 'ivAkxlSk25cE6ZXJikBPHFKXnD1CJKttUjMMRv7iKjmH9RdbB0';
 var parameters = {
 oauth_callback: "http://igormas.github.io/twangular/app/index.html",
 oauth_consumer_key: "SiFGAL0RUuMzMhVh4hdrxuKn4",
 oauth_nonce: nonceGenerator(),
 oauth_signature_method: "HMAC-SHA1",
 oauth_timestamp: currTimeStamp,
 oauth_version: "1.0"
 };
 parameters.oauth_signature = generateSignature(parameters,httpMethod,url,consumerSecret);

 var paramsArr = [];
 for(var prop in parameters){
 paramsArr.push(prop);
 }
 paramsArr.sort();

 var oauthHeader = 'OAuth';
 for(var i in paramsArr){
 var prop = paramsArr[i];
 oauthHeader += ' ' + encodeStr(prop) + '=' + '"' + encodeStr(parameters[prop]) + '",';
 }
 oauthHeader = oauthHeader.slice(0,oauthHeader.length-1);
 console.log(oauthHeader);

 var headers = {
 Authorization: oauthHeader
 };

 var prom = $http({
 url: url,
 method: httpMethod,
 headers: headers
 });
 }*/