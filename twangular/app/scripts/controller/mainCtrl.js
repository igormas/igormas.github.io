(function (angular) {
    'use strict';

    var mainCtrl = [
        '$scope','dataSourceService','localStorageService',
        function ($scope,dataSourceService,localStorageService) {
            $scope.d = {};
            var results = [];

/*
            $scope.d.historyResults = [{
                search: 'Real Madrid',
                results: [
                    'Great Match',
                    'The team played well'
                ]
            },
            {
                search: 'Celebrity',
                results: [
                    'Vin Diesel transformed to a women',
                    'Jim Carrey'
                ]
            }];
*/

            var accessProm = dataSourceService.accessToken();
            accessProm.then(function(accessTokens){
                localStorageService.setTwitterId(accessTokens.user_id);
                $scope.d.historyResults = results = localStorageService.getHistory();
                $scope.d.userName = accessTokens.screen_name;
            });

            $scope.$on('new result',function(evt,result){
                results.unshift(result);
                $scope.d.historyResults = results.slice(1,6);
            });
        }
    ];
    angular.module('twangular').controller('mainCtrl', mainCtrl);
})(angular);