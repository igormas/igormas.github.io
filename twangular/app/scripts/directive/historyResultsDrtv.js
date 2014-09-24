(function (angular) {
    'use strict';

    var historyResultsDrtv = [
        function () {
            var drtvObj = {
                templateUrl: 'views/historyResultsDrtvView.html',
                scope: {
                    results: '=historyResultsDrtv'
                }
            };
            return drtvObj;
        }
    ];
    angular.module('twangular').directive('historyResultsDrtv', historyResultsDrtv);
})(angular);
