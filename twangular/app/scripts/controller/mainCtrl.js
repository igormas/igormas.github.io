(function (angular) {
    'use strict';

    var mainCtrl = [
        '$scope','dataSourceService',
        function ($scope,dataSourceService) {
            $scope.d = {};

            var oauth = new OAuth({
                consumer: {
                    public: 'xvz1evFS4wEEPTGEFPHBog',
                    secret: 'kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw'
                },
                signature_method: 'HMAC-SHA1'
            });

            var request_data = {
                url: 'https://api.twitter.com/oauth/request_token',
                method: 'POST',
                data: {
                    status: 'Hello Ladies + Gentlemen, a signed OAuth request!'
                }
            };

            var token = {
                public: '370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb',
                secret: 'LswwdoUaIvS8ltyTt5jkRh4J50vUPVVHtR2YPi5kE'
            };

            $.ajax({
                url: request_data.url,
                type: request_data.method,
                data: oauth.authorize(request_data, token)
            }).done(function(data) {
                //process your data here
            });

            $scope.d.twitterLogIn = function(){
                dataSourceService.logInWithTwitter();
            };
        }
    ];
    angular.module('twangular').controller('mainCtrl', mainCtrl);
})(angular);