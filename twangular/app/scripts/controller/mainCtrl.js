(function (angular) {
    'use strict';

    var mainCtrl = [
        '$scope','dataSourceService',
        function ($scope,dataSourceService) {
            $scope.d = {};

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

            var accessProm = dataSourceService.accessToken();
            accessProm.then(function(res){

            });
        }
    ];
    angular.module('twangular').controller('mainCtrl', mainCtrl);
})(angular);