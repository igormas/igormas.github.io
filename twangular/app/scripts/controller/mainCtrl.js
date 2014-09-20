(function (angular) {
    'use strict';

    var mainCtrl = [
        '$scope','dataSourceService',
        function ($scope,dataSourceService) {
            $scope.d = {};

            $scope.d.twitterLogIn = function(){
                dataSourceService.logInWithTwitter();
            };
        }
    ];
    angular.module('twangular').controller('mainCtrl', mainCtrl);
})(angular);