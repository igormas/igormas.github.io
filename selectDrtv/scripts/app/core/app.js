(function(angular){
    'use strict';

    var mainCtrl = function($scope){
        $scope.options = [
            {view: 'option1'},
            {view: 'option2'},
            {view: 'option3'}
        ];

        $scope.singleSelect = {
            val: $scope.options[0]
        };

        $scope.multiSelect = {
            val: [],
            settings:{
                selectTitle: 'Multi select'
            }
        };
    };
    angular.module('app',['selectMdl'])
        .controller('mainCtrl',mainCtrl);

    angular.bootstrap(document,['app']);
})(angular)