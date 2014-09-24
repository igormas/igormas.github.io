(function (angular) {
    'use strict';

    var loginCtrl = [
        '$scope','dataSourceService',
        function ($scope,dataSourceService) {
            $scope.d = {};

            $scope.d.twitterLogIn = function(){
                dataSourceService.logInWithTwitter();
            };
        }
    ];
    angular.module('twangular').controller('loginCtrl', loginCtrl);
})(angular);