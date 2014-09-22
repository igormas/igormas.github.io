(function (angular) {
    'use strict';

    var twangular = angular.module('twangular', ['ngRoute']);
    twangular.config(function($routeProvider){
        function Route(templateUrl,ctrl){
            this.templateUrl = templateUrl;
            this.controller = ctrl;
        }

        $routeProvider
            .when('/',new Route('app/views/appView.html','mainCtrl'))
            .when('/login',new Route('app/views/loginView.html','loginCtrl'))
            .otherwise('/');
    });
})(angular);
