(function (angular,CryptoJS) {
    'use strict';

    var dataSourceService = [
        '$http',
        function ($http) {
            var self = this;

            self.logInWithTwitter = function(){
                var url = 'https://api.twitter.com/oauth/request_token';
                var oauth = OAuth({
                    consumer: {
                        public: 'SiFGAL0RUuMzMhVh4hdrxuKn4',
                        secret: 'ivAkxlSk25cE6ZXJikBPHFKXnD1CJKttUjMMRv7iKjmH9RdbB0'
                    },
                    signature_method: 'HMAC-SHA1'
                });

                var request_data = {
                    url: 'https://api.twitter.com/oauth/request_token',
                    method: 'POST',
                    data: {
                        oauth_callback: "http://igormas.github.io/twangular/app/index.html"
                    }
                };

                var headers = oauth.toHeader(oauth.authorize(request_data));

                function redirectToTwitterLogin(res){
                    var resArr = res.data.split('&');
                    var resObject = {};
                    for(var i in resArr){
                        var item = resArr[i];
                        item = item.split('=');
                        resObject[item[0]] = item[1];
                    }
                    window.location.assign("https://api.twitter.com/oauth/authenticate?oauth_token=" + resObject.oauth_token);
                }
                var prom = $http.post(url,undefined,{headers: headers});
                prom.then(function(res){
                    redirectToTwitterLogin(res);
                });
            };

            self.searchForTweets = function(searchVal){

            };
        }
    ];
    angular.module('twangular').service('dataSourceService', dataSourceService);
})(angular,CryptoJS);